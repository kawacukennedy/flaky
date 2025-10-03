import pytest
import json
import uuid
import time
import datetime
import os
import platform
import hashlib
import subprocess

# Global dictionary to store results for each test
test_results = {}

def pytest_addoption(parser):
    """Adds command-line options to pytest."""
    group = parser.getgroup("flakehunter")
    group.addoption("--flakehunter", action="store_true", help="Enable flakehunter plugin")
    group.addoption("--repeat", type=int, default=1, help="Number of times to repeat each test")
    group.addoption("--flake-report-dir", default="./flakehunter_reports", help="Directory to save flakehunter reports")

def pytest_generate_tests(metafunc):
    """Parametrizes tests to run multiple times if --repeat is specified."""
    if metafunc.config.getoption("--flakehunter") and "repetition" in metafunc.fixturenames:
        repeat_count = metafunc.config.getoption("--repeat")
        metafunc.parametrize("repetition", range(repeat_count))

@pytest.fixture
def repetition(request):
    """Fixture to provide the repetition number to the test."""
    return request.param

def get_git_commit_sha():
    """Gets the current git commit SHA."""
    try:
        return subprocess.check_output(['git', 'rev-parse', 'HEAD']).strip().decode('ascii')
    except (subprocess.CalledProcessError, FileNotFoundError):
        return "local"

def get_deps_hash(requirements_path="backend/requirements.txt"):
    """Calculates a SHA256 hash of the requirements.txt file."""
    if not os.path.exists(requirements_path):
        return "file_not_found"
    with open(requirements_path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """Hook to capture test results after each run."""
    outcome = yield
    report = outcome.get_result()

    if not item.config.getoption("--flakehunter"):
        return

    test_id = item.nodeid.split('[')[0]
    if test_id not in test_results:
        test_results[test_id] = {
            "test_id": test_id,
            "framework": "pytest",
            "commit_sha": get_git_commit_sha(),
            "runs": []
        }

    # The 'repetition' fixture must be used in the test function for this to work
    repetition_index = item.funcargs.get("repetition", 0)

    # Capture stdout/stderr
    stdout, stderr = "", ""
    if hasattr(report, 'capstdout'):
        stdout = report.capstdout
    if hasattr(report, 'capstderr'):
        stderr = report.capstderr

    run_data = {
        "run_id": str(uuid.uuid4()),
        "status": "pass" if report.when == "call" and report.passed else "fail",
        "duration_ms": int(report.duration * 1000),
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "stdout": stdout,
        "stderr": stderr,
        "stacktrace": str(report.longrepr) if report.failed else None,
        "seed": repetition_index,  # Using repetition index as a mock seed
        "order_position": repetition_index,
        "env_snapshot": {
            "os": platform.system(),
            "language_version": f"Python {platform.python_version()}",
            "deps_hash": get_deps_hash(),
            "cpu_load": 0.0,  # Mock value, requires psutil
            "memory_mb": 0,  # Mock value, requires psutil
        }
    }
    
    # Only collect reports for the 'call' phase
    if report.when == 'call':
        test_results[test_id]["runs"].append(run_data)

def pytest_sessionfinish(session):
    """Hook to write the collected results to JSON files at the end of the session."""
    if not session.config.getoption("--flakehunter"):
        return

    report_dir = session.config.getoption("--flake-report-dir")
    if not os.path.exists(report_dir):
        os.makedirs(report_dir)

    for test_id, data in test_results.items():
        # Sanitize the filename
        safe_filename = test_id.replace('/', '_').replace(':', '_').replace('[', '_').replace(']', '')
        report_file = os.path.join(report_dir, f"{safe_filename}.json")
        with open(report_file, 'w') as f:
            json.dump(data, f, indent=2)
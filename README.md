# FlakeHunter

**Deterministic flaky test detection, classification, visualization, and remediation system.**

FlakeHunter provides reproducibility experiments, precise root cause detection, and seamless CI/CD integration across frameworks.

## Features

- **Flaky Test Detection:** Run your tests multiple times to identify flaky behavior.
- **Root Cause Analysis:** Automatically identify the root cause of flakiness, such as async timing issues, randomness, or resource contention.
- **Visualization:** A comprehensive dashboard to visualize flakiness trends, severity breakdowns, and top flaky tests.
- **CI/CD Integration:** A GitHub Actions workflow to run FlakeHunter on every pull request and post a comment with the results.
- **Extensible Plugin System:** Support for `pytest` is included, with placeholders for `Jest` and `JUnit`.

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/flakehunter.git
    cd flakehunter
    ```

2.  **Backend Setup:**
    ```bash
    # Create and activate a virtual environment
    python3 -m venv backend/venv
    source backend/venv/bin/activate

    # Install Python dependencies
    pip install -r backend/requirements.txt

    # Set up the database
    # Make sure you have a PostgreSQL server running and create a database.
    # Set the DATABASE_URL environment variable:
    export DATABASE_URL="postgresql://user:password@localhost:5432/flakehunterdb"

    # Start the backend server
    uvicorn backend.main:app --reload
    ```

3.  **Frontend Setup:**
    ```bash
    # Install Node.js dependencies
    cd frontend
    npm install

    # Start the frontend development server
    npm run dev
    ```

## Usage

### Pytest

To use the `pytest` plugin, run `pytest` with the `--flakehunter` and `--repeat` options:

```bash
backend/venv/bin/pytest --flakehunter --repeat=20 your_tests/
```

This will generate JSON reports in the `flakehunter_reports` directory.

## Project Structure

The project is a monorepo with the following structure:

-   `backend/`: The FastAPI backend application.
-   `frontend/`: The React frontend application.
-   `plugins/`: The plugins for different test frameworks (`pytest`, `jest`, `junit`).
-   `scripts/`: Utility scripts, such as the one for posting PR comments.
-   `.github/`: The GitHub Actions workflows.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

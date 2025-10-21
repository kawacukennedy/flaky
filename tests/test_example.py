import pytest
import random

# This test will be run multiple times by the flakehunter plugin
def test_example_flaky(repetition):
    """An example of a flaky test that passes about 50% of the time."""
    print(f"Running test repetition: {repetition}")
    assert random.choice([True, False])

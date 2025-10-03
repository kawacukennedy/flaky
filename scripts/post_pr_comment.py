import os
import json
import requests

def calculate_flakiness(runs):
    if not runs:
        return 0.0
    fails = sum(1 for run in runs if run['status'] == 'fail')
    return fails / len(runs)

def generate_comment_body(reports_dir):
    flaky_tests = []
    for filename in os.listdir(reports_dir):
        if filename.endswith('.json'):
            with open(os.path.join(reports_dir, filename), 'r') as f:
                report = json.load(f)
                flakiness_score = calculate_flakiness(report['runs'])
                if flakiness_score > 0.5:
                    flaky_tests.append({
                        'test_id': report['test_id'],
                        'score': flakiness_score,
                        'root_cause': 'N/A'  # Root cause not in this report
                    })

    if not flaky_tests:
        return None

    body = "## FlakeHunter Analysis 🕵️‍♂️\n\n"
    body += f"Found **{len(flaky_tests)} flaky tests** in this PR.\n\n"
    body += "| Test ID | Flakiness Score |\n"
    body += "|---|---|
"
    for test in sorted(flaky_tests, key=lambda x: x['score'], reverse=True):
        body += f"| `{test['test_id']}` | {test['score']:.2f} |\n"
    body += "\n*[View Full Report](https://www.flakehunter.com/)*"
    return body

def post_pr_comment():
    token = os.getenv("GITHUB_TOKEN")
    repo = os.getenv("GITHUB_REPOSITORY")
    pr_number = os.getenv("GITHUB_PR_NUMBER")

    if not all([token, repo, pr_number]):
        print("Missing GitHub environment variables for PR comment.")
        return

    reports_dir = "flakehunter_reports"
    comment_body = generate_comment_body(reports_dir)

    if not comment_body:
        print("No flaky tests found, so no comment will be posted.")
        return

    url = f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
    }
    comment = {"body": comment_body}

    try:
        response = requests.post(url, json=comment, headers=headers)
        response.raise_for_status()
        print("Successfully posted comment to PR.")
    except requests.exceptions.RequestException as e:
        print(f"Error posting comment: {e}")

if __name__ == "__main__":
    post_pr_comment()
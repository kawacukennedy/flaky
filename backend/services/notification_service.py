# Purpose: Send alerts via email, Slack, webhook

import smtplib
from email.mime.text import MIMEText
import requests
import os
from typing import Dict, Any

class NotificationService:
    def __init__(self):
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.smtp_user = os.getenv("SMTP_USER")
        self.smtp_password = os.getenv("SMTP_PASSWORD")
        self.slack_webhook_url = os.getenv("SLACK_WEBHOOK_URL")

    def send_email(self, recipient: str, subject: str, body: str):
        if not self.smtp_user or not self.smtp_password:
            print("SMTP credentials not configured, skipping email")
            return

        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = self.smtp_user
        msg['To'] = recipient

        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.smtp_user, self.smtp_password)
            server.sendmail(self.smtp_user, recipient, msg.as_string())
            server.quit()
            print(f"Email sent to {recipient}")
        except Exception as e:
            print(f"Failed to send email: {e}")

    def send_slack_message(self, channel: str, message: str):
        if not self.slack_webhook_url:
            print("Slack webhook not configured, skipping message")
            return

        payload = {
            "channel": channel,
            "text": message
        }

        try:
            response = requests.post(self.slack_webhook_url, json=payload)
            if response.status_code == 200:
                print(f"Slack message sent to {channel}")
            else:
                print(f"Failed to send Slack message: {response.text}")
        except Exception as e:
            print(f"Error sending Slack message: {e}")

    def send_webhook(self, url: str, payload: Dict[str, Any]):
        try:
            response = requests.post(url, json=payload, timeout=10)
            if response.status_code == 200:
                print(f"Webhook sent to {url}")
            else:
                print(f"Webhook failed: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"Error sending webhook: {e}")
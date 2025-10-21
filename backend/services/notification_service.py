# Purpose: Send alerts via email, Slack, webhook

class NotificationService:
    def send_email(self, recipient, subject, body):
        print(f"Sending email to {recipient} with subject: {subject}")
        # Implementation for sending email
        pass

    def send_slack_message(self, channel, message):
        print(f"Sending Slack message to {channel}: {message}")
        # Implementation for sending Slack message
        pass

    def send_webhook(self, url, payload):
        print(f"Sending webhook to {url} with payload: {payload}")
        # Implementation for sending webhook
        pass
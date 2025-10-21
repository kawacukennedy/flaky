# Purpose: Validate and ingest plugin payloads

class PluginService:
    def ingest_payload(self, payload: dict):
        print(f"Ingesting payload: {payload}")
        # Validate payload structure and content
        if not self.validate_payload(payload):
            raise ValueError("Invalid payload")
        # In real implementation, store in database or queue
        # For now, just log
        print("Payload ingested successfully")

    def validate_payload(self, payload: dict) -> bool:
        # Implement validation logic based on expected plugin data structure
        required_fields = ['test_name', 'status', 'duration', 'environment', 'project_id', 'timestamp']
        for field in required_fields:
            if field not in payload:
                return False
        # Check types
        if not isinstance(payload['test_name'], str) or not payload['test_name']:
            return False
        if payload['status'] not in ['pass', 'fail', 'skipped']:
            return False
        if not isinstance(payload['duration'], (int, float)) or payload['duration'] < 0:
            return False
        if not isinstance(payload['environment'], str):
            return False
        if not isinstance(payload['project_id'], str):
            return False
        # timestamp should be ISO string, but basic check
        if not isinstance(payload['timestamp'], str):
            return False
        return True
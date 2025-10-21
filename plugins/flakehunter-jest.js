const axios = require('axios');

class FlakeHunterReporter {
  constructor(globalConfig, options) {
    this.apiUrl = process.env.FLAKEHUNTER_API_URL || 'http://localhost:8000';
    this.projectId = process.env.FLAKEHUNTER_PROJECT_ID;
  }

  onTestResult(test, testResult) {
    testResult.testResults.forEach(result => {
      const payload = {
        test_name: result.fullName,
        status: result.status,
        duration: result.duration,
        environment: process.env.NODE_ENV || 'test',
        project_id: this.projectId,
        timestamp: new Date().toISOString()
      };
      axios.post(`${this.apiUrl}/plugins/tests`, payload)
        .catch(err => console.error('Failed to send test data:', err));
    });
  }
}

module.exports = FlakeHunterReporter;
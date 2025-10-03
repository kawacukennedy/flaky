// Purpose: Send JS test results to backend

const axios = require('axios');

const FLAKYHUNTER_API_URL = process.env.FLAKYHUNTER_API_URL || 'http://localhost:8000';

class FlakyHunterReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    results.testResults.forEach(testResult => {
      testResult.testResults.forEach(assertionResult => {
        const payload = {
          test_name: assertionResult.fullName,
          status: assertionResult.status === 'passed' ? 'pass' : 'fail',
          duration: assertionResult.duration,
          env: {
            node_version: process.version,
            platform: process.platform,
          },
        };

        axios.post(`${FLAKYHUNTER_API_URL}/tests`, payload)
          .then(response => {
            console.log(`[FlakyHunter] Sent test result for ${assertionResult.fullName}`);
          })
          .catch(error => {
            console.error(`[FlakyHunter] Error sending test result for ${assertionResult.fullName}:`, error.message);
          });
      });
    });
  }
}

module.exports = FlakyHunterReporter;
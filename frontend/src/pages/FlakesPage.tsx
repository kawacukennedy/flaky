import { useState } from 'react';
import { Code, Info, GitPullRequest, Copy } from 'lucide-react';

function FlakesPage() {
  const [activeTab, setActiveTab] = useState('Summary');
  const [logsContent, setLogsContent] = useState(
    `[2023-10-26 10:00:01] INFO: Test 'test_login_flow' started.\n[2023-10-26 10:00:02] DEBUG: User 'testuser' attempting login.\n[2023-10-26 10:00:03] ERROR: AssertionError: Expected user to be logged in.\n    at login.js:45:12\n    at auth.js:120:5\n    at <anonymous>\n[2023-10-26 10:00:03] INFO: Test 'test_login_flow' failed.\n`
  );

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(logsContent);
    alert('Logs copied to clipboard!');
  };

  const renderLogLine = (line: string, index: number) => {
    // Placeholder for expandable stacktrace logic
    const isStacktraceLine = line.trim().startsWith('at ');
    return (
      <div key={index} className="flex">
        <span className="text-gray-500 dark:text-gray-400 mr-4 w-8 text-right flex-shrink-0">{index + 1}</span>
        <span className="flex-1">{line}</span>
      </div>
    );
  };

  return (
    <main className="flex flex-col lg:flex-row h-full gap-6">
      {/* Logs Viewer - 60% width on desktop */}
      <div className="lg:w-3/5 bg-surface_light dark:bg-surface_dark p-6 rounded-lg shadow-md flex flex-col">
        <h2 className="text-xl font-semibold text-text_light dark:text-text_dark mb-4 flex items-center gap-2">
          <Code className="w-6 h-6" /> Logs Viewer
        </h2>
        <div className="relative flex-1 bg-gray-800 text-white font-mono text-sm p-4 rounded-md overflow-auto">
          <button
            onClick={handleCopyLogs}
            className="absolute top-2 right-2 p-1 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
            title="Copy logs"
          >
            <Copy className="w-4 h-4" />
          </button>
          <pre className="whitespace-pre-wrap flex flex-col">
            {/* Placeholder for syntax highlighting */}
            {logsContent.split('\n').map(renderLogLine)}
          </pre>
        </div>
      </div>

      {/* Details Panel - 40% width on desktop */}
      <div className="lg:w-2/5 bg-surface_light dark:bg-surface_dark p-6 rounded-lg shadow-md flex flex-col">
        <h2 className="text-xl font-semibold text-text_light dark:text-text_dark mb-4">Details</h2>
        <div className="flex border-b border-border dark:border-gray-700 mb-4">
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'Summary' ? 'border-b-2 border-primary text-primary' : 'text-muted hover:text-text_light dark:hover:text-text_dark'}`}
            onClick={() => setActiveTab('Summary')}
          >
            Summary
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'Root Causes' ? 'border-b-2 border-primary text-primary' : 'text-muted hover:text-text_light dark:hover:text-text_dark'}`}
            onClick={() => setActiveTab('Root Causes')}
          >
            Root Causes
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'Linked Issues' ? 'border-b-2 border-primary text-primary' : 'text-muted hover:text-text_light dark:hover:text-text_dark'}`}
            onClick={() => setActiveTab('Linked Issues')}
          >
            Linked Issues
          </button>
        </div>

        <div className="flex-1 overflow-auto transition-all duration-200 ease-standard transform opacity-100 translate-x-0">
          {activeTab === 'Summary' && (
            <div className="space-y-4 animate-fade-slide-in">
              <p><strong>Test ID:</strong> `test_login_flow`</p>
              <p><strong>Status:</strong> Failed</p>
              <p><strong>Duration:</strong> 120ms</p>
              <p><strong>Timestamp:</strong> 2023-10-26 10:00:03</p>
            </div>
          )}
          {activeTab === 'Root Causes' && (
            <div className="space-y-4 animate-fade-slide-in">
              <p><strong>Identified Root Cause:</strong> `async_timing`</p>
              <p><strong>Suggested Fix:</strong> Use explicit waits instead of fixed delays.</p>
            </div>
          )}
          {activeTab === 'Linked Issues' && (
            <div className="space-y-4 animate-fade-slide-in">
              <p>No linked issues found.</p>
              <button className="bg-info hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2">
                <GitPullRequest className="w-5 h-5" /> Create New Issue
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default FlakesPage;
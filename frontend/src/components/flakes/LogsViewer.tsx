import React, { useState } from 'react';
import { Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Example style

interface LogsViewerProps {
  logs: string;
  language?: string; // e.g., 'javascript', 'python', 'bash'
}

const LogsViewer: React.FC<LogsViewerProps> = ({ logs, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);
  const [expandedStacktrace, setExpandedStacktrace] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(logs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleStacktrace = () => {
    setExpandedStacktrace(!expandedStacktrace);
  };

  // Simple logic to find a stack trace for demonstration
  const stacktraceRegex = /(at |Caused by: |Traceback \(most recent call last\):[\s\S]*?Error:)/;
  const hasStacktrace = stacktraceRegex.test(logs);
  const [beforeStacktrace, stacktraceContent] = hasStacktrace ? logs.split(stacktraceRegex, 2) : [logs, ''];

  return (
    <div className="relative bg-bg_dark rounded-md p-4 font-mono text-sm overflow-auto h-full">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 rounded-md bg-surface_dark text-text_dark hover:bg-gray-700 transition-colors duration-200"
        aria-label="Copy logs to clipboard"
      >
        <Copy className="h-4 w-4" />
        {copied && <span className="absolute -top-6 right-0 text-xs bg-primary text-white px-2 py-1 rounded-md">Copied!</span>}
      </button>

      <SyntaxHighlighter language={language} style={vscDarkPlus} showLineNumbers={true} customStyle={{ background: 'transparent' }}>
        {beforeStacktrace}
      </SyntaxHighlighter>

      {hasStacktrace && ( // Only render if a stacktrace is found
        <div className="mt-4">
          <button
            onClick={toggleStacktrace}
            className="flex items-center text-primary hover:underline focus:outline-none"
          >
            {expandedStacktrace ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
            {expandedStacktrace ? 'Collapse Stacktrace' : 'Expand Stacktrace'}
          </button>
          {expandedStacktrace && (
            <SyntaxHighlighter language={language} style={vscDarkPlus} showLineNumbers={true} startingLineNumber={beforeStacktrace.split('\n').length + 1} customStyle={{ background: 'transparent' }}>
              {stacktraceContent}
            </SyntaxHighlighter>
          )}
        </div>
      )}
    </div>
  );
};

export default LogsViewer;
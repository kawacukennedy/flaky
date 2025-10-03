import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Copy, ChevronDown, ChevronRight } from 'lucide-react';

interface LogsViewerProps {
  logContent: string;
  language?: string;
}

const LogsViewer: React.FC<LogsViewerProps> = ({ logContent, language = 'plaintext' }) => {
  const [expandedStacktraces, setExpandedStacktraces] = useState<Set<number>>(new Set());

  const toggleStacktrace = (lineNumber: number) => {
    setExpandedStacktraces((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lineNumber)) {
        newSet.delete(lineNumber);
      } else {
        newSet.add(lineNumber);
      }
      return newSet;
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(logContent);
    // Optionally, add a toast notification here
  };

  const renderLine = (node: any, lineNumber: number) => {
    const line = node.children[0]?.value || '';
    const isStacktraceStart = line.includes('at ') || line.includes('Caused by:'); // Simple heuristic
    const isExpanded = expandedStacktraces.has(lineNumber);

    if (isStacktraceStart) {
      return (
        <div key={lineNumber} className="flex items-start">
          <button
            onClick={() => toggleStacktrace(lineNumber)}
            className="mr-2 text-muted hover:text-text_light dark:hover:text-text_dark"
            aria-expanded={isExpanded}
            aria-controls={`stacktrace-line-${lineNumber}`}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          <span id={`stacktrace-line-${lineNumber}`} className={isExpanded ? '' : 'truncate'}>
            {line}
          </span>
        </div>
      );
    }
    return <span key={lineNumber}>{line}</span>;
  };

  return (
    <div className="bg-surface_dark rounded-lg p-4 shadow-md font-mono text-sm relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 rounded-md bg-bg_light dark:bg-bg_dark text-muted hover:text-primary transition-colors duration-fast"
        aria-label="Copy log content"
      >
        <Copy size={16} />
      </button>
      <SyntaxHighlighter
        language={language}
        style={docco}
        showLineNumbers={true}
        wrapLines={true}
        lineProps={(lineNumber) => ({
          style: { display: 'block', cursor: 'pointer' },
          onClick: () => toggleStacktrace(lineNumber),
        })}
        renderer={({ rows }) => (
          <code className="hljs">
            {rows.map((row, i) => (
              <div key={i} className="flex">
                <span className="line-number pr-4 text-gray-500 select-none">{i + 1}</span>
                <span className="line-content flex-1">
                  {renderLine(row, i + 1)}
                </span>
              </div>
            ))}
          </code>
        )}
      >
        {logContent}
      </SyntaxHighlighter>
    </div>
  );
};

export default LogsViewer;

// Purpose: Display logs with search/filter

import React, { useState } from 'react';

interface LogsViewerProps {
  logs: string[];
}

const LogsViewer: React.FC<LogsViewerProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log =>
    log.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md font-mono text-sm">
      <input
        type="text"
        placeholder="Filter logs..."
        className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="h-64 overflow-y-auto">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log, index) => (
            <pre key={index} className="whitespace-pre-wrap break-words mb-1">
              {log}
            </pre>
          ))
        ) : (
          <p className="text-gray-400">No logs found or matching filter.</p>
        )}
      </div>
    </div>
  );
};

export default LogsViewer;
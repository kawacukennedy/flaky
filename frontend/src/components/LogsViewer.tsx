// Purpose: Display logs with search/filter and infinite scroll

import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { fetchTestLogs } from "../app/slices/testDetailsSlice";

interface LogsViewerProps {
  logs: string[];
  testId: string;
  hasMore: boolean;
  loading: boolean;
}

const LogsViewer: React.FC<LogsViewerProps> = ({ logs, testId, hasMore, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef(0);

  const filteredLogs = logs.filter((log) =>
    log.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          skipRef.current += 50;
          dispatch(fetchTestLogs({ testId, skip: skipRef.current }));
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading, testId, dispatch]);

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
          <>
            {filteredLogs.map((log, index) => (
              <pre key={index} className="whitespace-pre-wrap break-words mb-1">
                {log}
              </pre>
            ))}
            {hasMore && (
              <div ref={sentinelRef} className="text-center py-4">
                {loading ? "Loading more logs..." : "Load more"}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400">No logs found or matching filter.</p>
        )}
      </div>
    </div>
  );
};

export default LogsViewer;

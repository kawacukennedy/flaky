import React from 'react';

const RecentFlakes: React.FC = () => {
  // Placeholder for recent flakes logic
  const flakes: any[] = []; // Replace with actual data fetching

  return (
    <div className="bg-surface_light dark:bg-surface_dark p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Recent Flaky Tests</h3>
      {flakes.length === 0 ? (
        <div className="text-center text-muted py-8">
          {/* Placeholder for Inbox icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 11.25h3m-3 3h3m-6-6h15.75c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125V4.875c0-.621.504-1.125 1.125-1.125H12a2.25 2.25 0 012.25 2.25v2.25Z" />
          </svg>
          <p>No flaky tests yet.</p>
        </div>
      ) : (
        <ul>
          {/* Render recent flakes here (max 5 items) */}
        </ul>
      )}
    </div>
  );
};

export default RecentFlakes;
import React from 'react';
import LogsViewer from '../components/flakes/LogsViewer';
import DetailsPanel from '../components/flakes/DetailsPanel';

const FlakesPage: React.FC = () => {
  return (
    <div className="flex h-full">
      {/* Logs Viewer - 60% width */}
      <div className="flex-grow-[3] bg-surface_light dark:bg-surface_dark p-4 rounded-lg shadow-sm mr-4">
        <LogsViewer />
      </div>

      {/* Details Panel - 40% width */}
      <div className="flex-grow-[2] bg-surface_light dark:bg-surface_dark p-4 rounded-lg shadow-sm">
        <DetailsPanel />
      </div>
    </div>
  );
};

export default FlakesPage;
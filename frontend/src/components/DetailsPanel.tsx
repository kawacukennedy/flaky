// Purpose: Detailed test information view

import React from 'react';

interface DetailsPanelProps {
  title: string;
  children: React.ReactNode;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ title, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">{title}</h2>
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
};

export default DetailsPanel;
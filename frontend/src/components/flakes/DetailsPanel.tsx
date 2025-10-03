import React, { useState } from 'react';

interface DetailsPanelProps {
  summaryContent: React.ReactNode;
  rootCausesContent: React.ReactNode;
  linkedIssuesContent: React.ReactNode;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({
  summaryContent,
  rootCausesContent,
  linkedIssuesContent,
}) => {
  const [activeTab, setActiveTab] = useState('Summary');

  const tabs = [
    { name: 'Summary', content: summaryContent },
    { name: 'Root Causes', content: rootCausesContent },
    { name: 'Linked Issues', content: linkedIssuesContent },
  ];

  return (
    <div className="bg-surface_light dark:bg-surface_dark rounded-lg p-6 shadow-md">
      <div className="border-b border-border mb-4">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === tab.name
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-text_light hover:border-gray-300 dark:hover:border-gray-700'
                }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="relative overflow-hidden">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`transition-all duration-200 ease-soft transform
              ${activeTab === tab.name
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 absolute top-0 left-0 w-full pointer-events-none translate-x-4'
              }`}
          >
            {activeTab === tab.name && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsPanel;

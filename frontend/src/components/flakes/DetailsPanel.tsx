import React, { useState } from 'react';

interface DetailsPanelProps {
  // Add any props needed for the details panel
}

const DetailsPanel: React.FC<DetailsPanelProps> = () => {
  const [activeTab, setActiveTab] = useState('Summary');

  const tabs = ['Summary', 'Root Causes', 'Linked Issues'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Summary':
        return (
          <div className="p-4 animate-fade-slide-in">
            <h4 className="font-semibold text-lg mb-2">Summary of Flake</h4>
            <p>Detailed summary of the flaky test, including its history, frequency, and impact.</p>
            {/* More summary details */}
          </div>
        );
      case 'Root Causes':
        return (
          <div className="p-4 animate-fade-slide-in">
            <h4 className="font-semibold text-lg mb-2">Identified Root Causes</h4>
            <ul className="list-disc list-inside">
              <li>Race condition in test setup.</li>
              <li>External service dependency instability.</li>
              <li>Improper test teardown.</li>
            </ul>
            {/* More root cause details */}
          </div>
        );
      case 'Linked Issues':
        return (
          <div className="p-4 animate-fade-slide-in">
            <h4 className="font-semibold text-lg mb-2">Linked Issues & Discussions</h4>
            <ul className="list-disc list-inside">
              <li><a href="#" className="text-primary hover:underline">GitHub Issue #123: Flaky Login Test</a></li>
              <li><a href="#" className="text-primary hover:underline">Slack Thread: Login Flakiness</a></li>
            </ul>
            {/* More linked issues */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border dark:border-surface_dark">
        <nav className="-mb-px flex space-x-8 px-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-normal ease-standard
                ${activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:text-text_light dark:hover:text-text_dark hover:border-border dark:hover:border-surface_dark'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DetailsPanel;
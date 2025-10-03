import React, { useState } from 'react';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';

interface DetailsPanelProps {
  summaryContent: React.ReactNode;
  rootCausesContent: React.ReactNode;
  linkedIssuesContent: React.ReactNode;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ summaryContent, rootCausesContent, linkedIssuesContent }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'rootCauses' | 'linkedIssues'>('summary');

  const tabs = [
    { id: 'summary', label: 'Summary', content: summaryContent },
    { id: 'rootCauses', label: 'Root Causes', content: rootCausesContent },
    { id: 'linkedIssues', label: 'Linked Issues', content: linkedIssuesContent },
  ];

  return (
    <div className="flex flex-col h-full bg-surface_light dark:bg-surface_dark rounded-lg shadow-sm">
      <div className="border-b border-border p-4">
        <nav className="flex space-x-4" aria-label="Details tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)} // Type assertion for simplicity
              className={clsx(
                'px-3 py-2 font-medium text-sm rounded-md',
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-text_light dark:text-text_dark hover:bg-bg_light dark:hover:bg-surface_dark'
              )}
              aria-controls={`panel-${tab.id}`}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        {tabs.map((tab) => (
          <Transition
            key={tab.id}
            show={activeTab === tab.id}
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-x-5"
            enterTo="opacity-100 translate-x-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-5"
          >
            <div
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              className={clsx(activeTab !== tab.id && 'hidden')} // Hide content when not active
            >
              {tab.content}
            </div>
          </Transition>
        ))}
      </div>
    </div>
  );
};

export default DetailsPanel;
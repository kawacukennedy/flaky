import React from 'react';
import Button from '../components/Button';
import RecentFlakes from '../components/dashboard/RecentFlakes';
import TopSolutions from '../components/dashboard/TopSolutions';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg_light dark:bg-bg_dark text-text_light dark:text-text_dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 md:px-8 lg:px-12 rounded-lg mb-8 bg-gradient-to-br from-primary to-blue-400 dark:from-primary dark:to-blue-600 animate-gradient-shift">
        <div className="particles"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Track & Hunt Flaky Tests</h1>
          <p className="text-xl text-white text-opacity-90 mb-8">Centralized debugging insights for developers.</p>
          <div className="flex justify-center space-x-4">
            <Button
              label="Start Hunting"
              variant="primary"
              size={{ width: 160, height: 48 }}
              onClick={() => console.log('Start Hunting clicked')}
            />
            <Button
              label="View Flakes"
              variant="secondary"
              size={{ width: 160, height: 48 }}
              onClick={() => console.log('View Flakes clicked')}
            />
          </div>
        </div>
      </section>

      {/* Main Content and Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6 px-6 md:px-8 lg:px-12">
        {/* Main Content Area */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          {/* Placeholder for main dashboard content */}
          <div className="bg-surface_light dark:bg-surface_dark p-6 rounded-lg shadow-sm min-h-[300px]">
            <p>Main dashboard content goes here.</p>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Sidebar</h2>
          <div className="space-y-6">
            <RecentFlakes />
            <TopSolutions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

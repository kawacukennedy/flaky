import React from 'react';
import { Link } from 'react-router-dom';
import RecentFlakes from '../components/dashboard/RecentFlakes';
import TopSolutions from '../components/dashboard/TopSolutions';

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-blue-400 rounded-lg p-10 mb-8 overflow-hidden animate-gradient-shift">
        <div className="particles"></div> {/* Particle effect */}
        <div className="relative z-10 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">Track & Hunt Flaky Tests</h1>
          <p className="text-xl mb-6">Centralized debugging insights for developers.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/search" className="w-40 h-12 flex items-center justify-center bg-primary text-white rounded-md shadow-sm hover:scale-[1.02] hover:shadow-md hover:bg-primary_hover transition-all duration-normal ease-standard group relative overflow-hidden">
              <span className="relative z-10">Start Hunting</span>
              <span className="absolute inset-0 rounded-md bg-white opacity-0 group-active:opacity-20 transition-opacity duration-fast ease-soft"></span>
            </Link>
            <Link to="/flakes" className="w-40 h-12 flex items-center justify-center bg-secondary text-white rounded-md shadow-sm hover:scale-[1.02] hover:shadow-md transition-all duration-normal ease-standard">
              View Flakes
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area (70%) */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-text_light dark:text-text_dark mb-4">Overview</h2>
          {/* Placeholder for main dashboard content */}
          <div className="bg-surface_light dark:bg-surface_dark rounded-lg p-6 shadow-sm h-64 flex items-center justify-center">
            <p className="text-muted">More dashboard content will go here.</p>
          </div>
        </div>

        {/* Sidebar (30%) */}
        <div className="lg:col-span-1 space-y-6">
          <RecentFlakes />
          <TopSolutions />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetDashboardQuery } from '../app/services/api';
import { ArrowRight, Bug, Lightbulb } from 'lucide-react';
import LineChartComponent from '../components/LineChartComponent';
import PieChartComponent from '../components/PieChartComponent';
import TableComponent from '../components/TableComponent';
import Button from '../components/Button'; // Import the new Button component

const API_URL = 'http://127.0.0.1:8000';

const DashboardPage = () => {
  const { data: dashboardData, error, isLoading } = useGetDashboardQuery();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-danger">Error loading dashboard data.</div>;
  }

  // Placeholder for flakiness trend data (backend doesn't provide this yet)
  const flakinessTrendData = [
    { name: 'Day 1', flakiness: 0.1 },
    { name: 'Day 2', flakiness: 0.2 },
    { name: 'Day 3', flakiness: 0.15 },
    { name: 'Day 4', flakiness: 0.3 },
    { name: 'Day 5', flakiness: 0.25 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content - 70% width on desktop */}
      <div className="lg:col-span-2 space-y-6">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-blue-400 text-white p-10 rounded-lg shadow-md overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            {/* Animated diagonal gradient and particles placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-primary animate-gradient-shift"></div>
            <div className="absolute inset-0 particles"></div> {/* Placeholder for particles */}
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Track & Hunt Flaky Tests</h2>
            <p className="text-xl mb-6">Centralized debugging insights for developers.</p>
            <div className="flex gap-4">
              <Button variant="primary" size="md" onClick={() => console.log('Start Hunting clicked')}>
                Start Hunting <ArrowRight size={20} />
              </Button>
              <Button variant="secondary" size="md" onClick={() => console.log('View Flakes clicked')}>
                View Flakes
              </Button>
            </div>
          </div>
        </section>

        {/* Dashboard Overview */}
        <div className="bg-surface_light dark:bg-surface_dark p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Dashboard Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Metric Cards */}
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Total Tests</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{dashboardData?.total_tests}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Flaky Tests</h3>
              <p className="mt-2 text-3xl font-bold text-danger">{dashboardData?.flaky_tests}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Flakiness Rate</h3>
              <p className="mt-2 text-3xl font-bold text-warning">{(dashboardData?.flakiness_rate * 100).toFixed(1)}%</p>
            </div>

            {/* Charts */}
            <div className="md:col-span-2 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Flakiness Trend</h3>
              <div className="h-64">
                <LineChartComponent data={flakinessTrendData} />
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Severity Breakdown</h3>
              <div className="h-64">
                <PieChartComponent data={dashboardData?.severity_distribution} />
              </div>
            </div>

            {/* Table */}
            <div className="md:col-span-3 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Top Flaky Tests</h3>
              <div className="mt-4">
                <TableComponent data={dashboardData?.top_flaky_tests || []} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - 30% width on desktop */}
      <aside className="lg:col-span-1 space-y-6">
        {/* Recent Flakes */}
        <div className="bg-surface_light dark:bg-surface_dark p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Flakes</h3>
          {dashboardData?.top_flaky_tests && dashboardData.top_flaky_tests.length > 0 ? (
            <ul className="space-y-3">
              {dashboardData.top_flaky_tests.slice(0, 5).map((flake: any) => (
                <li key={flake.test_id} className="flex items-center gap-2">
                  <Bug size={18} className="text-danger" />
                  <span>{flake.test_id} - {(flake.flakiness_score * 100).toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted py-4">
              <Bug size={32} className="mx-auto mb-2" />
              <p>No flaky tests yet.</p>
            </div>
          )}
        </div>

        {/* Top Solutions */}
        <div className="bg-surface_light dark:bg-surface_dark p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Top Solutions</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Placeholder solution cards */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md hover:scale-102 shadow-sm transition-all duration-200 ease-standard">
              <Lightbulb size={20} className="text-info mb-2" />
              <p className="text-sm font-medium">Fix Async Timing</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md hover:scale-102 shadow-sm transition-all duration-200 ease-standard">
              <Lightbulb size={20} className="text-info mb-2" />
              <p className="text-sm font-medium">Isolate State</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DashboardPage;

// Purpose: Charts, tables, analytics overview

import React from 'react';
import LineChartComponent from '../components/LineChartComponent';
import PieChartComponent from '../components/PieChartComponent';
import TableComponent from '../components/TableComponent';

const DashboardPage: React.FC = () => {
  // Dummy data for charts and table
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Flaky Tests',
        data: [10, 15, 8, 12, 20, 18],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const pieChartData = {
    labels: ['Timing', 'Environment', 'Order Dependency', 'Shared State'],
    datasets: [
      {
        label: 'Flake Causes',
        data: [300, 50, 100, 75],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const tableData = [
    { id: 1, name: 'test_login_failure', project: 'AuthService', status: 'Flaky', last_seen: '2023-10-26' },
    { id: 2, name: 'test_data_race', project: 'UserService', status: 'Flaky', last_seen: '2023-10-25' },
    { id: 3, name: 'test_api_timeout', project: 'PaymentService', status: 'Flaky', last_seen: '2023-10-24' },
  ];

  const tableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Test Name' },
    { key: 'project', header: 'Project' },
    { key: 'status', header: 'Status' },
    { key: 'last_seen', header: 'Last Seen' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Flaky Test Trends</h2>
          <LineChartComponent data={lineChartData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Flake Causes Distribution</h2>
          <PieChartComponent data={pieChartData} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Flaky Tests</h2>
        <TableComponent data={tableData} columns={tableColumns} />
      </div>
    </div>
  );
};

export default DashboardPage;
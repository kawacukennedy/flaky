// Purpose: Charts, tables, analytics overview

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LineChartComponent from '../components/LineChartComponent';
import PieChartComponent from '../components/PieChartComponent';
import TableComponent from '../components/TableComponent';
import useWebSocket from '../hooks/useWebSocket';
import { RootState, AppDispatch } from '../app/store';
import { addTest, updateExistingTest, removeTest, fetchTests } from '../app/slices/testsSlice';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tests = useSelector((state: RootState) => state.tests.tests);
  const testsStatus = useSelector((state: RootState) => state.tests.status);

  useEffect(() => {
    if (testsStatus === 'idle') {
      dispatch(fetchTests());
    }
  }, [testsStatus, dispatch]);

  const handleWebSocketMessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);
    console.log('WebSocket message received:', message);
    switch (message.type) {
      case 'new_test':
        dispatch(addTest(message.data));
        break;
      case 'update_test':
        dispatch(updateExistingTest(message.data));
        break;
      case 'delete_test':
        dispatch(removeTest(message.data.id));
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  };

  useWebSocket('ws://localhost:8000/ws/dashboard', { onMessage: handleWebSocketMessage });

  // Dummy data for charts and table (will be replaced by real data from Redux store)
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

  const tableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Test Name' },
    { key: 'project_id', header: 'Project ID' },
    // Add more columns as needed
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
        <h2 className="text-xl font-semibold mb-4">All Tests (Real-time)</h2>
        <TableComponent data={tests} columns={tableColumns} />
      </div>
    </div>
  );
};

export default DashboardPage;
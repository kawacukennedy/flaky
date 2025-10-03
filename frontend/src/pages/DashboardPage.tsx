// Purpose: Charts, tables, analytics overview

import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LineChartComponent from '../components/LineChartComponent';
import PieChartComponent from '../components/PieChartComponent';
import TableComponent from '../components/TableComponent';
import SearchBar from '../components/SearchBar';
import SearchFilter from '../components/SearchFilter';
import useWebSocket from '../hooks/useWebSocket';
import { RootState, AppDispatch } from '../app/store';
import { addTest, updateExistingTest, removeTest, fetchTests, fetchFilteredTests, setSearchTerm, setFilter, clearFilters } from '../app/slices/testsSlice';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tests = useSelector((state: RootState) => state.tests.tests);
  const testsStatus = useSelector((state: RootState) => state.tests.status);
  const searchTerm = useSelector((state: RootState) => state.tests.searchTerm);
  const filters = useSelector((state: RootState) => state.tests.filters);

  const filterOptions = {
    status: ['flaky', 'stable', 'passed', 'failed'],
    project: ['AuthService', 'UserService', 'PaymentService'], // Example projects
    // Add more filter options as needed
  };

  const applyFilters = useCallback(() => {
    dispatch(fetchFilteredTests({ query: searchTerm, filters }));
  }, [dispatch, searchTerm, filters]);

  useEffect(() => {
    if (testsStatus === 'idle') {
      dispatch(fetchTests());
    }
  }, [testsStatus, dispatch]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, applyFilters]);

  const handleSearchChange = (term: string) => {
    dispatch(setSearchTerm(term));
  };

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setFilter({ key, value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleWebSocketMessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);
    console.log('WebSocket message received:', message);
    switch (message.type) {
      case 'new_test':
        dispatch(addTest(message.data));
        applyFilters(); // Re-apply filters to include new test
        break;
      case 'update_test':
        dispatch(updateExistingTest(message.data));
        applyFilters(); // Re-apply filters to reflect updated test
        break;
      case 'delete_test':
        dispatch(removeTest(message.data.id));
        applyFilters(); // Re-apply filters after test deletion
        break;
      case 'new_flaky_occurrence':
        dispatch(fetchTests()); // Refetch all tests to update status/flakiness
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  };

  useWebSocket('ws://localhost:8000/ws/dashboard', { onMessage: handleWebSocketMessage });

  // Data transformation for charts
  const flakyTests = useMemo(() => tests.filter(test => test.status === 'flaky'), [tests]); // Assuming 'status' field exists
  const stableTests = useMemo(() => tests.filter(test => test.status === 'stable'), [tests]); // Assuming 'status' field exists

  const pieChartData = {
    labels: ['Flaky Tests', 'Stable Tests'],
    datasets: [
      {
        label: 'Test Distribution',
        data: [flakyTests.length, stableTests.length],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Placeholder for line chart data - would need more historical data
  const lineChartData = {
    labels: ['Today'],
    datasets: [
      {
        label: 'Total Tests',
        data: [tests.length],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const tableColumns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Test Name', sortable: true },
    { key: 'project_id', header: 'Project ID', sortable: true },
    { key: 'status', header: 'Status', sortable: true },
    // Add more columns as needed, e.g., last_run, flakiness_score
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} placeholder="Search tests..." />
        <SearchFilter filters={filters} onFilterChange={handleFilterChange} options={filterOptions} />
        <button onClick={handleClearFilters} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Reset Filters</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Trends</h2>
          <LineChartComponent data={lineChartData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Distribution</h2>
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
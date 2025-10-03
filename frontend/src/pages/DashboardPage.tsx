import { useState, useEffect } from 'react';
import axios from 'axios';
import LineChartComponent from '../components/LineChartComponent';
import PieChartComponent from '../components/PieChartComponent';
import TableComponent from '../components/TableComponent';

const API_URL = 'http://127.0.0.1:8000';

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/dashboard`);
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
    // Optional: Poll for new data every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!dashboardData) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const { total_tests, flaky_tests, flakiness_rate, severity_distribution, top_flaky_tests } = dashboardData;

  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Metric Cards */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Total Tests</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{total_tests}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Flaky Tests</h3>
            <p className="mt-2 text-3xl font-bold text-red-600">{flaky_tests}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Flakiness Rate</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-500">{(flakiness_rate * 100).toFixed(1)}%</p>
          </div>

          {/* Charts */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Flakiness Trend</h3>
            <div className="h-64">
              <LineChartComponent />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Severity Breakdown</h3>
            <div className="h-64">
              <PieChartComponent data={severity_distribution} />
            </div>
          </div>

          {/* Table */}
          <div className="md:col-span-3 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Top Flaky Tests</h3>
            <div className="mt-4">
              <TableComponent data={top_flaky_tests} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardPage;

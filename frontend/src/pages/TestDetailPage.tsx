import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LineChartComponent from '../components/LineChartComponent';

const API_URL = 'http://127.0.0.1:8000';

function TestDetailPage() {
  const { id } = useParams();
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/tests/${id}`);
        setTestData(response.data);
      } catch (error) {
        console.error(`Error fetching data for test ${id}:`, error);
      }
    };
    fetchData();
  }, [id]);

  if (!testData) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const { flakiness_score, root_cause, suggested_fix, history } = testData;
  const lastRun = history.length > 0 ? history[history.length - 1] : null;

  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Detail: {id}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Pass/Fail Timeline</h3>
            <div className="h-64 mt-4">
              <LineChartComponent data={history} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Details</h3>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Flakiness Score</p>
                <p className="text-lg font-bold">{(flakiness_score * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Root Cause</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {root_cause}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Suggested Fix</p>
                <p>{suggested_fix}</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Last Stacktrace</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-x-auto">
              <code>{lastRun?.stacktrace || 'No stacktrace available'}</code>
            </pre>
          </div>
          <div className="lg:col-span-3 flex justify-end gap-4 mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Mark Fixed</button>
            <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Ignore</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Create GitHub Issue</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TestDetailPage;
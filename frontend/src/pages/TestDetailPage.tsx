// Purpose: Detailed view of a single test with logs, history, metrics, and root cause analysis

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchTestDetails, fetchTestLogs, fetchRootCauseAnalysis } from '../app/slices/testsSlice';
import DetailsPanel from '../components/DetailsPanel';
import LogsViewer from '../components/LogsViewer';

const TestDetailPage: React.FC = () => {
  const { test_id } = useParams<{ test_id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const testDetails = useSelector((state: RootState) => state.tests.selectedTestDetails);
  const testLogs = useSelector((state: RootState) => state.tests.selectedTestLogs);
  const rootCauseAnalysis = useSelector((state: RootState) => state.tests.selectedRootCauseAnalysis);
  const status = useSelector((state: RootState) => state.tests.status);
  const error = useSelector((state: RootState) => state.tests.error);

  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (test_id) {
      dispatch(fetchTestDetails(parseInt(test_id)));
    }
  }, [dispatch, test_id]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (test_id) {
      const id = parseInt(test_id);
      if (tab === 'logs' && !testLogs) {
        dispatch(fetchTestLogs(id));
      } else if (tab === 'root_cause' && !rootCauseAnalysis) {
        dispatch(fetchRootCauseAnalysis(id));
      }
    }
  };

  if (status === 'loading' && !testDetails) {
    return <div className="container mx-auto p-4">Loading test details...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  if (!testDetails) {
    return <div className="container mx-auto p-4">Test not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Test Details: {testDetails.name}</h1>

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => handleTabClick('overview')}
          >
            Overview
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'logs' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => handleTabClick('logs')}
          >
            Logs
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'root_cause' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => handleTabClick('root_cause')}
          >
            Root Cause
          </button>
          {/* Add History tab later */}
        </div>

        <div className="mt-4">
          {activeTab === 'overview' && (
            <DetailsPanel title="Test Overview">
              <p><strong>ID:</strong> {testDetails.id}</p>
              <p><strong>Project ID:</strong> {testDetails.project_id}</p>
              <p><strong>Status:</strong> {testDetails.status}</p>
              {/* Add more details here */}
            </DetailsPanel>
          )}
          {activeTab === 'logs' && testLogs && (
            <LogsViewer logs={testLogs.logs} />
          )}
          {activeTab === 'root_cause' && rootCauseAnalysis && (
            <DetailsPanel title="Root Cause Analysis">
              {rootCauseAnalysis.root_causes.length > 0 ? (
                <ul>
                  {rootCauseAnalysis.root_causes.map((cause: any, index: number) => (
                    <li key={index}>{cause}</li> // Assuming root_causes is an array of strings
                  ))}
                </ul>
              ) : (
                <p>No root cause analysis available.</p>
              )}
            </DetailsPanel>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDetailPage;
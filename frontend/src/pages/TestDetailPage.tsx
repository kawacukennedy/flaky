// Purpose: Detailed view of a single test with logs, history, metrics, and root cause analysis

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchTestDetails, fetchTestLogs } from '../app/slices/testDetailsSlice';
import { fetchRootCause } from '../app/slices/rootCauseAnalysisSlice';
import DetailsPanel from '../components/DetailsPanel';
import LogsViewer from '../components/LogsViewer';

const TestDetailPage: React.FC = () => {
  const { test_id } = useParams<{ test_id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const testDetails = useSelector((state: RootState) => state.testDetails.data);
  const testLogs = useSelector((state: RootState) => state.testDetails.logs);
  const rootCauseAnalysis = useSelector((state: RootState) => state.rootCauseAnalysis.data);
  const loading = useSelector((state: RootState) => state.testDetails.loading);
  const logsLoading = useSelector((state: RootState) => state.testDetails.logsLoading);
  const error = useSelector((state: RootState) => state.testDetails.error);

  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (test_id) {
      dispatch(fetchTestDetails(test_id));
    }
  }, [dispatch, test_id]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (test_id) {
      if (tab === 'logs' && !testLogs) {
        dispatch(fetchTestLogs(test_id));
      } else if (tab === 'root_cause' && rootCauseAnalysis.length === 0) {
        dispatch(fetchRootCause(test_id));
      }
    }
  };

  if (loading && !testDetails) {
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
            <LogsViewer logs={testLogs.logs} testId={test_id} hasMore={testLogs.has_more} loading={logsLoading} />
          )}
           {activeTab === 'root_cause' && (
             <DetailsPanel title="Root Cause Analysis">
               {rootCauseAnalysis.length > 0 ? (
                 <ul>
                   {rootCauseAnalysis.map((cause: any, index: number) => (
                     <li key={index}>
                       <strong>{cause.type}</strong>: {cause.description} (Severity: {cause.severity}, Confidence: {cause.confidence})
                     </li>
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
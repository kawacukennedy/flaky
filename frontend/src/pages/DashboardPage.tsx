import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LineChartComponent from "../components/LineChartComponent";
import PieChartComponent from "../components/PieChartComponent";
import TableComponent from "../components/TableComponent";
import SearchBar from "../components/SearchBar";
import SearchFilter from "../components/SearchFilter";
import Button from "../components/Button";
import useWebSocket from "../hooks/useWebSocket";
import type { RootState, AppDispatch } from "../app/store";
import { fetchDashboardSummary } from "../app/slices/dashboardSummarySlice";
import {
  fetchFilteredTests,
  setSelectedTestId,
} from "../app/slices/testsListSlice";
import { setQuery, setAppliedFilters } from "../app/slices/filtersSlice";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const dashboardSummary = useSelector(
    (state: RootState) => state.dashboardSummary,
  );
  const testsList = useSelector((state: RootState) => state.testsList);
  const filters = useSelector((state: RootState) => state.filters);

  const filterOptions = {
    status: ["pass", "fail", "skipped"],
    environment: ["local", "ci", "staging"],
  };

  useEffect(() => {
    dispatch(fetchDashboardSummary());
    dispatch(
      fetchFilteredTests({
        query: filters.query,
        filters: filters.appliedFilters,
      }),
    );
  }, [dispatch, filters.query, filters.appliedFilters]);

  const handleSearchChange = (term: string) => {
    dispatch(setQuery(term));
  };

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setAppliedFilters({ ...filters.appliedFilters, [key]: value }));
  };

  const handleClearFilters = () => {
    dispatch(setAppliedFilters({}));
  };

  const handleExportCSV = () => {
    if (!testsList.data.length) return;

    const headers = ["Name", "Status", "Flakiness Score", "Duration", "Environment", "Timestamp"];
    const csvContent = [
      headers.join(","),
      ...testsList.data.map(test => [
        test.name,
        test.status,
        test.flakiness_score,
        test.duration || "",
        test.environment || "",
        test.timestamp
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tests.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTableRowClick = (testId: string) => {
    dispatch(setSelectedTestId(testId));
    navigate(`/tests/${testId}`);
  };

  const handleWebSocketMessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);
    if (message.type === "new_test_run") {
      dispatch(fetchDashboardSummary());
      dispatch(
        fetchFilteredTests({
          query: filters.query,
          filters: filters.appliedFilters,
        }),
      );
    }
  };

  useWebSocket("ws://localhost:8000/ws/dashboard", {
    onMessage: handleWebSocketMessage,
  });

  const flakyTests = testsList.data.filter(
    (test) => test.flakiness_score > 0.5,
  );
  const stableTests = testsList.data.filter(
    (test) => test.flakiness_score <= 0.5,
  );

  const environmentStats = testsList.data.reduce((acc, test) => {
    const env = test.environment || 'unknown';
    if (!acc[env]) acc[env] = { total: 0, flaky: 0 };
    acc[env].total++;
    if (test.flakiness_score > 0.5) acc[env].flaky++;
    return acc;
  }, {} as Record<string, { total: number; flaky: number }>);

  const environmentChartData = {
    labels: Object.keys(environmentStats),
    datasets: [
      {
        label: 'Tests by Environment',
        data: Object.values(environmentStats).map(stat => stat.total),
        backgroundColor: ['#4F46E5', '#6366F1', '#FACC15', '#EF4444'],
        borderColor: ['#4F46E5', '#6366F1', '#FACC15', '#EF4444'],
        borderWidth: 1,
      },
    ],
  };

  // Handle empty datasets
  const pieChartData =
    testsList.data.length > 0
      ? {
          labels: ["Flaky Tests", "Stable Tests"],
          datasets: [
            {
              label: "Test Distribution",
              data: [flakyTests.length, stableTests.length],
              backgroundColor: ["#EF4444", "#10B981"],
              borderColor: ["#EF4444", "#10B981"],
              borderWidth: 1,
            },
          ],
        }
      : {
          labels: ["No Data"],
          datasets: [
            {
              label: "Test Distribution",
              data: [1],
              backgroundColor: ["#E5E7EB"],
              borderColor: ["#E5E7EB"],
              borderWidth: 1,
            },
          ],
        };

  const lineChartData =
    testsList.data.length > 0
      ? {
          labels: ["Tests"],
          datasets: [
            {
              label: "Total Tests",
              data: [testsList.data.length],
              borderColor: "#4F46E5",
              backgroundColor: "rgba(79, 70, 229, 0.1)",
            },
          ],
        }
      : {
          labels: ["No Data"],
          datasets: [
            {
              label: "Total Tests",
              data: [0],
              borderColor: "#E5E7EB",
              backgroundColor: "rgba(229, 231, 235, 0.1)",
            },
          ],
        };

  const tableColumns = [
    { key: "name", header: "Test Name", sortable: true },
    { key: "status", header: "Status", sortable: true },
    { key: "flakiness_score", header: "Flakiness Score", sortable: true },
    { key: "timestamp", header: "Last Run", sortable: true },
  ];

  if (dashboardSummary.loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>This is the dashboard.</p>
    </div>
  );
};

export default DashboardPage;

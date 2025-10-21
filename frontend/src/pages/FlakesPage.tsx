import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { fetchFilteredTests } from "../app/slices/testsListSlice";
import TableComponent from "../components/TableComponent";

const FlakesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const testsList = useSelector((state: RootState) => state.testsList);

  useEffect(() => {
    dispatch(fetchFilteredTests({ query: "", filters: {} }));
  }, [dispatch]);

  const flakyTests = testsList.data.filter(
    (test) => test.flakiness_score > 0.5,
  );

  const handleTableRowClick = (testId: string) => {
    navigate(`/tests/${testId}`);
  };

  const tableColumns = [
    { key: "name", header: "Test Name", sortable: true },
    { key: "status", header: "Status", sortable: true },
    { key: "flakiness_score", header: "Flakiness Score", sortable: true },
    { key: "timestamp", header: "Last Run", sortable: true },
  ];

  if (testsList.loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-h1 font-bold mb-6">Flaky Tests</h1>
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <TableComponent
          data={flakyTests}
          columns={tableColumns}
          onRowClick={handleTableRowClick}
        />
      </div>
    </div>
  );
};

export default FlakesPage;

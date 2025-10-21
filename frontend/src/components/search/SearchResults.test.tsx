import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResults from "./SearchResults";

describe("SearchResults", () => {
  it("renders loading state when loading is true", () => {
    render(<SearchResults results={[]} loading={true} />);
    expect(screen.getAllByTestId("loading-skeleton")).toHaveLength(3);
    expect(screen.queryByText("No results found")).not.toBeInTheDocument();
  });

  it('renders "No results found" when no results', () => {
    render(<SearchResults results={[]} loading={false} />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("renders search results when results are provided", () => {
    const testResults = [
      {
        id: "1",
        name: "Test 1",
        status: "pass",
        flakiness_score: 0.1,
        timestamp: "2023-01-01",
      },
    ];
    render(<SearchResults results={testResults} loading={false} />);
    expect(screen.getByText("Test 1")).toBeInTheDocument();
  });
});

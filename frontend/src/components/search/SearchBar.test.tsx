import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "./SearchBar";

// Mock SearchFilter to isolate SearchBar's logic
jest.mock("./SearchFilter", () => {
  return ({ label, onChange, currentValue }: any) => (
    <button
      data-testid={`filter-${label}`}
      onClick={() => onChange("mockValue")}
    >
      {label}: {currentValue}
    </button>
  );
});

describe("SearchBar", () => {
  const mockOnSearch = jest.fn();
  const mockOnFilterChange = jest.fn();
  const defaultFilters = { source: "All", date: "7d", sort: "Relevance" };

  beforeEach(() => {
    jest.useFakeTimers();
    mockOnSearch.mockClear();
    mockOnFilterChange.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders the search input with correct placeholder and aria-label", () => {
    render(
      <SearchBar
        onSearch={mockOnSearch}
        onFilterChange={mockOnFilterChange}
        currentFilters={defaultFilters}
      />,
    );
    const searchInput = screen.getByLabelText("Search input");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute(
      "placeholder",
      "Search flaky tests, logs, or errors...",
    );
  });

  it("calls onSearch after debounce when input value changes", async () => {
    render(
      <SearchBar
        onSearch={mockOnSearch}
        onFilterChange={mockOnFilterChange}
        currentFilters={defaultFilters}
      />,
    );
    const searchInput = screen.getByLabelText("Search input");
    fireEvent.change(searchInput, { target: { value: "test query" } });

    expect(mockOnSearch).not.toHaveBeenCalled(); // Should not be called immediately

    jest.advanceTimersByTime(300); // Advance timers by debounce_ms

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledTimes(1);
      expect(mockOnSearch).toHaveBeenCalledWith("test query");
    });
  });

  it("calls onFilterChange when a filter button is clicked", () => {
    render(
      <SearchBar
        onSearch={mockOnSearch}
        onFilterChange={mockOnFilterChange}
        currentFilters={defaultFilters}
      />,
    );
    fireEvent.click(screen.getByTestId("filter-Source"));
    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith("source", "mockValue");
  });

  it("applies focus styles to the search input", () => {
    render(
      <SearchBar
        onSearch={mockOnSearch}
        onFilterChange={mockOnFilterChange}
        currentFilters={defaultFilters}
      />,
    );
    const searchInput = screen.getByLabelText("Search input");
    fireEvent.focus(searchInput);
    expect(searchInput.closest("div")).toHaveClass("ring-2 ring-primary");
    fireEvent.blur(searchInput);
    expect(searchInput.closest("div")).not.toHaveClass("ring-2 ring-primary");
  });
});

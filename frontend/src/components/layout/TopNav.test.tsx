import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopNav from "./TopNav";
import { vi } from "vitest";

describe("TopNav", () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it("renders the TopNav component with the correct data-testid", () => {
    render(<TopNav onSearch={mockOnSearch} />);
    expect(screen.getByTestId("topnav")).toBeInTheDocument();
  });

  it("renders the application title", () => {
    render(<TopNav onSearch={mockOnSearch} />);
    expect(screen.getByText("FlakeHunter")).toBeInTheDocument();
  });

  it("calls onSearch with the correct value when search input changes", () => {
    render(<TopNav onSearch={mockOnSearch} />);
    const searchInput = screen.getByLabelText(
      "Search flaky tests, logs, or errors",
    );
    fireEvent.change(searchInput, { target: { value: "test query" } });
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("test query");
  });

  it('focuses the search input when "/" key is pressed', () => {
    render(<TopNav onSearch={mockOnSearch} />);
    const searchInput = screen.getByLabelText(
      "Search flaky tests, logs, or errors",
    );
    searchInput.blur(); // Ensure input is not focused initially
    fireEvent.keyDown(window, { key: "/" });
    expect(searchInput).toHaveFocus();
  });

  it("renders the account menu button with correct aria-label", () => {
    render(<TopNav onSearch={mockOnSearch} />);
    const accountMenuButton = screen.getByRole("button", { name: "Profile" });
    expect(accountMenuButton).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });
});

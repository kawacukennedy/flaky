import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchFilter from "./SearchFilter";

describe("SearchFilter", () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    label: "Source",
    options: ["All", "CI Logs", "GitHub", "Docs"],
    defaultValue: "All",
    currentValue: "All",
    onChange: mockOnChange,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders the filter button with the correct label and current value", () => {
    render(<SearchFilter {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: "Source: All" }),
    ).toBeInTheDocument();
  });

  it("opens the dropdown when the button is clicked", () => {
    render(<SearchFilter {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Source: All" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: "CI Logs" }),
    ).toBeInTheDocument();
  });

  it("closes the dropdown when an option is selected", () => {
    render(<SearchFilter {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Source: All" })); // Open
    fireEvent.click(screen.getByRole("menuitem", { name: "CI Logs" })); // Select
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("calls onChange with the selected value", () => {
    render(<SearchFilter {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Source: All" })); // Open
    fireEvent.click(screen.getByRole("menuitem", { name: "GitHub" })); // Select
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("GitHub");
  });

  it("displays the correct active option", () => {
    render(<SearchFilter {...defaultProps} currentValue="GitHub" />);
    fireEvent.click(screen.getByRole("button", { name: "Source: GitHub" })); // Open
    expect(screen.getByRole("menuitem", { name: "GitHub" })).toHaveClass(
      "bg-primary text-white",
    );
    expect(screen.getByRole("menuitem", { name: "CI Logs" })).not.toHaveClass(
      "bg-primary text-white",
    );
  });
});

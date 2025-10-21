import { render, screen, fireEvent } from "@testing-library/react";
import SolutionCard from "./SolutionCard";

describe("SolutionCard", () => {
  const defaultProps = {
    title: "Test Solution",
    snippet: "This is a test snippet.",
    source: "Test Source",
    tags: ["tag1", "tag2"],
    votes: 10,
    fullContent: "Full content of the test solution.",
  };

  it("renders solution card details", () => {
    render(<SolutionCard {...defaultProps} />);
    expect(screen.getByText("Test Solution")).toBeInTheDocument();
    expect(screen.getByText("This is a test snippet.")).toBeInTheDocument();
    expect(screen.getByText("Test Source")).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument(); // For votes
  });

  it("opens modal on card click", () => {
    render(<SolutionCard {...defaultProps} />);
    fireEvent.click(screen.getByText("Test Solution"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText("Full content of the test solution."),
    ).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    render(<SolutionCard {...defaultProps} />);
    fireEvent.click(screen.getByText("Test Solution")); // Open modal
    fireEvent.click(screen.getByLabelText("Close")); // Close modal
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls handleCopyCode when Copy Code button is clicked", () => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: jest.fn() },
      writable: true,
    });
    render(<SolutionCard {...defaultProps} />);
    fireEvent.click(screen.getByText("Test Solution")); // Open modal
    fireEvent.click(screen.getByRole("button", { name: /copy code/i }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      defaultProps.fullContent,
    );
  });
});

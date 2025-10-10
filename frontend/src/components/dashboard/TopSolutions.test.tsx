import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopSolutions from "./TopSolutions";

describe("TopSolutions", () => {
  it('renders the title "Top Solutions"', () => {
    render(<TopSolutions />);
    expect(screen.getByText("Top Solutions")).toBeInTheDocument();
  });

  it("renders the empty state when no solutions are provided", () => {
    render(<TopSolutions solutions={[]} />);
    expect(screen.getByText("No solutions found yet.")).toBeInTheDocument();
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument(); // Lucide-react Lightbulb icon
  });

  it("renders the empty state when solutions prop is undefined", () => {
    render(<TopSolutions />);
    expect(screen.getByText("No solutions found yet.")).toBeInTheDocument();
  });

  it("renders a list of solution cards when provided", () => {
    const solutions = [
      {
        id: "1",
        title: "Fixing Flaky Login",
        snippet: "A quick fix for login issues.",
        votes: 15,
      },
      {
        id: "2",
        title: "Optimizing Database Queries",
        snippet: "Improve performance with these tips.",
        votes: 22,
      },
    ];
    render(<TopSolutions solutions={solutions} />);
    expect(screen.getByText("Fixing Flaky Login")).toBeInTheDocument();
    expect(
      screen.getByText("A quick fix for login issues."),
    ).toBeInTheDocument();
    expect(screen.getByText("15 Upvotes")).toBeInTheDocument();
    expect(screen.getByText("Optimizing Database Queries")).toBeInTheDocument();
    expect(
      screen.getByText("Improve performance with these tips."),
    ).toBeInTheDocument();
    expect(screen.getByText("22 Upvotes")).toBeInTheDocument();
  });

  it("renders solution cards with correct hover effects (visually, not testable directly)", () => {
    const solutions = [
      { id: "1", title: "Test Solution", snippet: "Snippet text", votes: 10 },
    ];
    render(<TopSolutions solutions={solutions} />);
    const solutionCard = screen.getByText("Test Solution").closest("div");
    expect(solutionCard).toHaveClass("hover:scale-102");
    expect(solutionCard).toHaveClass("hover:shadow-md");
  });
});

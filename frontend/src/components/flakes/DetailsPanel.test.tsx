import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DetailsPanel from "./DetailsPanel";

// Mock @headlessui/react Transition component
jest.mock("@headlessui/react", () => ({
  Transition: ({
    show,
    children,
  }: {
    show: boolean;
    children: React.ReactNode;
  }) => (
    <div data-testid="transition-mock" className={show ? "" : "hidden"}>
      {children}
    </div>
  ),
}));

describe("DetailsPanel", () => {
  const mockSummaryContent = (
    <div data-testid="summary-content">Summary Details</div>
  );
  const mockRootCausesContent = (
    <div data-testid="root-causes-content">Root Causes Analysis</div>
  );
  const mockLinkedIssuesContent = (
    <div data-testid="linked-issues-content">Linked Issues List</div>
  );

  const defaultProps = {
    summaryContent: mockSummaryContent,
    rootCausesContent: mockRootCausesContent,
    linkedIssuesContent: mockLinkedIssuesContent,
  };

  it("renders the tabs correctly", () => {
    render(<DetailsPanel {...defaultProps} />);
    expect(screen.getByRole("tab", { name: "Summary" })).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Root Causes" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Linked Issues" }),
    ).toBeInTheDocument();
  });

  it("displays Summary content by default", () => {
    render(<DetailsPanel {...defaultProps} />);
    expect(screen.getByTestId("summary-content")).toBeVisible();
    expect(screen.queryByTestId("root-causes-content")).not.toBeVisible();
    expect(screen.queryByTestId("linked-issues-content")).not.toBeVisible();
  });

  it("switches to Root Causes tab when clicked", () => {
    render(<DetailsPanel {...defaultProps} />);
    fireEvent.click(screen.getByRole("tab", { name: "Root Causes" }));
    expect(screen.getByTestId("root-causes-content")).toBeVisible();
    expect(screen.queryByTestId("summary-content")).not.toBeVisible();
  });

  it("switches to Linked Issues tab when clicked", () => {
    render(<DetailsPanel {...defaultProps} />);
    fireEvent.click(screen.getByRole("tab", { name: "Linked Issues" }));
    expect(screen.getByTestId("linked-issues-content")).toBeVisible();
    expect(screen.queryByTestId("summary-content")).not.toBeVisible();
  });

  it("applies active styles to the active tab", () => {
    render(<DetailsPanel {...defaultProps} />);
    const summaryTab = screen.getByRole("tab", { name: "Summary" });
    expect(summaryTab).toHaveClass("bg-primary text-white");

    fireEvent.click(screen.getByRole("tab", { name: "Root Causes" }));
    const rootCausesTab = screen.getByRole("tab", { name: "Root Causes" });
    expect(rootCausesTab).toHaveClass("bg-primary text-white");
    expect(summaryTab).not.toHaveClass("bg-primary text-white");
  });
});

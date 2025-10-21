import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FlakesPage from "./FlakesPage";

// Mock child components to isolate FlakesPage's layout logic
jest.mock("../components/flakes/LogsViewer", () => {
  return () => <div data-testid="logs-viewer-mock">Logs Viewer Mock</div>;
});

jest.mock("../components/flakes/DetailsPanel", () => {
  return () => <div data-testid="details-panel-mock">Details Panel Mock</div>;
});

describe("FlakesPage", () => {
  it("renders LogsViewer and DetailsPanel components", () => {
    render(<FlakesPage />);
    expect(screen.getByTestId("logs-viewer-mock")).toBeInTheDocument();
    expect(screen.getByTestId("details-panel-mock")).toBeInTheDocument();
  });

  it("applies the correct flex layout classes", () => {
    render(<FlakesPage />);
    const mainDiv = screen
      .getByTestId("logs-viewer-mock")
      .closest("div")?.parentElement;
    expect(mainDiv).toHaveClass("flex");
    expect(mainDiv).toHaveClass("h-full");

    const logsViewerDiv = screen.getByTestId("logs-viewer-mock").parentElement;
    expect(logsViewerDiv).toHaveClass("flex-grow-[3]");

    const detailsPanelDiv =
      screen.getByTestId("details-panel-mock").parentElement;
    expect(detailsPanelDiv).toHaveClass("flex-grow-[2]");
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";
import { describe, it, expect, vi } from "vitest";

describe("Input", () => {
  it("renders with a label and placeholder", () => {
    render(
      <Input id="test-input" label="Test Label" placeholder="Enter text" />,
    );
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("displays an error message when provided", () => {
    render(
      <Input id="test-input" label="Test Label" error="Error message here" />,
    );
    expect(screen.getByText("Error message here")).toBeInTheDocument();
    expect(screen.getByLabelText("Test Label")).toHaveClass("border-danger");
  });

  it("calls onChange handler when input value changes", async () => {
    const handleChange = vi.fn();
    render(<Input id="test-input" onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "hello");
    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it("applies custom className", () => {
    render(<Input id="test-input" className="custom-class" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-class");
  });

  it("applies focus styles", () => {
    render(<Input id="test-input" />);
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    expect(input).toHaveClass("focus:ring-primary");
  });

  it("does not display error message when error is not provided", () => {
    render(<Input id="test-input" label="Test Label" />);
    expect(screen.queryByText("Error message here")).not.toBeInTheDocument();
  });
});

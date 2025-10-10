import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders with default primary variant", () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole("button", { name: /test button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
  });

  it("renders with secondary variant", () => {
    render(<Button variant="secondary">Test Button</Button>);
    const button = screen.getByRole("button", { name: /test button/i });
    expect(button).toHaveClass("bg-secondary");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);
    fireEvent.click(screen.getByRole("button", { name: /test button/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom size styles", () => {
    render(<Button size={{ width: 100, height: 50 }}>Test Button</Button>);
    const button = screen.getByRole("button", { name: /test button/i });
    expect(button).toHaveStyle("width: 100px");
    expect(button).toHaveStyle("height: 50px");
  });
});

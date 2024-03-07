import React from "react";
import { render, screen } from "@testing-library/react";
import { Container } from "../Container";

describe("Container component", () => {
  it("renders with correct className", () => {
    render(<Container />);
    const container = screen.getByTestId("container");
    expect(container).toHaveClass("container");
  });

  it("renders children correctly", () => {
    const text = "Hello, World!";
    render(
      <Container>
        <div>{text}</div>
      </Container>,
    );
    const children = screen.getByText(text);
    expect(children).toBeInTheDocument();
  });
});

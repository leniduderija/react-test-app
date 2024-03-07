import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorFallback } from "../ErrorFallback";

test("renders error fallback component", () => {
  render(<ErrorFallback />);
  const element = screen.getByTestId("ErrorFallback");
  expect(element).toHaveClass("ErrorFallback");
});

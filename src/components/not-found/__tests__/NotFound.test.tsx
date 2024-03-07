import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "../NotFound";

test("renders not found component", () => {
  render(<NotFound />);
  const element = screen.getByTestId("NotFound");
  expect(element).toHaveClass("NotFound");
});

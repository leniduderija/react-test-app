import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "../Input";

test("renders button", () => {
  render(<Input />);
  const element = screen.getByTestId("Input");
  expect(element).toHaveClass("Input");
});

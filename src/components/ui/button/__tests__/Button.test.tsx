import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "../Button";
import { LOG_MESSAGE } from "config";

test("renders button", () => {
  render(<Button logMessage={LOG_MESSAGE} />);
  const element = screen.getByTestId("Button");
  expect(element).toHaveClass("Button");
  expect(element).toBeInTheDocument();
});

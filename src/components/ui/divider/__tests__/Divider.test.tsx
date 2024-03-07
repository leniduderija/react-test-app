import React from "react";
import { render, screen } from "@testing-library/react";
import { Divider } from "../Divider";

test("renders divider", () => {
  render(<Divider />);
  const element = screen.getByTestId("Divider");
  expect(element).toHaveClass("Divider");
});

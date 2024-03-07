import React from "react";
import { render, screen } from "@testing-library/react";
import { MainLayout } from "../MainLayout";

test("renders main layout", () => {
  render(<MainLayout />);
  const mainElement = screen.getByTestId("MainLayout");
  expect(mainElement).toHaveClass("MainLayout");

  const headerlement = screen.getByTestId("Header");
  expect(headerlement).toHaveClass("Header");

  const footerElement = screen.getByTestId("Footer");
  expect(footerElement).toHaveClass("Footer");
});

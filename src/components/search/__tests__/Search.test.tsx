import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Search } from "../Search";

jest.useFakeTimers();

describe("Renders Search component", () => {
  const onChangeMock = jest.fn();
  const loadingMock = { on: jest.fn(), off: jest.fn() };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default placeholder and calls onChange handler on input change with debouncing off", async () => {
    const placeholder = "Search";
    render(<Search debounced={false} onChange={onChangeMock} />);

    const element = screen.getByTestId("Search");
    expect(element).toHaveClass("Search");
    expect(element).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText(placeholder);
    fireEvent.change(inputElement, { target: { value: "test" } });

    expect(onChangeMock).toHaveBeenCalledWith("test");
  });

  it("calls loading.on when input changes", async () => {
    const placeholder = "Search";
    render(<Search onChange={onChangeMock} loading={loadingMock} />);

    const inputElement = screen.getByPlaceholderText(placeholder);
    fireEvent.change(inputElement, { target: { value: "test" } });

    expect(loadingMock.on).toHaveBeenCalled();
  });

  it("calls loading.off after debounce time", async () => {
    const placeholder = "Search";
    render(<Search onChange={onChangeMock} loading={loadingMock} />);

    const inputElement = screen.getByPlaceholderText(placeholder);
    fireEvent.change(inputElement, { target: { value: "test" } });

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(loadingMock.off).toHaveBeenCalled();
    });
  });
});

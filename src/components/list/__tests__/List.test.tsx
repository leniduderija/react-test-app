import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { List } from "../List";
import { mockPostsData } from "../../../utils/mock-data/mockPosts";
import { LOG_MESSAGE } from "config";

describe("Render List component", () => {
  it("renders with correct items", () => {
    render(
      <MemoryRouter>
        <List items={mockPostsData} logMessage={LOG_MESSAGE} />
      </MemoryRouter>,
    );

    // Check if the List component is rendered
    const list = screen.getByTestId("List");
    expect(list).toBeInTheDocument();

    // Check if the items are rendered correctly
    mockPostsData.forEach((post) => {
      const postCard = screen.getByText(post.title);
      expect(postCard).toBeInTheDocument();
    });
  });

  it('renders "No items" when items array is empty', () => {
    render(
      <MemoryRouter>
        <List items={[]} logMessage={LOG_MESSAGE} />
      </MemoryRouter>,
    );

    // Check if the List component is rendered
    const list = screen.getByTestId("List");
    expect(list).toBeInTheDocument();

    // Check if "No items" text is rendered
    const noItems = screen.getByText("No items");
    expect(noItems).toBeInTheDocument();
  });
});

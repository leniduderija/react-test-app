import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { PostCard } from "../PostCard";
import { mockPostsData } from "utils/mock-data/mockPosts";
import { LOG_MESSAGE } from "config";

describe("Render PostCard component", () => {
  const post = mockPostsData[0];

  it("renders with correct post information", () => {
    render(<PostCard post={post} logMessage={LOG_MESSAGE} />);

    const element = screen.getByTestId("Card");
    expect(element).toHaveClass("PostCard");
    expect(element).toBeInTheDocument();

    console.log("element", element);

    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(`By ${post.user.name}`)).toBeInTheDocument();
    expect(screen.getByText(post.body)).toBeInTheDocument();
    expect(
      screen.getByText(`Comments: ${post.comments.length}`),
    ).toBeInTheDocument();
  });

  it('toggles comments visibility when "Show Comments" button is clicked', () => {
    render(<PostCard post={post} />);

    expect(screen.queryByText(post.comments[0].name)).toBeNull(); // Comments should be initially hidden

    fireEvent.click(screen.getByText("Show Comments"));

    expect(screen.getByText(post.comments[0].name)).toBeInTheDocument(); // Comments should be visible after click

    fireEvent.click(screen.getByText("Hide Comments"));

    expect(screen.queryByText(post.comments[0].name)).toBeNull(); // Comments should be hidden again after second click
  });

  it('does not render "Show Comments" button when defaultShowComments prop is true', () => {
    render(<PostCard post={post} defaultShowComments />);

    expect(screen.queryByText("Show Comments")).toBeNull(); // "Show Comments" button should not be rendered
  });
});

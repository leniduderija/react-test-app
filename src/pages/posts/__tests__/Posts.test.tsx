import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import Posts from "../Posts";
import { mockPostsData } from "utils/mock-data/mockPosts";

import axios from "axios";
import { mockUsers } from "utils/mock-data/mockUsers";
import { mockComments } from "utils/mock-data/mockComments";
import { postsService, usersService, commentsService } from "services/api";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      interceptors: {
        response: { use: jest.fn() },
      },
    })),
    get: jest.fn(() => Promise.resolve({ data: mockPostsData })),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedPostsService = postsService as jest.Mocked<typeof postsService>;
const mockedUsersService = usersService as jest.Mocked<typeof usersService>;
const mockedCommentsService = commentsService as jest.Mocked<
  typeof commentsService
>;

// Mock the services
jest.mock("services/api", () => ({
  postsService: {
    getPosts: jest.fn(),
  },
  usersService: {
    getUsers: jest.fn(),
  },
  commentsService: {
    getComments: jest.fn(),
  },
}));

describe("Render Posts page", () => {
  const posts = mockPostsData;
  const usersData = mockUsers;
  const mockCommentsData = mockComments;

  beforeEach(() => {
    // Mock API responses
    mockedPostsService.getPosts.mockResolvedValueOnce(mockPostsData);
    mockedUsersService.getUsers.mockResolvedValueOnce(usersData);
    mockedCommentsService.getComments.mockResolvedValueOnce(mockCommentsData);
  });

  it("renders fetching data component while loading", async () => {
    // Make the mock return the custom axios response
    mockedAxios.get.mockResolvedValueOnce({
      data: posts,
    });

    render(
      <MemoryRouter>
        <Posts />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(posts[0].title)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(posts[1].title)).toBeInTheDocument();
    });
  });

  it("filters posts by author name when search term is provided", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: posts,
    });

    render(
      <MemoryRouter>
        <Posts />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(posts[0].title)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(posts[1].title)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(
      "Search posts by author name...",
    );
    fireEvent.change(searchInput, { target: { value: posts[1].user.name } });
    await waitFor(() => {
      expect(screen.getByText(posts[1].title)).toBeInTheDocument(); // 'Post 2' should be displayed after filtering
    });

    await waitFor(() => {
      expect(screen.queryByText(posts[3].title)).toBeNull(); // Post 4 should not be displayed after filtering because userId is different
    });
  });
});

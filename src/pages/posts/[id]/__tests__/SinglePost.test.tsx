import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { mockPostsData } from "utils/mock-data/mockPosts";
import Post from "../SinglePost";
import axios from "axios";
import { mockUsers } from "utils/mock-data/mockUsers";
import { postsService, usersService, commentsService } from "services/api";
import { MemoryRouter } from "react-router-dom";
import { mockSinglePostComments } from "utils/mock-data/mockSinglePostComments";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      interceptors: {
        response: { use: jest.fn() },
      },
    })),
    get: jest.fn(() => Promise.resolve({ data: mockPostsData[0] })),
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
    getPost: jest.fn(),
    getPostComments: jest.fn(),
  },
  usersService: {
    getUser: jest.fn(),
  },
}));

describe("Render Post by ID page", () => {
  const post = mockPostsData[0];
  const user = mockUsers[0];
  const comments = mockSinglePostComments;

  beforeEach(() => {
    // Mock API responses
    mockedPostsService.getPost.mockResolvedValueOnce(post);
    mockedPostsService.getPostComments.mockResolvedValueOnce(comments);
    mockedUsersService.getUser.mockResolvedValueOnce(user);
  });

  it("renders fetching data component while loading", async () => {
    // Make the mock return the custom axios response
    mockedAxios.get.mockResolvedValueOnce({
      data: post,
    });

    render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(`By ${post.user.name}`)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(post.body)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(post.comments[0].name)).toBeInTheDocument();
    });
  });
});

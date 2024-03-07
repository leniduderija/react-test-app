import httpClient from "lib/http/http-client";
import { CommentDto, PostDto } from "services/type-defs/type-defs";

const getPosts = (): Promise<PostDto[]> => httpClient.get("/posts");

const getPost = async (id: number): Promise<PostDto> =>
  httpClient.get(`/posts/${id}`);

const getPostComments = async (id: number): Promise<CommentDto[]> =>
  httpClient.get(`/posts/${id}/comments`);

export const postsService = {
  getPosts,
  getPost,
  getPostComments,
};

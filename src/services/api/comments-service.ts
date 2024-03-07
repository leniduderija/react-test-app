import httpClient from "lib/http/http-client";
import { CommentDto } from "services/type-defs/type-defs";

const getComments = (postId?: string): Promise<CommentDto[]> =>
  postId
    ? httpClient.get(`/comments?postId=${postId}`)
    : httpClient.get("/comments");

export const commentsService = {
  getComments,
};

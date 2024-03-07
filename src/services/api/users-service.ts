import httpClient from "lib/http/http-client";
import { CommentDto, UserDto } from "services/type-defs/type-defs";

const getUsers = (): Promise<UserDto[]> => httpClient.get("/users");

const getUser = async (id: number): Promise<UserDto> =>
  httpClient.get(`/users/${id}`);

const getUserComments = async (id: number): Promise<CommentDto[]> =>
  httpClient.get(`/users/${id}/comments`);

export const usersService = {
  getUsers,
  getUser,
  getUserComments,
};

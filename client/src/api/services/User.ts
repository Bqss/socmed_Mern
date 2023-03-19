import { AxiosResponse } from "axios";
import { PaginatedResult, User } from "../../types/payload";
import { api, privateApi } from "./../instances";

export const getAllUser = async () => {
  const result = await api.get<User[]>("/user");
  return result.data;
};
export const getUserById = async (id: string) => {

  const result = await api.get<User>(`/user/${id}`);
  return result.data;
};

export const getUserCrediental = async () => {
  const result = await privateApi.get(`/user/crediental`);
  return result.data;
};

export const getUserFollower = async ({pageParam, limit} :{pageParam?: number, limit? : number}) => {
  const result = await privateApi.get<PaginatedResult<string>>(`/user/followers?limit=${limit}&page=${pageParam}`);
  return result.data;
}

export const followUser = async ({id}:{id: string}) => {
  const result = await privateApi.put(`user/${id}/follow`);
  return result.data;
} 
export const unfollowUser = async ({id}:{id: string}) => {
  const result = await privateApi.put(`user/${id}/unfollow`);
  return result.data;
} 

export const updateUserProfile = async ({id, body}:{id: string, body: {}}) => {
  const result = await  privateApi.put(`user/${id}`,{
    ...body
  },{
    headers : {
      "Content-Type" : "multipart/form-data"
    },
  });
  return result.data;
}

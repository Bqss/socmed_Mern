import { AxiosResponse } from "axios";
import { api } from "./Auth";

export const getAllUser = async () => {
  const result = await api.get<AxiosResponse<User[]>>("/user");
  return result.data;
};
export const getUserById = async (id: string) => {
  const result = await api.get<User>(`/user/${id}`);
  return result.data;
};

export const getUserCrediental = async () => {
  const result = await api.get(`/user/crediental`, {
    withCredentials: true,
  });
  return result.data;
};

import axios, { AxiosError, isAxiosError } from "axios";
import { api, privateApi } from "../instances";




// api.interceptors.response.use(response => response , (error => {
//   if(isAxiosError(error)&& error.response?.status == 401 ){
//     return <Navigate to="/login"/>
//   }
// }))


interface LoginPayload {
  userName: string;
  password: string;
}
export const login = async (payload: LoginPayload) => {
  const result = await privateApi.post("/auth/login", payload);
  return result.data;
};

interface RegisterPayload extends LoginPayload {
  firstName: string;
  lastName: string;
}

export const register = async (payload: RegisterPayload) => {
  const result = await api.post("/auth/register", payload);
  return result.data;
};



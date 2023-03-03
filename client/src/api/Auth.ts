import axios, { AxiosError, isAxiosError } from "axios";


export const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  timeout: 1000
});

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
  const result = await api.post("/auth/login", payload);
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

export const checkAuth = async () => {
  const result = await api.get("/auth");
  return result.data;
}

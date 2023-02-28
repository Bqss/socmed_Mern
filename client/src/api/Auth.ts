import axios from "axios" ;

export const api = axios.create({baseURL: "http://localhost:5000"});

interface LoginPayload {
  userName: string,
  password: string
}
export const login = async(payload: LoginPayload) => {
  const result = await api.post("/auth/login",payload);
  return result.data;
}

interface RegisterPayload extends LoginPayload {
  firstName: string,
  lastName: string
}

export const register = async(payload: RegisterPayload) => {
  const result = await api.post("/auth/register",payload);
  return result.data;
}
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});


export const privateApi = axios.create({
  baseURL : "http://localhost:5000",
  withCredentials : true
});
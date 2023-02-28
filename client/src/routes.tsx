import {createBrowserRouter} from "react-router-dom";
import { Home, Login, MyProfile, Register } from "./pages";


export const route =  createBrowserRouter([
  {
    path : "/",
    element : <Home/>
  },
  {
    path : "/:username",
    element : <MyProfile/>
  },
  {
    path : "/Login",
    element : <Login/>
  },
  {
    path : "/Register",
    element : <Register />
  },

])
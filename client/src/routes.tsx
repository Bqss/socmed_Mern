import {createBrowserRouter} from "react-router-dom";
import ProtectedRoute from "./components/hoc/protectedRoute";

import { Home, Login, MyProfile, Register } from "./pages";


export const route =  createBrowserRouter([
  {
    path : "/",
    element : ProtectedRoute(Home)
  },
  {
    path : "/:username",
    element : ProtectedRoute(MyProfile)
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
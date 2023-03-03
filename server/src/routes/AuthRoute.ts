import express from "express";
import { authenticated, login, register} from "../controllers/AuthController.js";

export const AuthRoute = express.Router();


AuthRoute.post("/register", register ); 
AuthRoute.post("/login",login);
AuthRoute.get("/",authenticated);









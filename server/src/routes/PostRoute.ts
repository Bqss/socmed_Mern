import { createPost, getAllPost } from "./../controllers/PostController.js";
import express from "express";

export const postRoute = express.Router();


postRoute.post("/", createPost);
postRoute.get("/",getAllPost)

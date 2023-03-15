import { addComment, createPost, deleteComment, getAllPost, likePost, unlikePost } from "./../controllers/PostController.js";
import express from "express";

export const postRoute = express.Router();


postRoute.post("/", createPost);
postRoute.get("/",getAllPost);
postRoute.put("/:postId/like",likePost);
postRoute.put("/:postId/unlike",unlikePost);
postRoute.post("/:postId/comment",addComment);
postRoute.delete("/:postId/comment/:commentId",deleteComment);
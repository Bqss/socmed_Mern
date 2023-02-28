import { followUser, getAllUser, getUserById, unfollowUser, updateUser } from './../controllers/UserController.js';
import express from "express";
import authMiddleware from './../middleware/AuthMiddleware.js';

export const UserRoute = express.Router();

UserRoute.get("/",getAllUser);
UserRoute.get("/:id",getUserById);
UserRoute.put("/:id",authMiddleware,updateUser);
UserRoute.put("/:id/follow",authMiddleware,followUser);
UserRoute.put("/:id/unfollow",authMiddleware,unfollowUser);


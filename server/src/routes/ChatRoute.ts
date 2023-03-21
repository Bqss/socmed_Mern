import { createNewChat, getUserChatById } from "./../controllers/ChatController.js";
import { Router } from "express";

export const chatRoute = Router();

chatRoute.post("/",createNewChat);
chatRoute.get("/:userId",getUserChatById);
// chatRoute.get("/:userId/:contactId");
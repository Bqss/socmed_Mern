import { addMessage, createNewChat, getAllMessageByChatId, getUserChatByUserId } from "./../controllers/ChatController.js";
import { Router } from "express";

export const chatRoute = Router();

chatRoute.post("/",createNewChat);
chatRoute.get("/:userId",getUserChatByUserId);
chatRoute.get("/:chatId/messages",getAllMessageByChatId);
chatRoute.post("/:chatId",addMessage);
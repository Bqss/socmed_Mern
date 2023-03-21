import { addMessage, getMsgByChatId } from "./../controllers/MessageController.js";
import { Router } from "express";

export const msgRoute = Router();

msgRoute.post("/:chatId",addMessage);
msgRoute.get("/:chatId",getMsgByChatId);



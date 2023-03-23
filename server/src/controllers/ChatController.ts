import { RequestHandler } from "express";
import ChatModel from "./../models/ChatModel.js";

export const createNewChat: RequestHandler = async(req, res) => {
  const {userId, contactId} = req.body;
  try {
    const result = await ChatModel.create({
      owner : userId,
      contactId
    })
    res.status(201).send(result)
  } catch (error) {
    res.sendStatus(500);
  }
}

export const getUserChatByUserId : RequestHandler = async (req, res) => {
  const {userId} = req.params;
  try {
    const result = await ChatModel.find({$or: [{owner : {$eq : userId}}, {contactId: {$eq: userId}}]}, "-messages");
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export const getAllMessageByChatId : RequestHandler = async (req, res) => {
  const {chatId} = req.params;
  try {
    const result = await ChatModel.findById(chatId);
    res.status(200).send(result);
  } catch (error) {
    res.sendStatus(500);
  }
}

export const addMessage : RequestHandler = async (req, res) => {
  const {chatId , senderId, message , receiverId} = req.body;

  try {
    const result = await ChatModel.findById(chatId).updateOne({$push : { messages : {senderId , message, receiverId}}});
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
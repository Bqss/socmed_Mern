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

export const getUserChatById : RequestHandler = async (req, res) => {
  const {userId} = req.params;
  try {
    const result = await ChatModel.find({owner : {$eq : userId}});
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
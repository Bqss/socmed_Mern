import { RequestHandler } from "express";
import MessageModel from "./../models/MessageModel.js";


export const addMessage: RequestHandler = async(req, res) => {
  const {chatId} = req.params;
  const {userId, receiverId, message} = req.body;

  try{
    const result = await  MessageModel.create({
      chatId, senderId : userId, receiver : receiverId, message
    })
    res.status(201).send(result);
    
  }catch(err){
    res.sendStatus(500);
  }
}

export const getMsgByChatId : RequestHandler= async(req, res) => {
  const {chatId} = req.params;
  try{
    const result = await MessageModel.find({chatId : { $eq : chatId }});
    res.status(200).send(result)
  }catch(err){
    res.status(500).send(err);
  }

}
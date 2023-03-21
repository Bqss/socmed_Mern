import { model, Schema } from "mongoose";

const messageModel = new Schema({
  chatId: String,
  senderId: String,
  receiverId: String,
  message : String,
},{
  timestamps : true
})

export default model("message",messageModel);
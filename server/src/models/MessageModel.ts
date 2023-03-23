import { model, Schema } from "mongoose";

export const messageSchema =  new Schema({
  senderId: String,
  receiverId: String,
  message: String
},{
  timestamps: true
})


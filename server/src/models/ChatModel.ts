import { model, Schema } from "mongoose";
import  { messageSchema } from "./MessageModel.js";

const chatSchema = new Schema({
  owner : String,
  contactId : String,
  messages :  {
    type: [messageSchema],
    default: []
  },
},{
  timestamps: true
})

export default model("chat", chatSchema);
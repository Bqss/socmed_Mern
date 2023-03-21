import { model, Schema } from "mongoose";

const chatSchema = new Schema({
  owner : String,
  contactId : String
},{
  timestamps: true
})

export default model("chat", chatSchema);
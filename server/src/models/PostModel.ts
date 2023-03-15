import mongoose, { Schema } from "mongoose";
import { commentSchema } from "./CommentModel.js";

export const postSchema = new Schema({
  creator: { type: String, required: true },
  desc: { type: String, required: true },
  media: String,
  likes: {
    type: [String],
    default: []
  },
  comments: {
    type: [commentSchema],
    default: []
  },
  
},{timestamps: true});


export default mongoose.model("Post", postSchema);
  
import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  creator: { type: String, required: true },
  desc: { type: String, required: true },
  likes: {
    type: [{ String }],
    default: []
  },
  media: String,
},{timestamps: true});


export default mongoose.model("Post", postSchema);
  
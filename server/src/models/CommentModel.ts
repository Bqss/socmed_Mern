import mongoose, { Schema } from "mongoose";

const subComment = new Schema({
  userId: {
    type: String,
    required: true
  },
  comment :{
    type: String,
    required: true,
  }
},{timestamps : true})

export const commentSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  comment :{
    type: String,
    required: true,
  },
  replyComment: {
    type: [subComment],
    default: [],
  }
},{timestamps : true})





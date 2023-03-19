import { RequestHandler } from "express";
import { AnyArray } from "mongoose";
import cloudinary from "util/cloudinary.js";

import PostModel from "./../models/PostModel.js";
import { uploadMedia } from "./MediaController.js";
import { deleteMedia } from "./MediaController.js";

export const createPost: RequestHandler = async (req, res) => {
  const { userId, desc } = req.body;
  const media: any = req.files?.media;

  let result : any = null;
  try{
    if(media){
      try{
        result  = await uploadMedia(media, userId);

      }catch(e){
        res.sendStatus(500);
      }  
    }
    
    await PostModel.create({
      creator: userId,
      desc,
      media: {
        url: result?.url,
        media_PID: result?.public_id,
        media_name: result?.original_filename,
      },
    });
    res.status(201).send({ message: "post created successfully" });
  }catch(err){
    res.status(500).send({ message: "server error" });
  }
  
};

export const deletePost: RequestHandler = async (req, res) => {
  const { postId } = req.params;

  try {
    const postMedia = await PostModel.findById(postId);
    if (!postMedia) return res.sendStatus(404);
    if (postMedia.media && postMedia.media?.media_PID) {
      await deleteMedia(postMedia.media.media_PID)
    }
    await PostModel.deleteOne({ _id: postId });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getAllPost: RequestHandler = async (req, res) => {
  try {
    const result = await PostModel.find().sort({ createdAt: "desc" });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "server error" });
  }
};

export const likePost: RequestHandler = async (req, res) => {
  const postId = req.params.postId;
  const { userId } = req.body;
  try {
    await PostModel.findById(postId).updateOne({ $push: { likes: userId } });
    res.status(201).send("success like this post");
  } catch (err) {
    res.status(500).send(err);
  }
};
export const unlikePost: RequestHandler = async (req, res) => {
  const postId = req.params.postId;
  const { userId } = req.body;
  try {
    await PostModel.findById(postId).updateOne({ $pull: { likes: userId } });
    res.status(201).send("success unlike this post");
  } catch (err) {
    res.status(500).send(err);
  }
};

export const addComment: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  const { userId, comment } = req.body;

  try {
    if (!(await PostModel.findById(postId).countDocuments()))
      return res.sendStatus(404);
    const result = await PostModel.findById(postId).updateOne({
      $push: { comments: { userId, comment } },
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deleteComment: RequestHandler = async (req, res) => {
  const { postId, commentId } = req.params;
  const { userId } = req.body;

  try {
    if (!(await PostModel.findById(postId).countDocuments()))
      return res.sendStatus(404);
    await PostModel.findById(postId).updateOne({
      $pull: { comments: { _id: commentId } },
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

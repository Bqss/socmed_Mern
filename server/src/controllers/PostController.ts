import { RequestHandler } from "express";
import cloudinary from "./../util/cloudinary.js";
import PostModel from "./../models/PostModel.js";

export const createPost: RequestHandler = async (req, res) => {
  const {userId, desc } = req.body;
  const media : any = req.files?.media
  const mediaPath = media?.tempFilePath;
  try {
    let result ;
    if(media){
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
       result = await cloudinary.v2.uploader.upload(mediaPath,options);
    }
    
    await PostModel.create({
      creator: userId,desc,media : result?.url?? null,
    })

    res.status(201).send({message: "post created successfully"})
  } catch (error) {
    res.status(500).send({message: "server error"})
  }
}


export const getAllPost : RequestHandler = async (req, res) => {
  try{
    const result = await PostModel.find().sort({createdAt: "desc"});
    res.status(200).send(result);
  }catch(err){
    res.status(500).send({message: "server error"})
  }
  
}

export const likePost : RequestHandler = async (req, res) => {
  const postId = req.params.postId;
  const {userId} = req.body;
  try{
     await PostModel.findById(postId).updateOne({$push : {likes : userId} });
     res.status(201).send("success like this post");
  }catch (err){
    res.status(500).send(err)
  }
}
export const unlikePost : RequestHandler = async (req, res) => {
  const postId = req.params.postId;
  const {userId} = req.body;
  try{
     await PostModel.findById(postId).updateOne({$pull : {likes : userId} });
     res.status(201).send("success unlike this post");
  }catch (err){
    res.status(500).send(err)
  }
}


export const addComment: RequestHandler = async (req, res) => {
  const {postId} = req.params;
  const {userId, comment} = req.body;

  try {
    if(!await PostModel.findById(postId).countDocuments()) return res.sendStatus(404);
    const result = await PostModel.findById(postId).updateOne({$push : {comments: {userId,comment}}});
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export const deleteComment: RequestHandler = async (req, res) => {
  const {postId, commentId} = req.params;
  const {userId} = req.body;

  try{
    if(!await PostModel.findById(postId).countDocuments()) return res.sendStatus(404);
      // const comment= await PostModel.findById(postId,["comments","-_id"]).where({comments : {$elemMatch :{_id : commentId }}})
      // console.log(comment);
      await PostModel.findById(postId).updateOne({$pull : {comments: {_id: commentId}}});
      res.sendStatus(200);
    }catch(error){
      console.log(error);
      res.sendStatus(500);
  }
}

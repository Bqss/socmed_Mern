import { RequestHandler } from "express";
import cloudinary from "./../util/cloudinary.js";
import PostModel from "./../models/PostModel.js";

export const createPost: RequestHandler = async (req, res) => {
  const {userId, desc } = req.body;
  const media : any = req.files?.media
  const mediaPath = media?.tempFilePath;
  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    const result = await cloudinary.v2.uploader.upload(mediaPath,options);
    console.log(result)

    await PostModel.create({
      creator: userId,desc,media : result.url,
    })

    res.status(201).send({message: "post created successfully"})
  } catch (error) {
    res.status(500).send({message: "server error"})
  }
}


export const getAllPost : RequestHandler = async (req, res) => {
  try{
    const result = await PostModel.find();
    res.status(200).send(result);
  }catch(err){
    res.status(500).send({message: "server error"})
  }
  
}
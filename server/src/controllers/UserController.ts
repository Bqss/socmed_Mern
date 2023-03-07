import { Request, RequestHandler, Response } from "express";
import UserModel from "./../models/UserModel.js";
import dot from "dotenv";
import { userInfo } from "os";

dot.config();
const { env }: any = process;

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById<any>(id);
    if (user) {
      const { password, ...other } = user?._doc;
      res.status(200).json(other);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find<any>();
    const result = [...users].map((r) => {
      const { password, ...other } = r._doc;
      return { ...other };
    });
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getUserCrediental = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const user = await UserModel.findById<any>(userId);
    if (user) {
      const { userName, firstName, followers, following , lastName, profilePicture, _id } = user?._doc;

      res.status(200).json({
        userName,
        firstName,
        lastName,
        followers,
        following,
        profilePicture,
        _id,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getUserFollower: RequestHandler = async (req, res) => {
  const userId = req.body.userId;
  const limit = parseInt(req.params.limit) || 4;
  const cursor = parseInt(req.params.cursor) || 1;

  const start = (cursor - 1) * limit;

  try {
    const total = await UserModel.findOne({_id: userId},[
      "followers",
      "-_id",
    ]).countDocuments();

    const followers = await UserModel.findOne({ _id: userId }, [
      "followers",
      "-_id",
    ])
      .skip(start)
      .limit(limit)
      .sort({ following: "asc" });

    
    res.status(200).json({
      data: followers?.followers,
      prevId: cursor > 1 ? cursor - 1 : null,
      nextId: cursor < Math.ceil(total / limit)-1 ? cursor +1 :null,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId: currentId } = req.body;
  console.log(req.body);
  const {
    coverPicture,
    profilePicture,
    about,
    livesIn,
    relationship,
    website,
    workAt,
  } = req.body;
  if (id === currentId) {
    try {
      await UserModel.findByIdAndUpdate(
        id,
        {
          coverPicture,
          profilePicture,
          about,
          livesIn,
          relationship,
          website,
          workAt,
        },
        {
          new: true,
        }
      );
      res.status(200).json({ message: "success updating" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(403).json({ message: "Can't update another's profile" });
  }
};

export const followUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (id === userId) {
    return res.status(403).json({ message: "Action forbidden" });
  }

  try {
    const self = await UserModel.findById(userId);
    const opp = await UserModel.findById(id);

    if (opp?.followers.includes(userId) || self?.following.includes(id)) {
      res.status(403).json({ message: "You've already followed this user" });
    } else {
      await self?.updateOne({ $push: { following: id } });
      await opp?.updateOne({ $push: { followers: userId } });
      res.status(200).json({ message: "success following user " });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (id === userId) {
    return res.status(403).json({ message: "Action forbidden" });
  }

  try {
    const self = await UserModel.findById(userId);
    const opp = await UserModel.findById(id);

    if (!opp?.followers.includes(userId) || !self?.following.includes(id)) {
      res
        .status(403)
        .json({ message: "You aren't already followed this user" });
    } else {
      await self?.updateOne({ $pull: { following: id } });
      await opp?.updateOne({ $pull: { followers: userId } });
      res.status(200).json({ message: "success unfollow user " });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

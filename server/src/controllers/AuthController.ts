import { Request, Response } from "express";
import UserModel from "./../models/UserModel.js";
import Bcrypt from "bcrypt";
import dot from "dotenv";
import JWT from "jsonwebtoken";

dot.config();
const { env }: any = process;

export const register = async (req: Request, res: Response) => {
  const { userName, password, firstName, lastName } = req.body;
  Bcrypt.hash(password, 10, async (err, hash) => {
    try {
      await UserModel.create({
        userName,
        password: hash,
        firstName,
        lastName,
      });
      res.status(200).json("register is successfully");
    } catch (error: any | unknown) {
      return res.status(400).json(error);
    }
  });
};

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  try {
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(404).json("user not found");
    }
    const { password: hashedPassword } = user;
    // checking password
    Bcrypt.compare(password, hashedPassword, (err: any, result: boolean) => {
      if (result) {
        const token = JWT.sign(
          {
            userId: user._id,
            isAdmin: user.isAdmin,
          },
          env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.cookie("_tbm", token, {
          httpOnly: true,
          path:"/",
          maxAge :  60 * 60 * 1000
        });
        res.status(200).send({userId: user._id, userName: user.userName, profile: user.profilePicture});
        
      } else {
        res.status(400).json("the password is invalid");
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error?.errors });
  }
};

export const authenticated = (req: Request, res: Response ) => {
  const token =req.cookies?._tbm 
  if(!token) return res.sendStatus(401);
  try{
    const decoded = JWT.verify(token,env.JWT_SECRET_KEY);
    
    res.sendStatus(200);
  }catch(err){
    res.clearCookie("_tbm");
    return res.sendStatus(401);
  }

}

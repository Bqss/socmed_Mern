import JWT, { JwtPayload } from "jsonwebtoken";
import {  RequestHandler } from "express";
import dot from "dotenv";

dot.config();

const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  const secret = process.env.JWT_SECRET_KEY ?? "";
  if (token && secret) {
    try {
      const decoded = JWT.verify(token, secret) as JwtPayload;
      console.log(decoded);
      req.body.userId = decoded?.userId;
      next();
    } catch (err) {
      res.status(401).json({ error:  "Unauthorized"});
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default authMiddleware;

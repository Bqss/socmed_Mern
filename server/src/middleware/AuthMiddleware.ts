import JWT, { JwtPayload } from "jsonwebtoken";
import { RequestHandler } from "express";
import dot from "dotenv";

dot.config();

const authMiddleware: RequestHandler = (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie?._tbm) return res.sendStatus(401);

  const secret = process.env.JWT_SECRET_KEY ?? "";

  try {
    const decoded = JWT.verify(cookie._tbm, secret) as JwtPayload;
    req.body.userId = decoded?.userId;
    next();
  } catch (err) {
    res.clearCookie('_tbm')
    res.sendStatus(403);
  }
};

export default authMiddleware;

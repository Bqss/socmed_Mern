import express from "express";
import { Socket } from "socket.io";
import http from "http";
import bodyParser from "body-parser";
import dot from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { AuthRoute } from "./routes/AuthRoute.js";
import { UserRoute } from "./routes/UserRoute.js";

dot.config();
const { env }: any = process;

const expressApp = express();
const server = http.createServer(expressApp);

expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json({}));
expressApp.use(cookieParser());
expressApp.use(cors({
  origin : "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus : 200
}))

expressApp.use("/auth", AuthRoute);
expressApp.use("/user",UserRoute);

mongoose.set("strictQuery", false);
mongoose
  .connect(env?.MONGO_DB_URL)
  .then(() => {
    server.listen(5000, () => {
      console.log("listening on port :  " + 5000);
    });
  })
  .catch((err) => console.log(err));

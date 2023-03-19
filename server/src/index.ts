import express from "express";
import { Socket } from "socket.io";
import fileUpload from "express-fileupload";
import http from "http";
import bodyParser from "body-parser";
import dot from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import { AuthRoute } from "./routes/AuthRoute.js";
import { UserRoute } from "./routes/UserRoute.js";
import { postRoute } from "./routes/PostRoute.js";
import authMiddleware from "./middleware/AuthMiddleware.js";
// import { mediaRoute } from "./routes/MediaRoute.js";

dot.config();
const { env }: any = process;

const expressApp = express();
const server = http.createServer(expressApp);

expressApp.use(bodyParser.urlencoded({ extended: true, limit: 500000 }));
expressApp.use(
  bodyParser.json({
    limit: 500000,
  })
);
expressApp.use(cookieParser());
expressApp.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir : "/tmp/",
    createParentPath : true,
    limits: {
      fileSize: 100 * 1024 * 1024,
    },
    safeFileNames : true,

  })
);
expressApp.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

expressApp.use("/auth", AuthRoute);
expressApp.use("/user", UserRoute);
expressApp.use("/post", authMiddleware, postRoute);
// expressApp.use("/media", mediaRoute)

mongoose.set("strictQuery", false);
mongoose
  .connect(env?.MONGO_DB_URL, {
    ssl: true,
    sslValidate: true,

  })
  .then(() => {
    server.listen(5000, () => {
      console.log("listening on port :  " + 5000);
    });
  })
  .catch((err) => console.log(err));

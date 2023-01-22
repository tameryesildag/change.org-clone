import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.js";
import petitionRouter from "./routes/petition.js";
import mongoose from "mongoose";
import checkAuth from "./middlewares/auth.js";
import cors from "cors";
import errorHandler from "./middlewares/error-handler.js";
import url from "url";
import path from "path";
import multer, { diskStorage } from "multer";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '../public/images');
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePrefix + "-" + file.originalname);
    }
})

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(multer({storage: storage}).single("image"));

app.use(checkAuth);

app.use(petitionRouter);

app.use(authRouter);

app.use("/", express.static(path.join(__dirname, "..", "public")));

app.use(errorHandler);

app.listen(8000);
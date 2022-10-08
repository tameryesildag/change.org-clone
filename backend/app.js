import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.js";
import petitionRouter from "./routes/petition.js";
import mongoose from "mongoose";
import checkAuth from "./middlewares/auth.js";
import cors from "cors";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(checkAuth);

app.use(petitionRouter);

app.use(authRouter);

app.listen(8000);
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/blog.route.js";

dotenv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:5175",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

app.use(express.json());
const router = express.Router();
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/blogs", postRouter);


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log( `database connected to ${process.env.MONGO_URL}`);
}).catch((err) => {
    console.log(err);
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
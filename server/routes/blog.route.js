import express from "express";
import { AddPost, EditPost, DeletePost, AllPosts, UserPosts } from "../controllers/blog.controller.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { upload } from "../utils/cloudinary.js";
import Blog from "../model/blog.model.js";


const router = express.Router();

router.get('/all-posts', AllPosts);
router.get('/user-posts', verifyToken, UserPosts);

router.post("/add-post", verifyToken, upload.single('image'), AddPost);
router.patch("/edit-post/:postId", verifyToken, upload.single('image'), EditPost);
router.delete("/delete-post/:postId", verifyToken, DeletePost);

export default router;
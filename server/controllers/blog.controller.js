import Blog from "../model/blog.model.js";
import User from "../model/user.model.js";
import { upload } from '../utils/cloudinary.js';

export const AddPost = async (req, res) => {
    const { title, description } = req.body;
    try {
        if (!title) {
            res.status(400).json({ success: false, message: 'ALL FIELDS ARE REQUIRED' })
        }

        if (!req.file) {
            res.status(400).json({ success: false, message: 'image is required' })
        }

        if (!req.userId) {
            res.status(401).json({ success: false, message: 'unauthorized' })
        }
        
        const userExists = await User.findById(req.userId);
        if (!userExists) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        const post = await Blog.create({
            title, 
            description, 
            image: req.file.path, 
            user: req.userId });

        res.status(201).json({ success: true, message: 'post created successfuly', post })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
} ;

// EDIT POST 
export const EditPost = async (req, res) => {
    const { postId } = req.params;
    const { title, description } = req.body;
    const userId = req.userId;
    const newImage = req.file;

    try {
        const post = await Blog.findById(postId);
        if (!post) {
            return res.status(404).json({ 
                success: false, 
                message: "Post not found" 
            });
        };

        if (post.user.toString() !== userId) {
            return res.status(401).json({ 
                success: false, 
                message: "You are not authorized to edit this post" 
            });
        }

        if (!req.file) {
            res.status(400).json({ success: false, message: 'image is required' })
        }

        if(title) post.title = title;
        if(description) post.description = description;
        if(newImage) post.image = newImage.path;
        await post.save();
        res.status(200).json({ success: true, message: 'post edited successfuly', post })
    } catch (error) {
     res.status(500).json({ success: false, message: error.message })
    }
};

// DELETE POST 
export const DeletePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId;
    try {
        const post = await Blog.findById(postId);
        if (!post) {
            return res.status(404).json({ 
                success: false, 
                message: "Post not found" 
            });
        };
        if (post.user.toString() !== userId) {
            return res.status(401).json({ 
                success: false, 
                message: "You are not authorized to delete this post" 
            });
        }
        await post.deleteOne();
        res.status(200).json({ success: true, message: 'post deleted successfuly' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

};

// GET ALL POSTS
export const AllPosts = async (req, res) => {
    try {
        const posts = await Blog.find({})
        .populate({
                path: 'user',
                select: 'name profileImage' // Only get these fields from User
            })
        .sort({ createdAt: -1 });
        res.status(200).json({ success: true, message: 'posts fetched successfuly', posts })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};

// GET SINGLE USER POSTS
export const UserPosts = async (req, res) => {
    const userId = req.userId;
    try {
        const posts = await Blog.find({ user: userId })
        .populate({
                path: 'user',
                select: 'name, profileImage' // Only get these fields from User
            })
        .sort({ createdAt: -1 });
        res.status(200).json({ success: true, message: 'posts fetched successfuly', posts })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};
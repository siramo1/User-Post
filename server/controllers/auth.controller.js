import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

// SIGN UP ENDPOINT
export const Signup = async (req, res) => {
    const { name, email, password, profileImage } = req.body;
    try {
        if (!name || !email || !password) {
            res.status(400).json({ success: false, message: 'ALL FIELDS ARE REQUIRED' })
        }
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        
        const user = await User.create({ 
            name, 
            email, 
            password: hashedPassword,
            profileImage: req.file ? req.file.path : profileImage,
            verificationToken,
            verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000
        });
        await user.save();

        generateTokenAndSetCookie(res,user._id);
        res.status(201).json({ 
            success: true, 
            message: 'user created successfuly', 
            user:{
                ...user._doc,
                password: undefined
            } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// VERIFY EMAIL ENDPOINT
export const VerifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpireAt: { $gt: Date.now()}
        });
        if (!user) {
            res.status(400).json({ success: false, message: 'user didn`t find' })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpireAt = undefined;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'your email is verified',
            user:{
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
       res.status(500).json({ success: false, message: error.message}) 
    }
};

// LOGIN ENDPOINT
export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'user didn’t find' });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'your password is wrong' });
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'you logged in successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


// LOGOUT ENDPOINT 
export const Logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: 'logout successful' })
};

// FORGET PASSWORD ENDPOINT
export const ForgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: 'user didn`t find' })
        }
        const resetPasswordToken = await crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpire = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();
        res.status(200).json({ success: true, message: 'forget email send succesfuly, check your email' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};

// RESET PASSWORD ENDPOINT
export const ResetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpire: { $gt: Date.now() } });
        if (!user) {
            res.status(400).json({ success: false, message: 'user didn`t find' })
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(200).json({ success: true, message: 'password reset successful' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//check Auth
export const CheckAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(400).json({ success: false, message: 'user not found' })
        }
        res.status(200).json({ success: true, message: 'user is authenticated', user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
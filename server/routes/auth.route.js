import express from "express";
import { CheckAuth, ForgetPassword, Login, Logout, ResetPassword, Signup, VerifyEmail } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post('/signup', upload.single('profileImage'), Signup);
router.post('/verify-email', VerifyEmail);
router.post('/login', Login);
router.post('/logout', Logout)

router.post('/forget-password', ForgetPassword);
router.post('/reset-password/:token', ResetPassword);

router.get('/check-auth', verifyToken, CheckAuth);


export default router;
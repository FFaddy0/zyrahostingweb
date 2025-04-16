import bcrypt from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendPasswordResetEmail, sendPasswordResetSuccessEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({success: false, message: "User already exists"});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const verifyToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verifyToken,
            verifyTokenExpiry: Date.now() + 6 * 60 * 60 * 1000,
        })

        await user.save();


        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verifyToken, user.name);

        res.status(201).json({success: true, message: "User created successfully", user: {
            ...user._doc,
            password: undefined,
        }});
        const verifyLink = `${process.env.FRONTEND_URL}/verify/${verifyToken}`;
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verifyToken: code,
            verifyTokenExpiry: {$gt: Date.now()}    
        });
        if (!user) {
            return res.status(400).json({success: false, message: "Invalid verification code"});
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();



        res.status(200).json({success: true, message: "Email verified successfully"});
        
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}   

export const requestResetPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }   

        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiry = Date.now() + 1/2 * 60 * 60 * 1000;
        await user.save();

        await sendPasswordResetEmail(user.email, resetToken, user.name);

        res.status(200).json({success: true, message: "Password reset email sent successfully"});
        
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}   

export const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiry: {$gt: Date.now()}
        });

        if (!user) {
            return res.status(400).json({success: false, message: "Invalid or expired reset token"});
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiry = undefined;
        await user.save();

        await sendPasswordResetSuccessEmail(user.email, user.name);

        res.status(200).json({success: true, message: "Password reset successfully"});  
        
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export const login = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const user = await User.findOne({$or: [{email}, {name}]});
        if (!user) {

            return res.status(400).json({success: false, message: "Invalid email or password"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);    
        if (!isPasswordCorrect) {
            return res.status(400).json({success: false, message: "Invalid email or password"});
        }

        generateTokenAndSetCookie(res, user._id);
        
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({success: true, message: "Logged in successfully", user: {
            ...user._doc,
            password: undefined,
        }});
    } catch (error) {
        console.log("Error in login:", error)
        res.status(400).json({success: false, message: error.message});
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"});
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }

        res.status(200).json({success: true, user});
    } catch (error) {
        console.log("Error in checkAuth:", error);
        res.status(400).json({success: false, message: error.message});
    }
}

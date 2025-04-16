import express from "express";

import { login, signup, verifyEmail, logout, resetPassword, requestResetPassword, checkAuth} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/reset-password", requestResetPassword);
router.post("/reset-password/:token", resetPassword);




export default router;

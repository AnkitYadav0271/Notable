
import { Router } from "express";
import { forgotPassword, login, logout, RegisterUser, verification } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";

const router = Router({ mergeParams: true });

router.post("/register", RegisterUser);
router.post("/verify", verification);
router.post("/login", login);
router.post("/logout",isAuthenticated, logout);
router.post("/forgot-password",forgotPassword);

export default router;

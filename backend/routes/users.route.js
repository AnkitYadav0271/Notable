import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getCurrentUser,
  login,
  logout,
  RegisterUser,
  verification,
  verifyOtp,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { userSchema, validateUser } from "../validator/user.validator.js";

const router = Router({ mergeParams: true });
router.get("/", isAuthenticated, getCurrentUser);
router.post("/register", validateUser(userSchema), RegisterUser);
router.post("/verify", verification);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp/:email", verifyOtp);
router.post("/change-password/:email", changePassword);

export default router;

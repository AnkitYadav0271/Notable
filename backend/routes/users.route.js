import express from "express";
import { Router } from "express";
import { RegisterUser, verification } from "../controllers/user.controller.js";

const router = Router({ mergeParams: true });

router.post("/register", RegisterUser);
router.post("/verify", verification);

export default router;

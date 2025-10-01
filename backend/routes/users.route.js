import express from "express";
import { Router } from "express";
import { RegisterUser } from "../controllers/user.controller.js";

const router = Router({ mergeParams: true });

router.post("/register", RegisterUser);

export default router;

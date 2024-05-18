import express from "express";
import { login, register,forgotPassword,setTheme,resetPasswort } from "../controllers/auth.controller.js";
const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setTheme/:id",setTheme);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:id/:token",resetPasswort)

export default router;
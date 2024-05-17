import express from "express";
import { login, register,setTheme } from "../controllers/auth.controller.js";
const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setTheme/:id",setTheme);

export default router;
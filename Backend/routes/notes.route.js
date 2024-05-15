import express from "express";
import { addNote,getNotes } from "../controllers/notes.controller.js";
const router=express.Router();

router.post("/add",addNote);
router.get("/get/:id",getNotes);
export default router;
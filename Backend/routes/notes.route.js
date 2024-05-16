import express from "express";
import { addNote,getNotes,getOneNote,editNote,deleteNote } from "../controllers/notes.controller.js";
const router=express.Router();

router.post("/add",addNote);
router.get("/get/:id",getNotes);  // id of user
router.get("/getOneNote/:id",getOneNote)  // id of note
router.put("/edit/:id",editNote)
router.delete("/edit/:id",deleteNote)
export default router;
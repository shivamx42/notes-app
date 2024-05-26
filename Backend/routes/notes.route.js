import express from "express";
import { addNote,getNotes,getOneNote,editNote,deleteNote } from "../controllers/notes.controller.js";
import { verifyUser } from "../utils/verifyToken.js";
const router=express.Router();

router.post("/add",verifyUser,addNote);
router.get("/get/:id",getNotes);  // id of user
router.get("/getOneNote/:id",getOneNote)  // id of note
router.put("/edit/:id",verifyUser,editNote)
router.delete("/edit/:id",verifyUser,deleteNote)
export default router;
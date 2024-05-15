import Notes from "../models/notes.model.js";

export const addNote=async (req,res)=>{

    try {
        const note= await Notes.create(req.body)
        return res.status(201).json({message: "Note Added successfully",note});        

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getNotes=async(req,res)=>{
    try {
        const notes=await Notes.find({userRef: req.params.id});
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
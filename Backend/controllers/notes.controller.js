import Notes from "../models/notes.model.js";

export const addNote=async (req,res)=>{
    
    try {
        const note= await Notes.create(req.body)
        return res.status(201).json({message: "Note Added successfully!",note});   

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}


const convert = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};


export const getNotes=async(req,res)=>{
    try {
        const { id } = req.params;
        const { searchTerm } = req.query;
        let query = { userRef: id };
        
        if (searchTerm) {
            const newSearchTerm = convert(searchTerm);
            query = {
                ...query,
                $or:[
                        {title:{$regex: newSearchTerm, $options: "i"}},
                        {content:{$regex: newSearchTerm, $options: "i"}}
                    ]
            };
        }
        
        const notes = await Notes.find(query);
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export const getOneNote=async(req,res)=>{
    if(req.params.id==="") return null;
    try {
        const note=await Notes.findOne({_id: req.params.id});

        return res.status(201).json({title: note.title, content: note.content})

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export const editNote=async(req,res)=>{
    try {
        const note=await Notes.findOne({_id: req.params.id});
    
        const {title,content}=req.body;
        note.title=title;
        note.content=content;

        await note.save();
        return res.status(201).json({message: "Note Updated successfully!"})

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export const deleteNote=async(req,res)=>{
    try{
        await Notes.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({message: "Note Deleted!"});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}
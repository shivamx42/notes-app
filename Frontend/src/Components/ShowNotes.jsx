import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ShowNotes({ notesUpdated, setNotesUpdated, setId, openEditNote }) {
    const [allNotes, setAllNotes] = useState([]);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await fetch(`api/notes/get/${currentUser._id}`);
                const data = await res.json(); 
                setAllNotes(data); 
                setNotesUpdated(false);
            } catch (error) {
                toast.error("Internal Server Error!")
            }
        };

        fetchNotes();
    }, [currentUser._id, notesUpdated, setNotesUpdated]); 
    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-2">
                {allNotes.map((note) => (
                    <div key={note._id} onClick={()=>{
                        setId(note._id)
                    }}> 
                        <Card title={note.title} content={note.content} />
                    </div>
                ))}
            </div>
        </>
    );
}

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner'


export default function ShowNotes({ notesUpdated, setNotesUpdated, setId,searchTerm }) {
    const [allNotes, setAllNotes] = useState([]);
    const [loading,setLoading]=useState(true);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
              
                var url=`/api/notes/get/${currentUser._id}`;
                if(searchTerm) url += `?searchTerm=${searchTerm}`;
                const res = await fetch(url);
                const data = await res.json(); 
                setLoading(false);
                setAllNotes(data); 
                setNotesUpdated(false);
            } catch (error) {
                toast.error("Internal Server Error!")
            }
        };

        fetchNotes();
    }, [currentUser._id, notesUpdated, setNotesUpdated,searchTerm]);

    if(loading){
        return( <div className="flex justify-center items-center mt-40"><Oval
                visible={true}
                height="70"
                width="70"
                color="#D21F3C"
                ariaLabel="oval-loading"
                secondaryColor="white"
                strokeWidth="5"
                /></div>  
        )
    }

    return (
        <>        
        {
            (allNotes.length === 0 ? searchTerm ? 
            (<div className="flex justify-center items-center mt-40">
                    <h1 className='text-3xl dark:text-[#fdf6e4]'>No Notes Found!</h1>
            </div>) : (
            
                <div className="flex justify-center items-center mt-32">
                    <h1 className='text-3xl dark:text-[#fdf6e4]'>Add Notes to Display Here!</h1>
                </div>
                ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                
                    { allNotes.map((note) => (
                        <div key={note._id} onClick={()=>{
                            setId(note._id)
                        }}> 
                            <Card title={note.title} content={note.content} />
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}

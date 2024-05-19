import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom';
import ShowNotes from './ShowNotes';
import EditNote from './EditNote';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbLogout2 } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";

export default function SearchNotes() {

    const location=useLocation();
    const {previousSearchTerm}=location.state || {};

    const {currentUser}=useSelector(state=>state.user);
    const [searchTerm,setSearchTerm]=useState(previousSearchTerm || "");
    
    const [notesUpdated,setNotesUpdated]=useState(false);
    const [noteId,setNoteId] = useState("");
    const [change,setChange]=useState(false);
    const [editNote,setEditNote] = useState(false);
    const [previousTitle,setPreviousTitle]=useState("");
    const [previousContent,setPreviousContent]=useState("");
    const handleAddNote = () => {
        setNotesUpdated(true);
    };


    function setId(id){
        setNoteId(id);
        setChange(prev=>!prev);
    }
    function openEditNote(){
        setEditNote(true);
    }
    const closeEditNote=()=>{
        setEditNote(false);
    }

    useEffect(() => {
        const fetchNote = async () => {
          if(noteId!=""){
            try {
                const res = await fetch(`api/notes/getOneNote/${noteId}`);
                if(res==null) return;
                const data = await res.json();
                setPreviousTitle(data.title);
                setPreviousContent(data.content);
                openEditNote();
    
                
            } catch (error) {
              toast.error("Internal Server Error!")
            }
            
          }
        };
    
        fetchNote();
    }, [change]); 

    const navigate=useNavigate();
    const handleClick=(e)=>{
        e.preventDefault();
        navigate("/");
    }

  return (
    <>
        <div className='min-h-screen '>
                <div className='flex flex-col items-center'>
                <div className='flex items-center gap-2'>
                <button>
                    <TbLogout2  size={25} className='duration-0 text-[#28231d]  dark:text-[#fdf6e4] dark:hover:text-white 'onClick={handleClick}/>
                </button>
                <form className='bg-slate-100 p-3 my-4 rounded-lg flex items-center border-[2px] border-[#28231d] dark:border-[#f3ead3] dark:border-2 dark:bg-slate-400' >
                <input
                    type='text'
                    placeholder='Search...'
                    className='bg-transparent focus:outline-none w-24 sm:w-64 dark:placeholder-black'
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                    
                <button disabled={true}>
                    <FaSearch size={15} className='duration-0 text-[#28231d] dark:text-black'/>
                </button>
                </form>
                </div>
                
            <div className='mt-7'>

            <ShowNotes 
            notesUpdated={notesUpdated}
            setNotesUpdated={setNotesUpdated}
            setId={setId}
            searchTerm={searchTerm}/>
            </div>


        </div>
            <EditNote 
            isOpen={editNote}
            onClose={closeEditNote}
            noteToEditId={noteId}
            previousTitle={previousTitle}
            previousContent={previousContent}
            onEditNote={handleAddNote}

            />
        </div>


    </>
  )
}

import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import AddNote from './AddNote';
import { useSelector } from 'react-redux';
import ShowNotes from './ShowNotes';
import EditNote from './EditNote';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";

export default function Home() {

  const {currentUser}=useSelector(state=>state.user);

  const [isAddNoteOpen,setIsAddNoteOpen]=useState(false);
  const [notesUpdated, setNotesUpdated] = useState(false);
  const [editNote,setEditNote] = useState(false);
  const [noteId,setNoteId] = useState("");
  const [previousTitle,setPreviousTitle]=useState("");
  const [previousContent,setPreviousContent]=useState("");
  const [change,setChange]=useState(false);
  const [searchTerm,setSearchTerm]=useState("");
  const dispatch=useDispatch();


  const openAddNote=()=>{
    setIsAddNoteOpen(true);
  }
  const closeAddNote=()=>{
    setIsAddNoteOpen(false);  
  }

  const handleAddNote = () => {
    setNotesUpdated(true);
  };
  
  function openEditNote(){
    setEditNote(true);
  }
  const closeEditNote=()=>{
    setEditNote(false);
  }

  function setId(id){
    setNoteId(id);
    setChange(prev=>!prev);
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

  const navigate = useNavigate();
  const toSearch=(e)=>{
    e.preventDefault();
    navigate("/search",{ state: { userId: currentUser._id, previousSearchTerm: searchTerm,} });
  }

  const handleLogout=async ()=>{
    localStorage.setItem("persist:root","");
    dispatch(signOutSuccess())
    toast.success("Logout Successful!");
    navigate("/login");
  }

  

  return (
    <>
      
      <div className="min-h-screen">



      <button
      onClick={handleLogout}
      className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-400 dark:hover:bg-slate-500 text-black font py-2 px-4 rounded-md focus:shadow-outline ml-2 mt-2 border border-black dark:border-white z-40 relative"
      >
        <TbLogout2 />
      </button>

          <div className='flex flex-col items-center -translate-y-7'>
            <form className='bg-slate-100 p-3 my-4 rounded-lg flex items-center border-[2px] border-[#28231d] dark:border-[#f3ead3] dark:bg-slate-400' >
                
              <input
                type='text'
                placeholder='Search...'
                className='bg-transparent focus:outline-none w-24 sm:w-64 dark:placeholder-black'
                onChange={(e)=>setSearchTerm(e.target.value)}
              />
                
              <button onClick={toSearch}>
                <FaSearch size={15} className='duration-0 text-[#28231d] dark:text-black'/>
              </button>
            </form>
            <div className='flex'>
              <h1 className='font-bold mr-4 mt-[5px] dark:text-white'>Add Notes</h1> <button className="bg-slate-600/70 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-700 rounded-md px-4 py-2" onClick={openAddNote}>
              <IoMdAdd size={20} className='duration-0 dark:text-white'/>
              </button>
            </div>

          <div className='mt-12'>

          <ShowNotes 
      
            notesUpdated={notesUpdated}
            setNotesUpdated={setNotesUpdated}
            setId={setId}
            openEditNote={openEditNote}
          />


          </div>

          </div>
            <AddNote
            
              isOpen={isAddNoteOpen}
              onClose={closeAddNote}
              onAddNote={handleAddNote}

            />
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

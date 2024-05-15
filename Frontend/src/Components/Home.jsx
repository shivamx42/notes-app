import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Card from './Card'
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import AddNote from './AddNote';
import { useSelector } from 'react-redux';
import ShowNotes from './ShowNotes';

export default function Home() {

  const {currentUser}=useSelector(state=>state.user);

  const [isAddNoteOpen,setIsAddNoteOpen]=useState(false);
  const [notesUpdated, setNotesUpdated] = useState(false);

  const openAddNote=()=>{
    setIsAddNoteOpen(true);
  }
  const closeAddNote=()=>{
    setIsAddNoteOpen(false);  
  }

  const handleAddNote = () => {
    setNotesUpdated(true);
  };

  return (
    <>
      <div className={"min-h-screen"}>
      <Navbar title={`${currentUser.name}'s Notes`}/>

          <div className='flex flex-col items-center'>
            <form className='bg-slate-100 p-3 my-4 rounded-lg flex items-center border-[1px] border-black dark:border-white dark:border-2 dark:bg-slate-400' >
                
              <input
                type='text'
                placeholder='Search...'
                className='bg-transparent focus:outline-none w-24 sm:w-64 dark:placeholder-white'

              />
              <button>
                <CiSearch size={25} className='duration-0 dark:text-white'/>
              </button>
            </form>
            <div className='flex'>
              <h1 className='font-bold mr-4 mt-[5px] dark:text-white '>Add Notes</h1> <button className="bg-slate-600/70 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-700 rounded-md px-4 py-2" onClick={openAddNote}>
              <IoMdAdd size={20} className='duration-0 dark:text-white'/>
              </button>
            </div>

          </div>

          <AddNote
          isOpen={isAddNoteOpen}
          onClose={closeAddNote}
          onAddNote={handleAddNote} 
        />

        <ShowNotes notesUpdated={notesUpdated} setNotesUpdated={setNotesUpdated} />
          
      </div>
        
    </>
  )
}

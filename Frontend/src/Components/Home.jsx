import React, { useState } from 'react'
import Navbar from './Navbar'
import Card from './Card'
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import AddNote from './AddNote';


export default function Home() {


  const [isAddNoteOpen,setIsAddNoteOpen]=useState(false);

  const openAddNote=()=>{
    setIsAddNoteOpen(true);
  }
  const closeAddNote=()=>{
    setIsAddNoteOpen(false);  
  }

  return (
    <>
      <div className={`min-h-screen ${isAddNoteOpen ? '' : ''}`}>
        <Navbar title={"My Notes"}/>

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
        />

          <Card title={"First"} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed doloribus mollitia laboriosam ratione ipsam fuga nobis corrupti ut. Obcaecati ad fugit, provident saepe quidem commodi tempora aperiam labore consequuntur. Facere consequatur autem, suscipit commodi sunt maxime deleniti blanditiis quam, accusamus, facilis cumque tenetur doloribus inventore ea molestias voluptates optio tempora explicabo aliquid minima eum vitae? Minus magni tenetur, doloremque, at debitis porro dolorem aliquid ipsam nobis laudantium nisi? Dolor earum soluta, praesentium quas id libero repudiandae dolore in fugit rem voluptate expedita nobis. Deserunt ratione nemo deleniti et error, accusantium, perferendis optio, labore harum reiciendis esse! Praesentium tempora aut libero!"}/>
          
      </div>
        
    </>
  )
}

import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteNote from './DeleteNote';
import useCheckUserVerification from "./UserVerification/useCheckUserVerification";


export default function EditNote({isOpen, onClose, noteToEditId, previousTitle, previousContent, onEditNote}) {

    if(!isOpen) return null;
    
    const [formData,setFormData]=useState({
        title: previousTitle,
        content: previousContent,
      })

    const [deletePromt,setDeletePromt]=useState(false);
    const checkUserVerification=useCheckUserVerification();

    const deleteDialogOpen=()=>{
        setDeletePromt(true);
    }
    
    const deleteDialogClose=()=>{
        setDeletePromt(false);
    }

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };
    
      const handleSubmit=async (e)=>{
        e.preventDefault();
    
        if(formData.title==""){
          toast.error("Note Must Have a Title!", {});
          return;
        }
    
        try {
          const res=await fetch(`/api/notes/edit/${noteToEditId}`,{
            method: "PUT",
            headers:{
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
          })
          if(checkUserVerification(res)) return;

          const data = await res.json(); 
          toast.success("Note Updated Successfully!", {});
          onClose();
          onEditNote();

    
        } catch (error) {
          toast.error("Internal Server Error!",{});
        }
      }


  return (
    <div className="fixed z-50 inset-0 overflow-y-auto backdrop-blur-md dark:backdrop-blur-lg">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-slate-300 dark:bg-white/20 w-[80vw] p-8 rounded-md shadow-xl md:w-[600px] mt-4 ">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              className="mt-1 p-2 block w-full rounded-md dark:bg-slate-300"
              value={formData.title}
              onChange={handleChange}
              style={{
               
                outline: "none",
                border: "none",
                ":focus": {
                  outline: "none",
                  border: "none",
                },
              }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Content
            </label>
            <textarea
              id="content"
              className="mt-1 p-2 block w-full rounded-md resize-none dark:bg-slate-300"
              rows="14"
              value={formData.content}
              onChange={handleChange}
              style={{
                outline: "none",
                border: "none",
                ":focus": {
                  outline: "none",
                  border: "none",
                },
              }}
            />
          </div>
          <div className="flex justify-between">
              {deletePromt && <DeleteNote onCancel={deleteDialogClose} noteToDelete={noteToEditId} onDeleteNote={onEditNote} onClose={onClose}/>}
                <button
                className="bg-red-500/80 hover:bg-red-500/100 text-white px-4 py-2 rounded-md mr-2"
                onClick={deleteDialogOpen}
                >
                    Delete
                </button>
                <div className="text-right">
                <button
                className="bg-slate-600/70 hover:bg-slate-600 dark:bg-slate-700 dark:hover:bg-slate-800 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                    onClose(); 
                }}
                >
                    Cancel
                </button>

                <button
                className="bg-slate-600/70 hover:bg-slate-600 dark:bg-slate-700 dark:hover:bg-slate-800 text-white px-4 py-2 rounded-md"
                onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNote = ({ isOpen, onClose, onAddNote  }) => {
  if (!isOpen) return null;          

  const {currentUser} = useSelector(state => state.user);
  
  const [formData,setFormData]=useState({
    title: "",
    content: "",
    userRef: currentUser._id
  })
  
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
      const res=await fetch("/api/notes/add",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json(); 
      toast.success("Note Added Successfully!", {});
      onClose();
      onAddNote();

    } catch (error) {
      console.log(error);
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
  );
};

export default AddNote;

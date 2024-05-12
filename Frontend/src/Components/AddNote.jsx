import React, { useState } from "react";


const AddNote = ({ isOpen, onClose }) => {
  if (!isOpen) return null;          

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white/20 w-[80vw] backdrop-blur-md p-8 rounded-md shadow-xl md:w-[600px] mt-4">
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
              className="mt-1 p-2 block w-full rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
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
              className="mt-1 p-2 block w-full rounded-md"
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
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

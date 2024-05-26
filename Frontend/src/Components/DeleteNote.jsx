import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCheckUserVerification from "./UserVerification/useCheckUserVerification";


export default function DeleteNote({ onCancel, noteToDelete, onDeleteNote, onClose }) {

    const checkUserVerification=useCheckUserVerification();

    const handleDelete=async()=> {
        try {
            console.log(noteToDelete)
            const res=await fetch(`/api/notes/edit/${noteToDelete}`,{
                method: "DELETE",
            });
            if(checkUserVerification(res)) return;

            toast.info("Note Deleted!",{});
            onCancel();
            onClose();
            onDeleteNote();
        } catch (error) {
            error("Internal Server Error!",{});
        }
    }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-xl font-bold mb-4">Delete Note</h2>
        <p className="mb-4">Are you sure you want to delete this note?</p>
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

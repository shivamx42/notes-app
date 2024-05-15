import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema(
    {
        title : {
          type: String,
        },
    
        content : {
          type: String,
        },

        userRef: {
            type: String,
        }
    
      },
      {
        timestamps: true,
      }
);

const Notes=mongoose.model('Notes',notesSchema);

export default Notes;


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email : {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    notes_list : {
      type : Array,
      required : false,
      default:[],
    }

  },
  {
    timestamps: true,
  }
);

const User=mongoose.model('User',userSchema);

export default User;


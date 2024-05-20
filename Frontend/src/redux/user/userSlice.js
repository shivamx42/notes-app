import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser: null
}

const userSlice= createSlice({
    name: "user",
    initialState,
    reducers:{
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload
        },
        signOutSuccess:(state,action)=>{
            state.currentUser=null;
        },
        updateCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    }
})

export const{signInSuccess,signOutSuccess,updateCurrentUser}=userSlice.actions;

export default userSlice.reducer
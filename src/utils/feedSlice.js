import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload
        },
        removeFeed:(state,action)=>{
            const newFeed=state.filter((req)=> req._id!==action.payload)
            return newFeed;
        },
        removeTotalFeed:(state,action)=>{
            return null
        }


    }
})

export const {addFeed,removeFeed,removeTotalFeed}=feedSlice.actions;
export default feedSlice.reducer;

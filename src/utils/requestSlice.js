import { createSlice } from "@reduxjs/toolkit";


const requestSlice=createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addConnectionRequests:(state,action)=>{
            return action.payload;
        },
        removeConnectionRequest:(state,action)=>{
           
             if(!state) return state;
            const newArray=state.filter((req)=> req._id!==action.payload)
            return newArray;
        },

    }
})
export const {addConnectionRequests,removeConnectionRequest} = requestSlice.actions;

export default requestSlice.reducer;
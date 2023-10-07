import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        token:localStorage.getItem("Token"),
        user:null
    },
    reducers:{
        setToken(state,action){
            state.token = action.payload;
        },
        clearToken(state,action){
            state.token = null;
        },
        setUserData(state,action){
            state.user = action.payload;
        },
        clearUserData(state,action){
            state.user = null;
        }
    }
})

export const { setToken, clearToken,setUserData,clearUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;
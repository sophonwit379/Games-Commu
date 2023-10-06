import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        token:localStorage.getItem("Token")
    },
    reducers:{
        setToken(state,action){
            state.token = action.payload;
        },
        clearToken(state,action){
            state.token = null;
        }
    }
})

export const { setToken, clearToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
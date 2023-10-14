import { createSlice } from "@reduxjs/toolkit";

const countImgSlice = createSlice({
    name:'countImg',
    initialState:{
        postImg:null,
        gameImg:null,
        commentImg:null,
    },
    reducers:{
        setPostImg(state,action){
            state.postImg = action.payload;
        },
        clearPostImg(state,action){
            state.postImg = null;
        },
        setGameImg(state,action){
            state.gameImg = action.payload;
        },
        clearGameImg(state,action){
            state.gameImg = null;
        },
        setCommentImg(state,action){
            state.commentImg = action.payload;
        },
        clearCommentImg(state,action){
            state.commentImg = null;
        },

    }
})

export const { clearCommentImg,clearGameImg,clearPostImg,setCommentImg,setGameImg,setPostImg } = countImgSlice.actions;
export const countImgReducer = countImgSlice.reducer;
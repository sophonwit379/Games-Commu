import { createSlice } from "@reduxjs/toolkit";

const countImgSlice = createSlice({
    name:'callImg',
    initialState:{
        postImg:[],
        gameImg:[],
        commentImg:[],
    },
    reducers:{
        setPostImg(state,action){
            state.postImg = action.payload;
        },
        setGameImg(state,action){
            state.gameImg = action.payload;
        },
        setCommentImg(state,action){
            state.commentImg = action.payload;
        },
    }
})

export const { setCommentImg,setGameImg,setPostImg } = countImgSlice.actions;
export const callImgReducer = countImgSlice.reducer;
export const selectPostImg = (state) => state.callImg.postImg;
export const selectGameImg = (state) => state.callImg.gameImg;
export const selectCommentImg = (state) => state.callImg.commentImg;
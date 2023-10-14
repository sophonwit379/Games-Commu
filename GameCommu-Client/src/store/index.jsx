import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authenticationApi } from "./apis/authenticationApi";
import { userApi } from "./apis/userApi";
import { selectGamesApi } from "./apis/selectGamesApi";
import { postApi } from "./apis/postApi";
import { gamesApi } from "./apis/gamesApi";
import { imageApi } from "./apis/imageApi";
import {
    countImgReducer,
    clearCommentImg,
    clearGameImg,
    clearPostImg,
    setCommentImg,
    setGameImg,
    setPostImg
} from './slices/countImgSlice';
import {
    authReducer,
    clearToken,
    setToken,
    setUserData,
    clearUserData
} from "./slices/authSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        countImg:countImgReducer,
        [userApi.reducerPath]: userApi.reducer,
        [authenticationApi.reducerPath]: authenticationApi.reducer,
        [gamesApi.reducerPath]: gamesApi.reducer,
        [selectGamesApi.reducerPath]: selectGamesApi.reducer,
        [imageApi.reducerPath]: imageApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(selectGamesApi.middleware)
            .concat(gamesApi.middleware)
            .concat(postApi.middleware)
            .concat(imageApi.middleware)
            .concat(authenticationApi.middleware);
    }
});

setupListeners(store.dispatch);

export {
    clearToken,
    setToken,
    setUserData,
    clearUserData
}

export {
    clearCommentImg,
    clearGameImg,
    clearPostImg,
    setCommentImg,
    setGameImg,
    setPostImg
}

export {
    useAddSelectGameMutation,
    useFetchGameOfUserQuery
} from './apis/selectGamesApi';

export {
    useLoginMutation
} from './apis/authenticationApi';

export {
    useAddUserMutation,
    useFetchUserQuery,
    useEditUserMutation
} from './apis/userApi';

export {
    useGetGamesQuery,
    useFetchNotSelectedGamesQuery
} from './apis/gamesApi'

export {
    useCountPostImgQuery,
    useFetchImgQuery,
    useCallPostImgQuery,
    useUploadPostImgMutation
} from './apis/imageApi'


export {
    useAddPostMutation,
    useEditPostMutation,
    useFetchAllFollowedGameQuery,
    useFetchFollowedGameQuery
} from './apis/postApi'
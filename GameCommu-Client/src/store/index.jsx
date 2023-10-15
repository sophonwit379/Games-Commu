import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authenticationApi } from "./apis/authenticationApi";
import { userApi } from "./apis/userApi";
import { selectGamesApi } from "./apis/selectGamesApi";
import { postApi } from "./apis/postApi";
import { gamesApi } from "./apis/gamesApi";
import { imageApi } from "./apis/imageApi";
import { postByGameApi } from './apis/postByGameApi';
import {
    callImgReducer,
    setCommentImg,
    setGameImg,
    selectCommentImg,
    selectGameImg,
    selectPostImg,
    setPostImg
} from './slices/callImgSlice';
import {
    authReducer,
    clearToken,
    setToken,
    setUserData,
    clearUserData
} from "./slices/authSlice";
import {
    selectCurrentPage,
    selectData,
    selectPreviousPage,
    setCurrentPage,
    setData,
    paginationReducer
} from './slices/paginationSlice';
import {reportApi} from "./apis/reportApi";
import { requestApi } from "./apis/requestApi";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        callImg:callImgReducer,
        pagination:paginationReducer,
        [userApi.reducerPath]: userApi.reducer,
        [authenticationApi.reducerPath]: authenticationApi.reducer,
        [gamesApi.reducerPath]: gamesApi.reducer,
        [selectGamesApi.reducerPath]: selectGamesApi.reducer,
        [imageApi.reducerPath]: imageApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        [reportApi.reducerPath]: reportApi.reducer,
        [postByGameApi.reducerPath]: postByGameApi.reducer,
        [requestApi.reducerPath]: requestApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(selectGamesApi.middleware)
            .concat(gamesApi.middleware)
            .concat(postApi.middleware)
            .concat(imageApi.middleware)
            .concat(authenticationApi.middleware)
            .concat(reportApi.middleware)
            .concat(postByGameApi.middleware)
            .concat(requestApi.middleware)
    }
});

setupListeners(store.dispatch);

export {
    clearToken,
    setToken,
    setUserData,
    clearUserData,
    setCommentImg,
    setGameImg,
    setPostImg,
    setCurrentPage,
    setData,
    selectCurrentPage,
    selectData,
    selectPreviousPage,
    selectCommentImg,
    selectPostImg,
    selectGameImg
}

export {
    useFetchFollowedGameQuery
} from './apis/postByGameApi'

export {
    useAddSelectGameMutation,
    useFetchGameOfUserQuery,
    useRemoveGameOfUserMutation
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
    useFetchNotSelectedGamesQuery,
    useFetchGameByIdQuery
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
    useFetchNotLoginQuery,
} from './apis/postApi'

export {
    useAddReportMutation,
    useFetchReportQuery
} from './apis/reportApi'

export{
    useAddRequestMutation,
    useFetchRequestQuery,
    useApproveRequestMutation,
    useRejectRequestMutation
}from './apis/requestApi'
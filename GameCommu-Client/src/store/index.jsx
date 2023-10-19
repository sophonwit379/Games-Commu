import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authenticationApi } from "./apis/authenticationApi";
import { userApi } from "./apis/userApi";
import { selectGamesApi } from "./apis/selectGamesApi";
import { postApi } from "./apis/postApi";
import { gamesApi } from "./apis/gamesApi";
import { imageApi } from "./apis/imageApi";
import { postByGameApi } from './apis/postByGameApi';
import { likeApi } from "./apis/likeApi";
import { commentApi } from "./apis/commentApi";
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
    removeData,
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
        [likeApi.reducerPath]: likeApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
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
            .concat(likeApi.middleware)
            .concat(commentApi.middleware)
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
    removeData,
    selectCurrentPage,
    selectData,
    selectPreviousPage,
    selectCommentImg,
    selectPostImg,
    selectGameImg
};

export {
    useAddLikeCommentMutation,
    useAddLikePostMutation,
    useFetchLikeCommentQuery,
    useFetchLikePostQuery,
    useRemoveLikeCommentMutation,
    useRemoveLikePostMutation
} from './apis/likeApi';

export {
    useFetchFollowedGameQuery
} from './apis/postByGameApi';

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
    useFetchGameByIdQuery,
    useAddGameMutation
} from './apis/gamesApi';

export {
    useCountPostImgQuery,
    useUploadCommentImgMutation,
    useCallPostImgQuery,
    useUploadPostImgMutation,
    useCountCommentImgQuery,
    useCountProfileImgQuery,
    useUploadProfileImgMutation,
    useEditProfileImgMutation,
    useCountGameImgQuery,
    useUploadGameImgMutation
} from './apis/imageApi';


export {
    useAddPostMutation,
    useEditPostMutation,
    useFetchAllFollowedGameQuery,
    useFetchNotLoginQuery,
    useRemovePostMutation,
    useFetchAllPostedQuery,
    useFetchAllCommentPostedQuery,
    useFetchByDetailQuery,
    useFetchPostByIdQuery
} from './apis/postApi';

export {
    useAddReportMutation,
    useFetchReportQuery
} from './apis/reportApi';

export{
    useAddRequestMutation,
    useFetchRequestQuery,
    useApproveRequestMutation,
    useRejectRequestMutation
} from './apis/requestApi';

export {
    useAddCommentMutation,
    useAddReplyMutation,
    useFetchCommentQuery,
    useFetchReplyQuery,
    useRemoveCommentMutation
} from './apis/commentApi';
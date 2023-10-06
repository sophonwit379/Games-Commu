import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { gameListApi } from "./apis/gameListApi";
import { authenticationApi } from "./apis/authenticationApi";
import { userApi } from "./apis/userApi";
import {
    authReducer,
    clearToken,
    setToken
} from "./slices/authSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        [gameListApi.reducerPath]: gameListApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [authenticationApi.reducerPath]: authenticationApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(gameListApi.middleware)
            .concat(userApi.middleware)
            .concat(authenticationApi.middleware);
    }
});

setupListeners(store.dispatch);

export {
    clearToken,
    setToken
}

export {
    useLoginMutation
} from './apis/authenticationApi';

export {
    useAddGameMutation,
    useFetchGameListQuery
 } from './apis/gameListApi';

export {
    useAddUserMutation,
    useFetchUserQuery
} from './apis/userApi';


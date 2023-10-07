import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authenticationApi } from "./apis/authenticationApi";
import { userApi } from "./apis/userApi";
import { selectGamesApi } from "./apis/selectGamesApi";
import { gamesApi } from "./apis/gamesApi";
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
        [userApi.reducerPath]: userApi.reducer,
        [authenticationApi.reducerPath]: authenticationApi.reducer,
        [gamesApi.reducerPath]: gamesApi.reducer,
        [selectGamesApi.reducerPath]: selectGamesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(selectGamesApi.middleware)
            .concat(gamesApi.middleware)
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
    useAddSelectGameMutation
} from './apis/selectGamesApi';

export {
    useLoginMutation
} from './apis/authenticationApi';

export {
    useAddUserMutation,
    useFetchUserQuery
} from './apis/userApi';

export {
    useGetGamesQuery
} from './apis/gamesApi'
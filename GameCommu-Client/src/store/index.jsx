import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { gameListApi } from "./api/GameListApi";
import { userApi } from "./api/UserApi";

export const store = configureStore({
    reducer:{
        [gameListApi.reducerPath]: gameListApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(gameListApi.middleware)
            .concat(userApi.middleware);
    }
});

setupListeners(store.dispatch);

export {
    useAddGameMutation,
    useFetchGameListQuery
 } from './api/GameListApi'

export {
    useAddUserMutation,
    useFetchUserQuery
} from './api/UserApi'
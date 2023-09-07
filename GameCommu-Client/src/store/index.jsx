import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { gameListApi } from "./api/GameListApi";

export const store = configureStore({
    reducer:{
        [gameListApi.reducerPath]: gameListApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(gameListApi.middleware);
    }
});

setupListeners(store.dispatch);

export {
    useAddGameMutation,
    useFetchGameListQuery
 } from './api/GameListApi'
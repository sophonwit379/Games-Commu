import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "./Utils/baseApi";
const gamesApi = createApi({
    reducerPath:'games',
    baseQuery:fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders:(headers, { getState }) => {
            const token = getState().auth.token;
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints(builder){
        return {
            getGames: builder.query({
                query:() => {
                    return {
                        url:'/games',
                        method:'GET',
                    }
                }
            })
        }
    }
})

export { gamesApi };
export const {
    useGetGamesQuery
} = gamesApi;
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const gamesApi = createApi({
    reducerPath:'games',
    baseQuery:fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        prepareHeaders:(headers, { getState }) => {
            const token = getState().auth.token;
            console.log(token);
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
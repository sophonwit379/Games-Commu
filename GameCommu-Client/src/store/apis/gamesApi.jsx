import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from '../../env/utils';

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const gamesApi = createApi({
    reducerPath:'games',
    baseQuery:fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders:(headers, { getState }) => {
            const token = getState().auth.token;
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
        fetchFn: async (...args) => {
            await pause(2000);
            return fetch(...args)
        }
    }),
    endpoints(builder){
        return {
            getGames: builder.query({
                providesTags:['all'],
                query:() => {
                    return {
                        url:'/games/all',
                        method:'GET',
                    }
                }
            }),
            fetchNotSelectedGames: builder.query({
                providesTags:['Followed'],
                query:()=>{
                    return {
                        url:'/games/notintag',
                        method:'GET',
                    }
                }
            }),
            fetchGameById: builder.query({
                providesTags:['gid'],
                query:(gid)=>{
                    return {
                        url:`/games/game/?gid=${gid}`,
                        method:'GET',
                    }
                }
            })
        }
    }
})

export { gamesApi };
export const {
    useGetGamesQuery,
    useFetchNotSelectedGamesQuery,
    useFetchGameByIdQuery
} = gamesApi;
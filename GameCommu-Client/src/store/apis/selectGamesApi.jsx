import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from '../../env/utils';

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const selectGamesApi = createApi({
    reducerPath:'selectGames',
    baseQuery:fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders:(headers, { getState }) => {
            const token = getState().auth.token;
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints(builder){
        return{
            addSelectGame: builder.mutation({
                invalidatesTags: ['selected'],
                query:(game)=> {
                    return{
                        url:'/gamesofuser/create',
                        method:'POST',
                        body: game,
                        responseHandler:'text'
                    }
                }
            }),
            fetchGameOfUser: builder.query({
                provideTags: ['selected'],
                query:()=>{
                    return {
                        url:'/gamesofuser',
                        method:'GET',
                    }
                }
            }),
            removeGameOfUser: builder.mutation({
                invalidatesTags: ['selected'],
                query:(game)=>{
                    return {
                        url:'/gamesofuser/delete',
                        method:'DELETE',
                        body:game
                    }
                }
            }),
            
        }
    }
});

export { selectGamesApi };
export const {
    useFetchGameOfUserQuery,
    useAddSelectGameMutation,
    useRemoveGameOfUserMutation
} = selectGamesApi;
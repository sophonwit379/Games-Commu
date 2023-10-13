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
            await pause(2000);
            return fetch(...args)
        }
    }),
    endpoints(builder){
        return{
            addSelectGame: builder.mutation({
                provideTags: ['Post'],
                invalidatesTags: ['Post'],
                query:(game)=> {
                    return{
                        url:'/gamesofuser/create',
                        method:'POST',
                        body: game
                    }
                }
            }),
            fetchGameOfUser: builder.query({
                provideTags: ['Post'],
                query:()=>{
                    return {
                        url:'/gamesofuser',
                        method:'GET',
                    }
                }
            }),
        }
    }
});

export { selectGamesApi };
export const {
    useFetchGameOfUserQuery,
    useAddSelectGameMutation
} = selectGamesApi;
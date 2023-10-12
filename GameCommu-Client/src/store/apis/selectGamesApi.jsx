import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from '../../env/utils';

const selectGamesApi = createApi({
    reducerPath:'selectGames',
    baseQuery:fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders:(headers, { getState }) => {
            const token = getState().auth.token;
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints(builder){
        return{
            addSelectGame: builder.mutation({
                query:(game)=> {
                    return{
                        url:'/gamesofuser/create',
                        method:'POST',
                        body: game
                    }
                }
            }),
            fetchGameOfUser: builder.query({
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
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const selectGamesApi = createApi({
    reducerPath:'selectGames',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:8080/api',
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
            })
        }
    }
});

export { selectGamesApi };
export const {
    useAddSelectGameMutation
} = selectGamesApi;
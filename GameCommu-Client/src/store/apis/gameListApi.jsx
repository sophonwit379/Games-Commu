import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { faker } from "@faker-js/faker";

const gameListApi = createApi({
    reducerPath:'gameList',
    baseQuery:fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),
    endpoints(builder){
        return {
            fetchGameList: builder.query({
                providesTags: (result) =>{
                    const tags = result.map(game => {
                        return game.id;
                    });
                    return tags
                },
                query: () => {
                    return{
                        method: 'GET',
                        url:'/games'
                    };
                }
            }),
            addGame: builder.mutation({
                invalidatesTags: (result) => {
                    return [result.id];
                },
                query: () => {
                    return{
                        method: 'POST',
                        url: '/games',
                        body: {
                            name: `${faker.person.firstName()} ${faker.animal.type()}`,
                            url: faker.image.urlLoremFlickr()
                        }
                    }
                }
            })
        };
    }

});

export { gameListApi };
export const {
    useFetchGameListQuery,
    useAddGameMutation
} = gameListApi;

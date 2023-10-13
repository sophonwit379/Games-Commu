import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from '../../env/utils';

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const postApi = createApi({
    reducerPath:'post',
    baseQuery:fetchBaseQuery({
        baseUrl:baseUrl,
        prepareHeaders: ( headers, { getState } )=>{
            headers.set('Authorization', `Bearer ${getState().auth.token}`);
            return headers;
        },
        fetchFn: async (...args) => {
            await pause(2000);
            return fetch(...args)
        }
    }),
    endpoints(builder){
        return{
            addPost: builder.mutation({
                provideTags: ['Post'],
                invalidatesTags: ['Post'],
                query:(postData) =>{
                    return {
                        url: '/posts/create',
                        method:'POST',
                        body:postData
                    }
                } 
            }),
            editPost: builder.mutation({
                provideTags: ['Post'],
                invalidatesTags: ['Post'],
                query:(postData) =>{
                    return {
                        url: '/posts/create',
                        method:'PUT',
                        body:postData
                    }
                } 
            }),
            fetchAllFollowedGame: builder.query({
                providesTags: ['Post'],
                query:(page) => {
                    return {
                        url:`/posts/user?page=${page}`,
                        method:'GET',
                    }
                }
            }),
            fetchFollowedGame: builder.query({
                providesTags: ['Post'],
                query:(postData) => {
                    console.log(parseInt(postData.gid),postData.page);
                    return {
                        url:`/posts/user?gid=${parseInt(postData.gid)}&page=${postData.page}`,
                        method:'GET',
                    }
                }
            })


        }
    }
});

export { postApi };
export const {
    useAddPostMutation,
    useEditPostMutation,
    useFetchAllFollowedGameQuery,
    useFetchFollowedGameQuery
} = postApi;
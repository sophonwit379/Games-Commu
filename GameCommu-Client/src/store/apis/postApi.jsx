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
        return{
            addPost: builder.mutation({
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
                    return {
                        url:`/posts/game?gid=${parseInt(postData.gid)}&page=${postData.page}`,
                        method:'GET',
                    }
                }
            }),
            fetchNotLogin: builder.query({
                providesTags: ['Post'],
                query:(page) => {
                    return {
                        url:`/posts/notlogin?page=${page}`,
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
    useFetchFollowedGameQuery,
    useFetchNotLoginQuery
} = postApi;
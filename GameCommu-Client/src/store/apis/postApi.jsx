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
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints(builder){
        return{
            addPost: builder.mutation({
                invalidatesTags: ['Post','Followed','Anonymous'],
                query:(postData) =>{
                    return {
                        url: '/posts/create',
                        method:'POST',
                        body:postData
                    }
                } 
            }),
            editPost: builder.mutation({
                invalidatesTags: ['Post','Followed','Anonymous'],
                query:(postData) =>{
                    return {
                        url: '/posts/update',
                        method:'PUT',
                        body:postData
                    }
                } 
            }),
            removePost: builder.mutation({
                invalidatesTags: ['Post','Followed','Anonymous'],
                query:(pid) =>{
                    return {
                        url: `/posts/delete?pid=${pid}`,
                        method:'DELETE',
                    }
                } 
            }),
            fetchAllFollowedGame: builder.query({
                providesTags: ['Post'],
                query:(page) => {
                    return {
                        url:`/posts/tag?page=${page}`,
                        method:'GET',
                    }
                },
                serializeQueryArgs: ({queryArgs,endpointName}) => {
                    return endpointName
                },
                merge: (currentCache, newItems) => {
                    currentCache.push(...newItems)
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg
                }, 
            }),
            fetchAllPosted: builder.query({
                providesTags: ['Posted'],
                query:(page) => {
                    return {
                        url:`/posts/user?page=${page}`,
                        method:'GET',
                    }
                },
                serializeQueryArgs: ({queryArgs,endpointName}) => {
                    return endpointName
                },
                merge: (currentCache, newItems) => {
                    currentCache.push(...newItems)
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg
                }, 
            }),
            fetchNotLogin: builder.query({
                providesTags: ['Anonymous'],
                query:(page) => {
                    return {
                        url:`/posts/notlogin?page=${page}`,
                        method:'GET',
                    }
                },
                serializeQueryArgs: ({endpointName}) => {
                    return endpointName
                },
                merge: (currentCache, newItems) => {
                    if(newItems.length > 0){
                        currentCache.push(...newItems)
                    }else{
                        return;
                    }
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg
                },
            }),
            fetchAllCommentPosted: builder.query({
                providesTags: ['UserPosted'],
                query:(page) => {
                    return {
                        url:`/posts/comment?page=${page}`,
                        method:'GET',
                    }
                },
                serializeQueryArgs: ({endpointName}) => {
                    return endpointName
                },
                merge: (currentCache, newItems) => {
                    if(newItems.length > 0){
                        currentCache.push(...newItems)
                    }else{
                        return;
                    }
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg
                },
            }),
            fetchByDetail: builder.query({
                providesTags: ['Detail'],
                query:(search) => {
                    return {
                        url:`/posts/search?search=${search.search}&page=${search.page}`,
                        method:'GET',
                    }
                },
                serializeQueryArgs: ({endpointName}) => {
                    return endpointName
                },
                merge: (currentCache, newItems) => {
                    if(newItems.length > 0){
                        currentCache.push(...newItems)
                    }else{
                        return;
                    }
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg
                },
            }),
            FetchPostById: builder.query({
                providesTags: ['FetchPost'],
                query:(post)=>{
                    return{
                        url:`/posts/post?pid=${post}`,
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
    useRemovePostMutation,
    useFetchNotLoginQuery,
    useFetchAllPostedQuery,
    useFetchAllCommentPostedQuery,
    useFetchByDetailQuery,
    useFetchPostByIdQuery
} = postApi;
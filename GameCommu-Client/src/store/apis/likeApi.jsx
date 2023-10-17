import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from '../../env/utils';


const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const likeApi = createApi({
    reducerPath: 'like',
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
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints(builder){
        return {
            addLikePost: builder.mutation({
                invalidatesTags:['Post'],
                query:(pid)=> {
                    return{
                        url:'/likes/likepost',
                        method:'POST',
                        body:pid
                    }
                }
            }),
            addLikeComment: builder.mutation({
                invalidatesTags:['Comment'],
                query: (cid) => {
                    return{
                        url:'/likes/likecomment',
                        method: 'POST',
                        body: cid,
                    }
                },
            }),
            fetchLikePost: builder.query({
                providesTags: ['Post'],
                query: (pid) =>{
                    return{
                        url:`/likes/count/post?pid=${pid}`,
                        method: 'GET',
                    }
                }
            }),
            fetchLikeComment: builder.query({
                providesTags:['Comment'],
                query: (cid) =>{
                    return{
                        url:`/likes/count/post?pid=${cid}`,
                        method: 'GET',
                    }
                }
            }),
            removeLikePost: builder.mutation({
                invalidatesTags:['Post'],
                query: (pid) =>{
                    return{
                        url:'/likes/unlikepost',
                        method: 'DELETE',
                        body: pid
                    }
                }
            }),
            removeLikeComment: builder.mutation({
                invalidatesTags:['Comment'],
                query: (cid) => {
                    return{
                        url:'/likes/unlikecomment',
                        method: 'DELETE',
                        body: cid,
                    }
                },
            }),
        }
    }
});

export { likeApi };
export const {
    useAddLikePostMutation,
    useAddLikeCommentMutation,
    useRemoveLikeCommentMutation,
    useRemoveLikePostMutation,
    useFetchLikeCommentQuery,
    useFetchLikePostQuery
} = likeApi;

import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../env/utils";

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const commentApi = createApi({
    reducerPath: 'comment',
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
            addComment: builder.mutation({
                invalidatesTags:['Comment'],
                query:(comment)=> {
                    return{
                        url:'/comments/create',
                        method:'POST',
                        body:comment
                    }
                }
            }),
            addReply: builder.mutation({
                invalidatesTags:['Reply'],
                query: (reply) => {
                    return{
                        url:'/comments/reply',
                        method: 'POST',
                        body: reply,
                    }
                },
            }),
            fetchComment: builder.query({
                providesTags:['Comment'],
                query: (data) => {
                    return{
                        url:`/comments/post?pid=${data.pid}&page=${data.page}`,
                        method: 'GET',
                    }
                },
            }),
            fetchReply: builder.query({
                providesTags:['Reply'],
                query: (data) => {
                    return{
                        url:`/comments/comment?rid=${data.rid}&page=${data.page}`,
                        method: 'GET',
                    }
                },
            }),
            removeComment: builder.mutation({
                invalidatesTags:['Comment'],
                query: (cid) => {
                    return{
                        url:`/comments/delete?cid=${cid}`,
                        method: 'DELETE',
                    }
                },
            }),
        }
    }
});

export { commentApi };
export const {
    useAddCommentMutation,
    useAddReplyMutation,
    useFetchCommentQuery,
    useFetchReplyQuery,
    useRemoveCommentMutation
} = commentApi;

import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../env/utils";

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
    }),
    endpoints(builder){
        return {
            addComment: builder.mutation({
                query:(comment)=> {
                    return{
                        url:'/comments/create',
                        method:'POST',
                        body:comment
                    }
                }
            }),
            addReply: builder.mutation({
                query: (reply) => {
                    return{
                        url:'/comments/reply',
                        method: 'POST',
                        body: reply,
                    }
                },
            }),
            fetchComment: builder.query({
                query: (data) => {
                    return{
                        url:`'/comments/post?pid=${data.pid}&page=${data.page}`,
                        method: 'GET',
                    }
                },
            }),
            fetchReply: builder.query({
                query: (data) => {
                    return{
                        url:`'/comments/post?pid=${data.rid}&page=${data.page}`,
                        method: 'GET',
                    }
                },
            }),
            removeComment: builder.mutation({
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

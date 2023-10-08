import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "./Utils/baseApi";

const postApi = createApi({
    reducerPath:'post',
    baseQuery:fetchBaseQuery({
        baseUrl:baseUrl,
        prepareHeaders: ( headers, { getState } )=>{
            headers.set('Authorization', `Bearer ${getState().auth.token}`);
            return headers;
        }
    }),
    endpoints(builder){
        return{
            addPost: builder.mutation({
                query:(postData) =>{
                    return {
                        url: '/posts/create',
                        method:'POST',
                        body:postData
                    }
                } 
            }),
            editPost: builder.mutation({
                query:(postData) =>{
                    return {
                        url: '/posts/create',
                        method:'PUT',
                        body:postData
                    }
                } 
            }),


        }
    }
});

export { postApi };
export const {
    useAddPostMutation,
    useEditPostMutation,
} = postApi;
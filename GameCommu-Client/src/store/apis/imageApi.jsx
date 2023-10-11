import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "./Utils/baseApi";

const imageApi = createApi({
    reducerPath:'img',
    baseQuery:fetchBaseQuery({
        baseUrl:baseUrl,
        prepareHeaders:( headers,{ getState })=>{
            headers.set('Authorization', `Bearer ${getState().auth.token}`);
            return headers;
        }
    }),
    endpoints(builder){
        return{
            uploadImg: builder.mutation({
                query: (images) =>{
                    return {
                        url:'/images/upload',
                        method:'POST',
                        body:images
                    }
                }
            })
        }
    }
});

export { imageApi };
export const {
    useUploadImgMutation
} = imageApi;
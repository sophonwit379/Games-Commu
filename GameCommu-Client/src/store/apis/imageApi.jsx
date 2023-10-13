import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from '../../env/utils';

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
            uploadPostImg: builder.mutation({
                query: (images) =>{
                    console.log(images);
                    const file = new FormData();
                    file.append('file', images.file)
                    return {
                        url:`/images/upload/?pid=${images.pid}`,
                        method:'POST',
                        body:file,
                    }
                },
                
            }),
            callPostImg: builder.query({
                query: (callData) =>{
                    console.log(callData);
                    return {
                        url:`/images/call?pid=${callData.pid}&page=${callData.page}`,
                        method:'GET',
                        responseHandler: 'content-type'
                    }
                },
            }),
            countPostImg: builder.query({
                query: (pid) =>{
                    return {
                        url:`/images/count?pid=${pid}`,
                        method:'GET',
                    }
                }
            }),
            fetchImg: builder.query({
                query: (images) =>{
                    return {
                        url:'/images',
                        method:'GET',
                    }
                }
            }),
        }
    }
});

export { imageApi };
export const {
    useUploadPostImgMutation,
    useCountPostImgQuery,
    useFetchImgQuery,
    useCallPostImgQuery
} = imageApi;
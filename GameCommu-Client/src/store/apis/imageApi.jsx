import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from '../../env/utils';

const imageApi = createApi({
    reducerPath:'img',
    baseQuery:fetchBaseQuery({
        baseUrl:baseUrl,
        prepareHeaders:( headers,{ getState })=>{
            const token = getState().auth.token;
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
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
                        responseHandler: ((response) => {
                            console.log(response.arrayBuffer());
                            const blob = new Blob([response.arrayBuffer()], { type: 'image/jpeg' });
                            const imageUrl = URL.createObjectURL(blob);
                            return imageUrl;
                        })
                    }
                },
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
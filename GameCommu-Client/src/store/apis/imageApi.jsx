import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from '../../env/utils';


const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

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
        },
        fetchFn: async (...args) => {
            await pause(500);
            return fetch(...args)
        }
    }),
    endpoints(builder){
        return{
            uploadPostImg: builder.mutation({
                query: (images) =>{
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
                query: (pid) => {
                    return {
                        url:`/images/count?pid=${pid}`,
                        method:'GET',
                    }
                }
            }),
            uploadCommentImg:builder.mutation({
                query: (image) => {
                    const file = new FormData();
                    file.append('file', image.file)
                    return {
                        url:`/images/upload/?cid=${image.cid}`,
                        method:'POST',
                        body:file,
                    }
                }
            })
        }
    }
});

export { imageApi };
export const {
    useUploadPostImgMutation,
    useCountPostImgQuery,
    useCallPostImgQuery,
    useUploadCommentImgMutation
} = imageApi;
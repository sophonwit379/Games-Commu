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
                providesTags:['PostImg'],
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
            }),
            countCommentImg: builder.query({
                providesTags:['CommentImg'],
                query: (cid) => {
                    return {
                        url:`/images/count?cid=${cid}`,
                        method:'GET',
                    }
                }
            }),
            uploadProfileImg:builder.mutation({
                query: (file) => {
                    const img = new FormData();
                    img.append('file', file)
                    return {
                        url:`/images/upload/`,
                        method:'POST',
                        body:img,
                    }
                }
            }),
            countProfileImg: builder.query({
                providesTags:['ProfileImg'],
                query: (uid) => {
                    return {
                        url:`/images/count?uid=${uid}`,
                        method:'GET',
                    }
                }
            }),
            editProfileImg:builder.mutation({
                query: (file) => {
                    const img = new FormData();
                    img.append('file', file)
                    return {
                        url:`/images/update`,
                        method:'PUT',
                        body:img,
                    }
                }
            }),
            countGameImg: builder.query({
                providesTags:['GameImg'],
                query: (gid) => {
                    return {
                        url:`/images/count?gid=${gid}`,
                        method:'GET',
                    }
                }
            }),
            uploadGameImg: builder.mutation({
              providesTags: ["uploadGameImg"],
              query: (images) => {
                  console.log(images.file);
                  const file = new FormData();
                  file.append(`file`, images.file);
                  return {
                    url: `/images/upload?gid=${images.gid}`,
                    method: "POST",
                    body: file,
                  };
                },
            }),
        }
    }
});

export { imageApi };
export const {
    useUploadPostImgMutation,
    useCountPostImgQuery,
    useCallPostImgQuery,
    useUploadCommentImgMutation,
    useCountCommentImgQuery,
    useCountProfileImgQuery,
    useUploadProfileImgMutation,
    useEditProfileImgMutation,
    useCountGameImgQuery,
    useUploadGameImgMutation,
} = imageApi;
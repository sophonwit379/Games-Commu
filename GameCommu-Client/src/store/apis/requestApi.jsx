import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../env/utils";


const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}


const requestApi = createApi({
    reducerPath: 'request',
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
            fetchRequest: builder.query({
                providesTags:'FetchRequest',
                query:()=> {
                    return{
                        url:'/requestedgames',
                        method:'GET',
                    }
                }
            }),
            addRequest: builder.mutation({
                query: (request) => {
                    return{
                        url:'/requestedgames/create',
                        method: 'POST',
                        body: request,
                    }
                },
            }),
            approveRequest: builder.mutation({
                query: (request) => {
                    return{
                        url:'/requestedgames/approve',
                        method: 'POST',
                        body: request,
                    }
                },
            }),
            rejectRequest: builder.mutation({
                query: (request) => {
                    return{
                        url:'/requestedgames/reject',
                        method: 'POST',
                        body: request,
                    }
                },
            }),
        }
    }
});

export { requestApi };
export const {
    useAddRequestMutation,
    useFetchRequestQuery,
    useApproveRequestMutation,
    useRejectRequestMutation,
} = requestApi;

import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../env/utils";

const reportApi = createApi({
    reducerPath: 'report',
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
            fetchReport: builder.query({
                providesTags:'FetchReport',
                query:()=> {
                    return{
                        url:'/reportedposts',
                        method:'GET',
                    }
                }
            }),
            addReport: builder.mutation({
                query: (report) => {
                    return{
                        url:'/reportedposts/report',
                        method: 'POST',
                        body: report,
                    }
                },
            }),
        }
    }
});

export { reportApi };
export const {
    useAddReportMutation,
    useFetchReportQuery,
} = reportApi;

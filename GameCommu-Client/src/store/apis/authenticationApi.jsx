import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const authenticationApi = createApi({
    reducerPath:'authenticationApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:8080/api/authtoken',
    }),
    endpoints(builder){
        return{
            login: builder.mutation({
                query: (user) => {
                    return {
                        method:'POST',
                        body:user,
                        responseHandler: 'content-type'
                    }
                }
            })
        }
    }
});

export { authenticationApi} ;
export const {
    useLoginMutation
} = authenticationApi;
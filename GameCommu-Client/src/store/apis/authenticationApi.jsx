import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from '../../env/utils';

const authenticationApi = createApi({
    reducerPath:'authenticationApi',
    baseQuery:fetchBaseQuery({
        baseUrl:baseUrl,
    }),
    endpoints(builder){
        return{
            login: builder.mutation({
                query: (user) => {
                    return {
                        url:'/authtoken',
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
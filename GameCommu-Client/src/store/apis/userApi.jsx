import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from '../../env/utils';

const userApi = createApi({
    reducerPath:'user',
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
            fetchUser: builder.query({
                providesTags:'FetchUser',
                query:()=> {
                    return{
                        url:'/user',
                        method:'GET',
                    }
                }
            }),
            addUser: builder.mutation({
                query: (user) => {
                    return{
                        url:'/users/create',
                        method: 'POST',
                        body: user,
                    }
                },
            }),
            editUser: builder.mutation({
                query: (user) => {
                    return{
                        url:'/users/update',
                        method: 'PUT',
                        body: user,
                    }
                },
            }),
        }
    }
});

export { userApi };
export const {
    useAddUserMutation,
    useFetchUserQuery,
    useEditUserMutation
} = userApi;

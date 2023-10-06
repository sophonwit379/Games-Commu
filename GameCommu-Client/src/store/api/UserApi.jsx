import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const userApi = createApi({
    reducerPath:'user',
    baseQuery:fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/users',
    }),
    endpoints(builder){
        return {
            fetchUser: builder.query({
                query:()=> {
                    return{
                        method:'GET',
                    }
                }
            }),
            addUser: builder.mutation({
                query: (user) => {
                    return{
                        url:'/create',
                        method: 'POST',
                        body: user
                    }
                }
            }),
        }
    }
});

export { userApi };
export const {
    useAddUserMutation,
    useFetchUserQuery
} = userApi;

// "email": `"${user.email}"`,
// "password": `"${user.password}"`,
// "username": `"${user.username}"`,
// "name": `"${user.name}"`,
// "surname": `"${user.surname}"`
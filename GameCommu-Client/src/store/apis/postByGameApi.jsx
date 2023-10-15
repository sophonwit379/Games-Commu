import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from '../../env/utils';

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const postByGameApi = createApi({
    reducerPath:'postByGame',
    baseQuery:fetchBaseQuery({
        baseUrl:baseUrl,
        prepareHeaders: ( headers, { getState } )=>{
            const token = getState().auth.token;
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
        fetchFn: async (...args) => {
            await pause(2000);
            return fetch(...args)
        }
    }),
    endpoints(builder){
        return{
            fetchFollowedGame: builder.query({
                providesTags:['Followed'],
                query:(postData) => {
                    return {
                        url:`/posts/game?gid=${parseInt(postData.gid)}&page=${postData.page}`,
                        method:'GET',
                    }
                },
                serializeQueryArgs: ({queryArgs,endpointName}) => {
                    return endpointName;
                },
                merge: (currentCache, newItems, _meta) => {
                    const gid = parseInt(_meta.arg.gid);
                    if(newItems.length > 0 && _meta.arg.page > 0 && newItems[0].gid === gid){
                        currentCache.push(...newItems)
                    }else if(_meta.arg.page === 0 && newItems.length === 0){
                        return newItems;
                    }else{
                        return [];
                    }
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg!==previousArg;
                }, 
            }),
        }
    }
});

export { postByGameApi };
export const {
    useFetchFollowedGameQuery,
} = postByGameApi;
import { apiSlice } from "../../app/api/apiSlice";
import { Post } from "../../interface/posts-type";

export interface GetUserPostsResponse {
    yourAllPost: Post[]; 
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET',
            }),
        }),
        // getUserData: builder.query({
        //     query: () => ({
        //         url: '/user/user-data',
        //         method: 'POST',
        //     }),
        // }),
        getUserPosts: builder.query<GetUserPostsResponse, string | null>({
            query: (userId: string | null) => ({
                url: `/post/your-post/${userId}`,
                method: 'GET',
            }),
        }),
        // getPosts: builder.query<GetPostsResponse, void>({
        //     query: () => ({
        //         url: `/post/get-posts`,
        //         method: 'GET',
        //     }),
        // }),
    }),
});

export const { 
    useLoginMutation, 
    useLogoutMutation, 
    // useGetUserDataQuery, 
    useGetUserPostsQuery, 
    // useGetPostsQuery 
} = authApiSlice; 

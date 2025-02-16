import { apiSlice } from "../../app/api/apiSlice";
import { store } from "../../app/store";
import { Post } from "../../interface/posts-type";
import { setCredentials } from "./authSlice";

export interface GetUserPostsResponse {
    yourAllPost: Post[]; 
}

export interface RefreshResponse {
    accessToken: string;
    id: string;
    email: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['UserInfo', 'UserPosts', 'TimelinePosts', 'UserBday', 'SavedPost', 'Followers', 'Following'],
        }),
        signUp: builder.mutation({
            query: (formData) => ({
                url: '/signup',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['UserInfo'],
        }),
        logoutUser: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            invalidatesTags: ['UserInfo', 'UserPosts', 'TimelinePosts', 'UserBday', 'SavedPost', 'Followers', 'Following'],
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
        refreshToken: builder.query<RefreshResponse, void>({
            query: () => ({
                url: '/refresh',
                method: 'GET',
            }),
            transformResponse: (response: { accessToken: string; id: string; email: string }) => {
                console.log("Refresh token response: ", response)
                store.dispatch(setCredentials(response));
                return response; 
            },
        }),
    }),
});

export const { 
    useLoginMutation, 
    useLogoutUserMutation, 
    // useGetUserDataQuery, 
    useGetUserPostsQuery, 
    // useGetPostsQuery,
    useRefreshTokenQuery,
    useSignUpMutation,
} = authApiSlice; 

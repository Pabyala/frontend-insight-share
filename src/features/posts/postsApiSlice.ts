import { apiSlice } from '../../app/api/apiSlice';
import { PostsOfUser, Post } from '../../interface/types'; // Ensure correct import for PostsOfUser

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserPosts: builder.query<Post[], string>({
            query: (userId) => `/post/your-post/${userId}`, // Update endpoint as needed
            transformResponse: (response: PostsOfUser) => response.allPosts, // Update based on the response structure
        }),
    }),
});

export const { useGetUserPostsQuery } = usersApiSlice;
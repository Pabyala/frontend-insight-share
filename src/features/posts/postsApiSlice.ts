import { apiSlice } from '../../app/api/apiSlice';
import { GetAllPostsByUserResponse, SavedPosts } from '../../interface/posts-type';
import { AddPost, Post, TimelinePosts } from '../../interface/your-posts';

// add post
interface RequiredPost {
    captionPost: string;
    authorId: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // getUserPosts: builder.query<Post[], string>({
        //     query: (userId) => `/post/your-post/${userId}`, // Update endpoint as needed
        //     transformResponse: (response: PostsOfUser) => response.allPosts, // Update based on the response structure
        // }),
        // getUserAllPosts: builder.query<Post[], string>({
        //     query: () => '/post/your-post', // Update endpoint as needed
        //     transformResponse: (response: GetAllPostsByUserResponse) => response.yourAllPost,
        // }),
        getUserAllPosts: builder.query<TimelinePosts, void>({
            query: () => '/post/your-post', 
            transformResponse: (response: TimelinePosts) => {
                console.log("API Response your all posts:", response);
                return response}
            ,
            providesTags: ['UserPosts'],
        }),
        getPostsForTimeline: builder.query<TimelinePosts, void>({
            query: () => '/post/get-posts', 
            transformResponse: (response: TimelinePosts) => {
                console.log("API Response your timeline posts:", response);
                return response
            },
            providesTags: ['TimelinePosts'],
        }),
        addPost: builder.mutation<AddPost, RequiredPost>({
            query: (newPost) => ({
                url: '/post/add-post', 
                method: 'POST',
                body: newPost, 
            }),
            invalidatesTags: ['UserPosts', 'TimelinePosts'],
        }),
        updatePost: builder.mutation({
            query: ({ postId, updatedPost }) => ({
                url: `/post/update/${postId}`,
                method: 'PUT',
                body: updatedPost, 
            }),
            invalidatesTags: ['UserPosts', 'TimelinePosts'],
        }),
        deletePost: builder.mutation({
            query: (postId) => ({
                url: `/post/delete/${postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UserPosts', 'TimelinePosts'],
        }),
        getSavedPost: builder.query<SavedPosts, void>({
            query: () => '/post/get-saved-posts', 
            transformResponse: (response: SavedPosts) => {
                console.log("API Response your timeline posts:", response);
                return response
            },
            providesTags: ['SavedPost'],
        }),
        savedPost: builder.mutation({
            query: (postId) => ({
                url: `/post/save-post/${postId}`,
                method: 'POST',
            }),
            invalidatesTags: ['SavedPost'],
        }),
        unsavedPost: builder.mutation({
            query: (postId) => ({
                url: `/post/unsaved-post/${postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SavedPost'],
        }),
    }),
});

export const { 
    // useGetUserPostsQuery,
    // useLazyGetUserAllPostsQuery,
    useGetPostsForTimelineQuery,
    useGetUserAllPostsQuery,
    useAddPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useSavedPostMutation,
    useUnsavedPostMutation,
    useGetSavedPostQuery,
} = usersApiSlice;
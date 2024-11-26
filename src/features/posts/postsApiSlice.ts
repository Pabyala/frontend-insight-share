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
        getUserAllPosts: builder.query<TimelinePosts, string | void>({
            // query: () => '/post/my-post', 
            query: (userId) => {
                // If userId is not provided, use the current logged-in user's posts
                const url = userId ? `/post/all-posts/${userId}` : '/post/all-posts';
                return url;
            },
            transformResponse: (response: TimelinePosts) => {
                console.log("API Response your all posts:", response);
                return response}
            ,
            providesTags: ['UserPosts'],
        }),
        getPostsForTimeline: builder.query<TimelinePosts, void>({
            query: () => '/post/timeline', 
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
        getSavedPost: builder.query<TimelinePosts, void>({
            query: () => '/post/saved', 
            transformResponse: (response: TimelinePosts) => {
                console.log("API Response your timeline posts:", response);
                return response
            },
            providesTags: ['SavedPost'],
        }),
        savedPost: builder.mutation({
            query: (postId) => ({
                url: `/post/${postId}/save`,
                method: 'POST',
            }),
            invalidatesTags: ['SavedPost', 'UserPosts', 'TimelinePosts'],
        }),
        unsavedPost: builder.mutation({
            query: (postId) => ({
                url: `/post/${postId}/unsave`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SavedPost', 'UserPosts', 'TimelinePosts'],
        }),
        reactPost: builder.mutation({
            query: ({ postId, userId, reactionType }) => ({
                url: `/post/${postId}/reaction`,
                method: 'POST',
                body: { userId, reactionType },
            }),
            invalidatesTags: ['SavedPost', 'UserPosts', 'TimelinePosts'],
        }),
        // getReactionOfPost: builder.query({
        //     query: (postId: string) => ({
        //         url: `/post/${postId}/reactions`,
        //         method: 'GET'
        //     })
        // }),
        getPostById: builder.query<Post, string>({
            query: (postId) => `/post/my-post/${postId}`, 
            transformResponse: (response: Post) => {
                console.log("API Response your timeline posts:", response);
                return response;
            },
        }),
        addCommentToPost: builder.mutation({
            query: ({ postId, commenterId, comment }) => ({
                // url: `/post/${postId}/comment`,
                url: `/comment/${postId}`,
                method: 'POST',
                body: { commenterId, comment },
            }),
            invalidatesTags: ['SavedPost', 'UserPosts', 'TimelinePosts'],
        }),
        updateCommentToPost: builder.mutation({
            query: ({commentId, updatedComment, userId}) => ({
                url: `/comment/update/${commentId}`,
                method: 'PUT',
                body: { updatedComment, userId }
            }),
            invalidatesTags: ['SavedPost', 'UserPosts', 'TimelinePosts'],
        }),
        deleteCommentToPost: builder.mutation({
            query: ({ commentId, userId }) => ({
                url: `/comment/delete/${commentId}`,
                method: 'DELETE',
                body: { userId }
            }),
            invalidatesTags: ['SavedPost', 'UserPosts', 'TimelinePosts'],
        }),
        // reply to the comment APISlice
        addReplyToComment: builder.mutation({
            query: ({ commentId, userId, reply }) => ({
                url: `/comment/${commentId}/reply`,
                method: 'POST',
                body: { userId, reply },
            }),
            invalidatesTags: ['SavedPost', 'UserPosts', 'TimelinePosts'],
        }),
        updateAddReplyToComment: builder.mutation({
            query: ({commentId, replyId,  newReplyComment, userId}) => ({
                url: `/comment/update-reply/${commentId}/${replyId}`,
                method: 'PUT',
                body: { newReplyComment, userId }
            }),
            invalidatesTags: ['SavedPost', 'UserPosts', 'TimelinePosts'],
        }),
        deleteAddReplyToComment: builder.mutation({
            query: ({ commentId, replyId, userId }) => ({
                url: `/comment/delete-reply/${commentId}/${replyId}`,
                method: 'DELETE',
                body: { userId }
            }),
            invalidatesTags: ['SavedPost', 'UserPosts', 'TimelinePosts'],
        }),
    }),
});

export const { 
    // useGetUserPostsQuery,
    // useLazyGetUserAllPostsQuery,
    useGetUserAllPostsQuery,
    useGetPostsForTimelineQuery,
    useAddPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useSavedPostMutation,
    useUnsavedPostMutation,
    useGetSavedPostQuery,
    useReactPostMutation,
    // useGetReactionOfPostQuery,
    useGetPostByIdQuery,
    useAddCommentToPostMutation,
    useDeleteCommentToPostMutation,
    useUpdateCommentToPostMutation,

    useAddReplyToCommentMutation,
} = usersApiSlice;
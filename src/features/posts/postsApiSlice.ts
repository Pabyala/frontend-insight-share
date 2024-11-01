import { apiSlice } from '../../app/api/apiSlice';
import { GetAllPostsByUserResponse } from '../../interface/posts-type';
import { AddPost, TimelinePosts } from '../../interface/your-posts';

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
    }),
});

export const { 
    // useGetUserPostsQuery,
    // useLazyGetUserAllPostsQuery,
    useGetPostsForTimelineQuery,
    useGetUserAllPostsQuery,
    useAddPostMutation,
} = usersApiSlice;
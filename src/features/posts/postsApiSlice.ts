import { apiSlice } from '../../app/api/apiSlice';
import { GetAllPostsByUserResponse } from '../../interface/posts-type';
import { AddPost, TimelinePosts } from '../../interface/your-posts';
// import { PostsOfUser, Post } from '../../interface/types'; // Ensure correct import for PostsOfUser


interface Reactions {
    like: string[];  // Assuming it's an array of user IDs or similar identifiers
    heart: string[];
    wow: string[];
    angry: string[];
  }
  
  interface Author {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  }
  
  interface Post {
    _id: string;
    reactions: Reactions;
    authorId: Author;
    captionPost: string;
    comments: any[];  // Replace `any` if comments have a known structure
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface GetPostsByUserResponse {
    yourAllPost: Post[];
  }

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
        getUserAllPosts: builder.query<Post[], void>({
            query: () => '/post/your-post', 
            transformResponse: (response: GetPostsByUserResponse) => response.yourAllPost,
            providesTags: ['UserPosts'],
        }),
        getPostsForTimeline: builder.query<TimelinePosts, void>({
            query: () => '/post/get-posts', 
            transformResponse: (response: TimelinePosts) => response,
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
import { apiSlice } from "../../app/api/apiSlice";
import { FollowedUser, YourFollowers, YourFollowing } from "../../interface/followers-type";

export const followersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFollowers: builder.query<YourFollowers, void>({
            query: () => '/user/followers',
            transformResponse: (response: YourFollowers) => response,
            providesTags: ['Followers'],
        }),
        getFollowing: builder.query<YourFollowing, void>({
            query: () => '/user/following',
            transformResponse: (response: YourFollowing) => response,
            providesTags: ['Following'],
        }),
        followUser: builder.mutation<FollowedUser, string>({
            query: (userIdToFollow: string) => ({
                url: `user/${userIdToFollow}/follow`, 
                method: 'POST',
            }),
            invalidatesTags: ['Following'],
        }),
    }),
});
export const { 
    useGetFollowersQuery,
    useGetFollowingQuery,
    useFollowUserMutation,
} = followersApiSlice; 
import { apiSlice } from "../../app/api/apiSlice";
import { FollowedUser, MyFollowers, YourFollowing } from "../../interface/followers-type";

export const followersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFollowers: builder.query<MyFollowers, string | void>({
            query: ( userId ) => {
                return userId ? `/user/my-followers/${userId}/followers` : '/user/my-followers/followers';
            },
            transformResponse: (response: MyFollowers) => response,
            providesTags: ['Followers'],
        }),
        getFollowing: builder.query<YourFollowing, string | void>({
            query: ( userId ) => {
                return userId ? `/user/my-following/${userId}/following` : '/user/my-following/following';
            },
            transformResponse: (response: YourFollowing) => response,
            providesTags: ['Following'],
        }),
        followUser: builder.mutation<FollowedUser, string>({
            query: (userIdToFollow: string) => ({
                url: `user/${userIdToFollow}/follow`, 
                method: 'POST',
            }),
            invalidatesTags: ['Following', 'Followers'],
        }),
        unfollowUser: builder.mutation<FollowedUser, string>({
            query: (userIdToUnFollow: string) => ({
                url: `user/${userIdToUnFollow}/un-follow`, 
                method: 'POST',
            }),
            invalidatesTags: ['Following', 'Followers'],
        }),
    }),
});
export const {
    useGetFollowersQuery,
    useGetFollowingQuery,
    useFollowUserMutation,
    useUnfollowUserMutation,
} = followersApiSlice;
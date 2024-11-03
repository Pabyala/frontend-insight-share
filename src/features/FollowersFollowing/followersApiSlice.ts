import { apiSlice } from "../../app/api/apiSlice";
import { FollowedUser, MyFollowers, YourFollowers, YourFollowing } from "../../interface/followers-type";

export const followersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFollowers: builder.query<MyFollowers, void>({
            query: () => '/user/followers',
            transformResponse: (response: MyFollowers) => response,
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
            invalidatesTags: ['Following', 'Followers'],
        }),
    }),
});
export const { 
    useGetFollowersQuery,
    useGetFollowingQuery,
    useFollowUserMutation,
} = followersApiSlice; 
import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { AllUsersResponse, User } from "../../interface/types";
import { Followers, UserDetails, UserInfo } from "../../interface/user";
import { FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '/user/all-users',
            transformResponse: (response: AllUsersResponse) => response.allUsers,
        }),
        getUser: builder.query<UserInfo, void>({
            query: () => '/user/data',
            transformResponse: (response: { userInfo: UserInfo }) => response.userInfo,
            providesTags: ['UserInfo'],
        }),
        getUserById: builder.query<UserInfo, string>({
            query: (userId) => `/user/${userId}`,
            transformResponse: (response: { userInfo: UserInfo }) => response.userInfo,
            // providesTags: (result, error, userId) => [{ type: 'UserInfoById', id: userId }],
            providesTags: ['UserInfoById'],
        }),
        getUserFollowers: builder.query<Followers, void>({
            query: () => '/user/followers',
            transformResponse: (response: Followers ) => response,
        }),
        updateUserDetails: builder.mutation<UserDetails, Partial<UserDetails>>({
            query: (userDetails) => ({
                url: '/user/profile/details',
                method: 'PUT',
                body: userDetails,
            }),
            invalidatesTags: ['UserInfo'],
        }),
        updateUserProfilePicture: builder.mutation<UserInfo, FormData>({
            query: (formData) => ({
                url: '/uploadImage', 
                method: 'POST',
                body: formData, 
            }),
            invalidatesTags: ['UserInfo'],
        }),
        uploadProfilePhoto: builder.mutation({
            query: (formData) => ({
                url: '/user/update/profile-photo',
                method: 'POST',
                body: formData,
            }),
        }),
        uploadBgPhoto: builder.mutation({
            query: (formData) => ({
                url: '/user/update/bg-photo',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});
export const { 
    useGetUsersQuery, 
    useGetUserQuery, 
    useGetUserByIdQuery,
    // useGetUserFollowersQuery,
    useUpdateUserDetailsMutation,
    useUpdateUserProfilePictureMutation,  
    useUploadProfilePhotoMutation,  
    useUploadBgPhotoMutation,
} = usersApiSlice; 

// // creates memoized selector
// const selectUsersData = createSelector(
//     selectUsersResult,
//     usersResult = usersResult.data // normalized stat object with ids and entities
// )

// export const {
//     selectAll: selectAll
// }
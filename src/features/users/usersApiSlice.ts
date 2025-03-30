import { apiSlice } from "../../app/api/apiSlice";
import { AllUsersResponse, User } from "../../interface/types";
import { Followers, UserDetails, UserInfo } from "../../interface/user";

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
            invalidatesTags: ['UserInfo', 'TimelinePosts', 'Notification', 'SavedPost', 'Followers', 'Following',],
        }),
        uploadProfilePhoto: builder.mutation({
            query: (formData) => ({
                url: '/user/update/profile-photo',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['UserInfo', 'TimelinePosts', 'Notification', 'SavedPost', 'Followers', 'Following',],
        }),
        uploadBgPhoto: builder.mutation({
            query: (formData) => ({
                url: '/user/update/bg-photo',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['UserInfo', 'TimelinePosts', 'Notification', 'SavedPost', 'Followers', 'Following',],
        }),
        updateUserPersonalDetailsSettings: builder.mutation<UserDetails, Partial<UserDetails>>({
            query: (userDetails) => ({
                url: '/user/profile/settings/personal-details',
                method: 'PUT',
                body: userDetails,
            }),
            invalidatesTags: ['UserInfo'],
        }),
        updateUsernameAndName: builder.mutation({
            query: (userDetails) => ({
                url: '/user/profile/settings/profile-details',
                method: 'PUT',
                body: userDetails,
            }),
            invalidatesTags: ['UserInfo'],
        }),
        searchUser: builder.query({
            query: (searchTerm) => ({
                url: `/user/search/user?query=${searchTerm}`,
                method: "GET",
            }),
        }),
        getSuggestedForYou: builder.query({
            query: (userId) => ({
                url: `/user//suggested/${userId}`,
                method: "GET",
            }),
        }),
    }),
});
export const { 
    useGetUsersQuery, 
    useGetUserQuery, 
    useGetUserByIdQuery,
    useUpdateUserDetailsMutation,
    useUpdateUserProfilePictureMutation,  
    useUploadProfilePhotoMutation,  
    useUploadBgPhotoMutation,
    useUpdateUserPersonalDetailsSettingsMutation,
    useUpdateUsernameAndNameMutation,
    useSearchUserQuery,
    useGetSuggestedForYouQuery,
} = usersApiSlice; 
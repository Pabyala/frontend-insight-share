import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET',
            }),
        }),
        getUserData: builder.query({
            query: () => ({
                url: '/user/user-data/',
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserDataQuery } = authApiSlice; 

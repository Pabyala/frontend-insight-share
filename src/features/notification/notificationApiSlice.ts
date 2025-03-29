import { apiSlice } from "../../app/api/apiSlice";
import { NotificationResponse } from "../../interface/notification-types";
export const notificationApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query<NotificationResponse, string>({
            query: (userId) => `/notification/${userId}`, 
            transformResponse: (response: NotificationResponse) => {
                return response
            },
            providesTags: ['Notification'],
        }),
        markNotificationAsRead: builder.mutation<void, string>({
            query: (notificationId) => ({
                url: `/notification/read/${notificationId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notification"],
        }),
        markAllAsRead: builder.mutation<{ message: string }, string>({
            query: (userId) => ({
                url: `/notification/mark-all-read/${userId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Notification'],
        }),
    }),
});
export const { 
    useGetNotificationQuery,
    useMarkNotificationAsReadMutation,
    useMarkAllAsReadMutation,
} = notificationApiSlice; 
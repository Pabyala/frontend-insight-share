import { apiSlice } from "../../app/api/apiSlice";
import { MyNotification, NotificationResponse } from "../../interface/notification-types";
export const notificationApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query<NotificationResponse, string>({
            query: (userId) => `/notification/${userId}`, 
            transformResponse: (response: NotificationResponse) => {
                return response
            },
            providesTags: ['Notification'],
        }),
    }),
});
export const { 
    useGetNotificationQuery,
} = notificationApiSlice; 
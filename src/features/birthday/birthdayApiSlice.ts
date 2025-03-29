import { apiSlice } from '../../app/api/apiSlice';
import { TodaysBday } from '../../interface/birthday-type';

export const birthdayApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserTodayBirthday: builder.query<TodaysBday, void>({
            query: () => '/birthday/today-birthday', 
            transformResponse: (response: TodaysBday) => {
                return response}
            ,
            providesTags: ['UserBday'],
        })
    }),
});

export const { 
    useGetUserTodayBirthdayQuery,
} = birthdayApiSlice;
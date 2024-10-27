import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../../features/auth/authSlice';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store'; 

interface RefreshResponse {
    accessToken: string;
    id: string;
    username: string;
}

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// wrapper function with re-authentication logic
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log("API result status:", result?.error);

    if (result?.error?.status === "PARSING_ERROR") {
        console.log(result?.error?.originalStatus)
        console.log('Access token expired, attempting to refresh...');
        const refreshResult = await baseQuery('/refresh', api, extraOptions);

        if (refreshResult?.data) {
            const { accessToken, id, username } = refreshResult.data as RefreshResponse;
            // Update credentials in the store
            api.dispatch(setCredentials({ username, accessToken, id }));

            // Retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
        
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),  
    tagTypes: ['UserInfo'],
});

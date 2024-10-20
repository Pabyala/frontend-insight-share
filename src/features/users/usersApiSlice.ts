import { apiSlice } from "../../app/api/apiSlice";
import { AllUsersResponse, User } from "../../interface/types";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '/user/all-users',
            transformResponse: (response: AllUsersResponse) => response.allUsers,
            keepUnusedDataFor: 5, //5s
        })
    }),
});

export const { useGetUsersQuery } = usersApiSlice; 




// error: {
//     data: "Forbidden",
//     error: "SyntaxError: Unexpected token 'F', \"Forbidden\" is not valid JSON",
//     originalStatus: 403
//     status: "PARSING_ERROR"
// }
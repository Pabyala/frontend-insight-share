import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    username: string | null;
    token: string | null;
    id: string | null;
    userData: object | null;
}

const initialState: AuthState = {
    username: null,
    token: null,
    id: null,
    userData: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ username: string | null; accessToken: string; id: string | null }>) => {
            const { username, accessToken, id } = action.payload;
            state.username = username;
            state.token = accessToken;
            state.id = id;
        },
        setUserDetails: (state, action: PayloadAction<object>) => {
            state.userData = action.payload;  // Store full user data in state
        },
        logOut: (state) => {
            state.username = null
            state.token = null
            state.id = null
        }
    },

})

export const { setCredentials, setUserDetails, logOut } = authSlice.actions

export default authSlice.reducer

// Add a selector to get full user data
export const selectCurrentUserData = (state: { auth: AuthState }) => state.auth.userData;
// typed selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.username
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token
export const selectCurrentId = (state: { auth: AuthState }) => state.auth.id


// Logout function to use on the front-end
// export const useHandleLogout = () => {
//     const [logout] = useLogoutMutation();
//     const dispatch = useAppDispatch();

//     const handleLogout = async () => {
//         try {
//             await logout().unwrap();
//         } catch (err) {
//             console.error('Failed to log out:', err);
//         } finally {
//             // Clear Redux state
//             dispatch(logOut());
//         }
//     };

//     return handleLogout;
// };
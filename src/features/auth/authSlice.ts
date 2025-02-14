import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    email: string | null;
    token: string | null;
    id: string | null;
    userData: object | null;
}

const initialState: AuthState = {
    email: null,
    token: null,
    id: null,
    userData: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ email: string | null; accessToken: string; id: string | null }>) => {
            const { email, accessToken, id } = action.payload;
            state.email = email;
            state.token = accessToken;
            state.id = id;
        },
        setUserDetails: (state, action: PayloadAction<object>) => {
            state.userData = action.payload;  // Store full user data in state
        },
        logOut: (state) => {
            state.email = null
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
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.email
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token
export const selectCurrentId = (state: { auth: AuthState }) => state.auth.id
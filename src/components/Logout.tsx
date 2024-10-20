import React from 'react'
import { logOut, selectCurrentId, selectCurrentToken, selectCurrentUser } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/auth/authApiSlice';

export default function Logout() {
    const username = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)
    const id = useSelector(selectCurrentId)

    console.log("Username:", username);
    console.log("Token:", token); 
    console.log("My Id:", id); 
    const [logout, { isLoading }] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // dispatch the logOut action to clear the state
            await logout({}).unwrap();

            // Redirect to login page
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };
    return (
        <div>
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

import { logOut } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../features/auth/authApiSlice';
import { showToast } from '../utils/ToastUtils';

export default function Logout() {
    const [ logoutUser ] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // dispatch the logOut action to clear the state
            await logoutUser().unwrap();
            dispatch(logOut());

            // Redirect to login page
            navigate('/login', { replace: true });
        } catch (error) {
            showToast('Failed to log out', 'error')
        }
    };
    return (
        <div>
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

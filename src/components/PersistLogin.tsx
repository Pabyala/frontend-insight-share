import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import usePersist from '../hooks/usePersist';
import { useRefreshTokenQuery } from '../features/auth/authApiSlice';
import { Link, Outlet } from 'react-router-dom';
import BeatLoadingModal from './loading/BeatLoadingModal';

export default function PersistLogin() {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const [isRefreshed, setIsRefreshed] = useState<boolean>(false);

    // only call the refresh token query if there is no token and persist is enabled
    const { isLoading, isError, isSuccess } = useRefreshTokenQuery(undefined, {
        // skip query if token exists or persist is disabled
        skip: !!token || !persist, 
    });
    

    useEffect(() => { 
        // if query success, update the isRefreshed
        if (isSuccess) {
            setIsRefreshed(true);
        }
        // if query is field/error
        if (isError) {
            console.log("Refresh token failed: ", isError)
        }
    }, [isSuccess, isError]);

    const renderContent = () => {
        // if persist is false return Outlet to render allow access
        if (!persist) {
            return <Outlet />;
        // if loading is true, refresh token is still in progress
        } else if (isLoading) {
            return <BeatLoadingModal/>
        // if has error during refresh token process
        } else if (isError) {
            return (
                <div className="errmsg">
                    <p>Error occurred. Please try again.</p>
                    <Link to="/login">Please login again</Link>.
                </div>
            );
        // if isSuccess is true or isRefreshed is true or token in valid. then user is authenticated. render that Outlet
        } else if (isSuccess || isRefreshed || token) {
            return <Outlet />;
        }
    };

    return <>{renderContent()}</>;
}

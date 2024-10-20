import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentId, selectCurrentToken, selectCurrentUser, selectCurrentUserData } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useGetUserDataQuery } from '../features/auth/authApiSlice'
import { RootState } from '../app/store'; 

export default function Welcome() {
    const username = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)
    const id = useSelector(selectCurrentId)

    console.log("Username:", username);
    console.log("Token:", token); 
    console.log("My Id:", id); 

    const currentUserId = useSelector((state: RootState) => selectCurrentId(state));
    const currentUsername = useSelector((state: RootState) => selectCurrentUser(state));

    // fetch full user data using the query, skipping if user is not logged in
    const { data: userData, error, isLoading, refetch } = useGetUserDataQuery(undefined, {
        skip: !token, // skip fetching if user is not logged in
    });

    console.log(userData)

    if (isLoading) {
        return <p>Loading user data...</p>;
    }

    if (error) {
        return <p>Failed to load user data. Please try again later.</p>;
    }

    return (
        <div>
            <div>
            <h1>Welcome, {currentUsername || 'User'}!</h1>
            {userData && (
                <div>
                    <h2>Your Profile Information:</h2>
                    <p><strong>Username:</strong> {userData.userInfo?.username}</p>
                    <p><strong>Email:</strong> {userData.userInfo?.email}</p>
                    <p><strong>First Name:</strong> {userData.userInfo?.firstName}</p>
                    <p><strong>Last Name:</strong> {userData.userInfo?.lastName}</p>
                    <p><strong>Gender:</strong> {userData.userInfo?.gender}</p>
                    <p><strong>ID:</strong> {userData.userInfo?._id}</p>
                    <p><strong>Phone Number:</strong> {userData.userInfo?.phoneNumber}</p>
                    <p>Followers: <span>{userData.userInfo?.followers.length}</span></p>
                    <p>Following: <span>{userData.userInfo?.following.length}</span></p>
                    <p>Socials: <span>{userData.userInfo?.socials.length}</span></p>
                </div>
            )}

            <Link to={'/userlist'}>Go to user list</Link>
        </div>
            
        </div>
    )
}

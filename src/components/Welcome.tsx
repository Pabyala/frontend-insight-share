import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentId, selectCurrentToken, selectCurrentUser, selectCurrentUserData } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
// import { useGetUserDataQuery } from '../features/auth/authApiSlice'
import { RootState } from '../app/store'; 
import { useGetUserQuery } from '../features/users/usersApiSlice'

export default function Welcome() {
    // const userId = useSelector(selectCurrentId)
    // const userId: string | null = '';
    // console.log("My Id", userId)

    const { data: userData, error, isLoading, refetch } =  useGetUserQuery();
    console.log("My Data", userData?.userInfo?._id);

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
            <h1>Welcome!</h1>
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

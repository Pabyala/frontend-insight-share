import React from 'react'
import Navbar from '../components/navbar/Navbar'
import ProfileHeader from '../components/user/profile/ProfileHeader'
import ProfileIntro from '../components/user/profile/ProfileIntro'
import { useSelector } from 'react-redux'
import { selectCurrentId } from '../features/auth/authSlice'
import { useGetUserPostsQuery } from '../features/auth/authApiSlice'
import Posts from '../components/post/Posts'
import { useGetUserFollowersQuery, useGetUserQuery } from '../features/users/usersApiSlice'
import BdayPost from '../components/post/BdayPost'

export default function Profile() {

    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    const userId = userInfo?._id;
    const { data: posts, error, isLoading } = useGetUserPostsQuery(userId || null, {
        skip: !userId, // Skip the query if userId is not available
    });
    const { data: followersData, isError } = useGetUserFollowersQuery();

    console.log("My posts", posts)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching posts</div>;
    console.log(error)

    return (
        <div className='flex flex-col pb-5'>
            <Navbar/>
            <div className='container mx-auto flex flex-col justify-between pt-[63px] lg:pt-[65px] xl:pt-[68px] relative overflow-hidden space-y-1.5 lg:space-y-3'>
                <ProfileHeader />
                <div className='flex flex-col space-y-1.5 lg:space-y-0 lg:flex-row lg:justify-between'>
                    <div className='lg:w-[42%]'>
                        <ProfileIntro  />
                    </div>
                    <div className='lg:w-[56%]'>
                        <BdayPost myName={userInfo?.firstName} />
                        <Posts posts={posts?.yourAllPost} />
                    </div>
                </div>
            </div>
        </div>
    )
}

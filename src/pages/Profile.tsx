import React, { useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import ProfileHeader from '../components/user/profile/ProfileHeader'
import ProfileIntro from '../components/user/profile/ProfileIntro'
import { useSelector } from 'react-redux'
import { selectCurrentId } from '../features/auth/authSlice'
import { useGetUserPostsQuery } from '../features/auth/authApiSlice'
import Posts from '../components/post/Posts'
import { useGetUserFollowersQuery, useGetUserQuery } from '../features/users/usersApiSlice'
import BdayPost from '../components/post/BdayPost'
import { useGetUserAllPostsQuery } from '../features/posts/postsApiSlice'

export default function Profile() {

    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    const { data: followersData, error: followersError } = useGetUserFollowersQuery();
    const { data: yourPosts, error: errorYourPosts, isLoading: isLoadingYourPosts, refetch: refetchYourPosts } = useGetUserAllPostsQuery();

    const posts = yourPosts ? yourPosts.dataPost : [];
    console.log("My posts", yourPosts)

    const myBirthday = userInfo?.dateOfBirth; // 1990-11-01
    const isTodayBirthday = () => {
        if (!myBirthday) return false;

        const today = new Date();
        const birthDate = new Date(myBirthday);
        
        return today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth();
    };

    useEffect(() => {
        refetchYourPosts();
    }, [refetchYourPosts]);

    if (isUserInfoLoading) return <div>Loading...</div>;
    if (userInfoError) return <div>Error fetching posts</div>;
    console.log(userInfoError)

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
                        {isTodayBirthday() && (
                            <BdayPost myName={userInfo?.firstName} />
                        )}
                        <Posts 
                            posts={posts} 
                            isLoading={isLoadingYourPosts} 
                            error={errorYourPosts}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../features/users/usersApiSlice';
import { useGetUserAllPostsQuery } from '../features/posts/postsApiSlice';
import Navbar from '../components/navbar/Navbar';
import ProfileHeader from '../components/user/profile/ProfileHeader';
import ProfileIntro from '../components/user/profile/ProfileIntro';
import Posts from '../components/post/Posts';

export default function ViewUserProfile() {
    const { userId } = useParams();
    const { data: userInfo } = useGetUserByIdQuery(userId || '');
    const { data: yourPosts, error: errorYourPosts, isLoading: isLoadingYourPosts, refetch: refetchYourPosts } = useGetUserAllPostsQuery(userId);

    const posts = yourPosts ? yourPosts.dataPost : [];

    return (
        <div className='flex flex-col pb-5'>
            <Navbar/>
            <div className='container mx-auto flex flex-col justify-between pt-[63px] lg:pt-[65px] xl:pt-[68px] relative overflow-hidden space-y-1.5 lg:space-y-3'>
                <ProfileHeader
                    userInfo={userInfo}
                />
                <div className='flex flex-col space-y-1.5 lg:space-y-0 lg:flex-row lg:justify-between'>
                    <div className='lg:w-[42%]'>
                        <ProfileIntro  
                            userInfo={userInfo}
                        />
                    </div>
                    <div className='lg:w-[56%]'>
                        <Posts
                            posts={posts} 
                            isLoading={isLoadingYourPosts} 
                            error={errorYourPosts}
                            // savedPostIds={allSavedPostId}
                            // userId={userId}
                            refetch={refetchYourPosts}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
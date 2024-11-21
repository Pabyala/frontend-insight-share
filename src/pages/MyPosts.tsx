import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import ProfileHeader from '../components/user/profile/ProfileHeader'
import MenuListLeftBar from '../components/leftbar/MenuListLeftBar'
import { useGetUserQuery } from '../features/users/usersApiSlice';
import { useGetSavedPostQuery, useGetUserAllPostsQuery } from '../features/posts/postsApiSlice';
import Posts from '../components/post/Posts';

export default function MyPosts() {
    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    const { data: yourPosts, error: errorYourPosts, isLoading: isLoadingYourPosts, refetch: refetchYourPosts } = useGetUserAllPostsQuery();
    const { data: savedPosts, error: errorSavedPosts, isLoading: isLoadingSavedPosts, refetch: refetchSavedPosts } = useGetSavedPostQuery()

    const posts = yourPosts ? yourPosts.dataPost : [];
    const userId = userInfo?._id

    const mySavedPosts = savedPosts ? savedPosts.savedPosts : [];
    const [allSavedPostId, setAllSavedPostId] = useState<string[]>([]);

    useEffect(() => {
        if (mySavedPosts) {
            const allPostIds = mySavedPosts.map(post => post._id);
            setAllSavedPostId(allPostIds);
        }
    }, [mySavedPosts]); 

    if (isUserInfoLoading) return <div>Loading...</div>;
    if (userInfoError) return <div>Error fetching posts</div>;
    return (
        <div className='flex flex-col pb-5'>
            <Navbar />
            <div className='container mx-auto flex flex-col justify-between pt-[63px] lg:pt-[65px] xl:pt-[68px] relative overflow-hidden space-y-1.5 lg:space-y-3'>
                <ProfileHeader 
                    userInfo={userInfo}
                />
                <div className='flex flex-col space-y-1.5 lg:space-y-0 lg:flex-row lg:justify-between'>
                    <div className='lg:w-[42%]'>
                        <MenuListLeftBar />
                    </div>
                    <div className='lg:w-[56%]'>
                        <Posts
                            posts={posts} 
                            isLoading={isLoadingYourPosts} 
                            error={errorYourPosts}
                            // savedPostIds={allSavedPostId}
                            userId={userId}
                            refetch={refetchYourPosts}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import ProfileHeader from '../components/user/profile/ProfileHeader'
import MenuListLeftBar from '../components/leftbar/MenuListLeftBar'
import { useGetSavedPostQuery, useGetUserAllPostsQuery } from '../features/posts/postsApiSlice';
import Posts from '../components/post/Posts';
import { useGetUserQuery } from '../features/users/usersApiSlice';

export default function MyPosts() {

    const { data: userInfo } = useGetUserQuery();
    const { data: yourPosts, error: errorYourPosts, isLoading: isLoadingYourPosts, refetch: refetchYourPosts } = useGetUserAllPostsQuery();
    const { data: savedPosts } = useGetSavedPostQuery()

    const posts = yourPosts ? yourPosts.dataPost : [];

    const mySavedPosts = savedPosts ? savedPosts.savedPosts : [];
    const [allSavedPostId, setAllSavedPostId] = useState<string[]>([]);

    useEffect(() => {
        if (mySavedPosts) {
            const allPostIds = mySavedPosts.map(post => post._id);
            setAllSavedPostId(allPostIds);
        }
    }, [mySavedPosts]); 

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
                            refetch={refetchYourPosts}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
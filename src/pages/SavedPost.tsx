import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import ProfileHeader from '../components/user/profile/ProfileHeader'
import ProfileIntro from '../components/user/profile/ProfileIntro'
import Posts from '../components/post/Posts'
import { useGetUserFollowersQuery, useGetUserQuery } from '../features/users/usersApiSlice'
import { useGetSavedPostQuery, useGetUserAllPostsQuery } from '../features/posts/postsApiSlice'
import MenuListLeftBar from '../components/leftbar/MenuListLeftBar'
import TestPost01 from '../components/post/TestPost01'

export default function SavedPost() {

    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    const { data: yourPosts, error: errorYourPosts, isLoading: isLoadingYourPosts, refetch: refetchYourPosts } = useGetUserAllPostsQuery();
    const { data: savedPosts, error: errorSavedPosts, isLoading: isLoadingSavedPosts, refetch: refetchSavedPosts } = useGetSavedPostQuery()

    const mySavedPosts = savedPosts ? savedPosts.savedPosts : [];
    const [allSavedPostId, setAllSavedPostId] = useState<string[]>([]);
    console.log("All id that saved: ", allSavedPostId)

    useEffect(() => {
        if (mySavedPosts) {
            const allPostIds = mySavedPosts.map(post => post._id);
            setAllSavedPostId(allPostIds);
        }
    }, [mySavedPosts]);

    if (isLoadingSavedPosts) return <div>Loading...</div>;
    if (errorSavedPosts) return <div>Error fetching posts</div>;
    // if (errorSavedPosts) {
    //     return <div>Error fetching saved posts: {errorSavedPosts.message}</div>;
    // }
    console.log(errorSavedPosts)

    return (
        <div className='flex flex-col pb-5'>
            <Navbar/>
            <div className='container mx-auto flex flex-col justify-between pt-[63px] lg:pt-[65px] xl:pt-[68px] relative overflow-hidden space-y-1.5 lg:space-y-3'>
                <ProfileHeader />
                <div className='flex flex-col space-y-1.5 lg:space-y-0 lg:flex-row lg:justify-between'>
                    <div className='lg:w-[42%]'>
                        {/* <ProfileIntro  /> */}
                        <MenuListLeftBar/>
                    </div>
                    <div className='lg:w-[56%]'>
                        {/* <TestPost01
                            posts={mySavedPosts} 
                            isLoading={isLoadingSavedPosts} 
                            error={errorSavedPosts}
                            savedPostIds={allSavedPostId}
                        /> */}
                        <Posts
                            posts={mySavedPosts} 
                            isLoading={isLoadingSavedPosts} 
                            error={errorSavedPosts}
                            savedPostIds={allSavedPostId}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import ProfileHeader from '../components/user/profile/ProfileHeader'
import ProfileIntro from '../components/user/profile/ProfileIntro'
import Posts from '../components/post/Posts'
import { useGetUserFollowersQuery, useGetUserQuery } from '../features/users/usersApiSlice'
import BdayPost from '../components/post/BdayPost'
import { useGetSavedPostQuery, useGetUserAllPostsQuery } from '../features/posts/postsApiSlice'

export default function Profile() {

    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    const { data: yourPosts, error: errorYourPosts, isLoading: isLoadingYourPosts, refetch: refetchYourPosts } = useGetUserAllPostsQuery();

    const posts = yourPosts ? yourPosts.dataPost : [];
    const userId = userInfo?._id
    console.log("My posts", yourPosts)

    const myBirthday = userInfo?.dateOfBirth;
    const isTodayBirthday = () => {
        if (!myBirthday) return false;

        const today = new Date();
        const birthDate = new Date(myBirthday);
        
        return today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth();
    };

    const { data: savedPosts, error: errorSavedPosts, isLoading: isLoadingSavedPosts, refetch: refetchSavedPosts } = useGetSavedPostQuery()

    const mySavedPosts = savedPosts ? savedPosts.savedPosts : [];
    const [allSavedPostId, setAllSavedPostId] = useState<string[]>([]);
    console.log("All id that saved: ", allSavedPostId)

    useEffect(() => {
        if (mySavedPosts.length > 0) {
            const allPostIds = mySavedPosts.map(post => post._id);
            setAllSavedPostId(allPostIds);
        }
    }, [mySavedPosts]); 

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
                            savedPostIds={allSavedPostId}
                            userId={userId}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

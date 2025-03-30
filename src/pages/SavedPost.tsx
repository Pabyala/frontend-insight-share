import React, { useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import ProfileHeader from '../components/user/profile/ProfileHeader'
import Posts from '../components/post/Posts'
import { useGetSavedPostQuery } from '../features/posts/postsApiSlice'
import MenuListLeftBar from '../components/leftbar/MenuListLeftBar'
import { useGetUserQuery } from '../features/users/usersApiSlice'
import socketSetup from '../socket-io/socket-setup'
import BeatLoading from '../components/loading/BeatLoading'

export default function SavedPost() {

    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    const { data: savedPosts, error: errorSavedPosts, isLoading: isLoadingSavedPosts, refetch: refetchSavedPosts } = useGetSavedPostQuery()
    const mySavedPosts = savedPosts ? savedPosts.savedPosts : [];

    useEffect(() => {
        socketSetup.on('deletedPost', ()=> {
            refetchSavedPosts()
        })
    }, [refetchSavedPosts])

    if (isLoadingSavedPosts || isUserInfoLoading) return <div className='text-sm'>Loading...</div>;
    if (errorSavedPosts || userInfoError) return <div className='text-sm'>Error fetching posts</div>;

    return (
        <div className='flex flex-col pb-5'>
            <Navbar/>
            <div className='container mx-auto flex flex-col justify-between pt-[63px] lg:pt-[65px] xl:pt-[68px] relative overflow-hidden space-y-1.5 lg:space-y-3'>
                <ProfileHeader 
                    userInfo={userInfo}
                />
                <div className='flex flex-col space-y-1.5 lg:space-y-0 lg:flex-row lg:justify-between'>
                    <div className='lg:w-[42%]'>
                        <MenuListLeftBar/>
                    </div>
                    <div className='lg:w-[56%]'>
                        { isLoadingSavedPosts ? 
                            <BeatLoading/> :
                            <Posts
                                posts={mySavedPosts} 
                                // isLoading={isLoadingSavedPosts} 
                                error={errorSavedPosts}
                                refetch={refetchSavedPosts}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
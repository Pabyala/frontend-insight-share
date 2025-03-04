import React, { useEffect, useState } from 'react'
import CreatePost from '../post/CreatePost'
import { useGetPostsForTimelineQuery, useGetSavedPostQuery } from '../../features/posts/postsApiSlice';
import Posts from '../post/Posts';
import { useGetUserQuery } from '../../features/users/usersApiSlice';

export default function Timeline() {

    const { data: timelinePosts, error: errorTimelinePosts, isLoading: isLoadingTimelinePosts, refetch: refetchTimelinePosts } = useGetPostsForTimelineQuery();
    const { data: userInfo } = useGetUserQuery();
    const { data: savedPosts } = useGetSavedPostQuery()

    const posts = timelinePosts ? timelinePosts.dataPost : []
    const userId = userInfo?._id
    const mySavedPosts = savedPosts ? savedPosts.savedPosts : [];
    
    const [allSavedPostId, setAllSavedPostId] = useState<string[]>([]);

    // useEffect(() => {
    //     if (Array.isArray(mySavedPosts)) {
    //         const allPostIds = mySavedPosts.map(post => post._id);
    //         setAllSavedPostId(allPostIds);
    //     }
    // }, [mySavedPosts]); 

    if (isLoadingTimelinePosts) return <div>Loading...</div>;
    if (errorTimelinePosts) return <div>Error fetching posts</div>;

    return (
        <div className='flex w-full flex-col lg:w-[55%] xl:w-[45%]'>
            <CreatePost/>
            <Posts 
                posts={posts}
                isLoading={isLoadingTimelinePosts}
                error={errorTimelinePosts}
                // savedPostIds={allSavedPostId}
                // userId={userId}
                refetch={refetchTimelinePosts}
            />
        </div>
    )
}

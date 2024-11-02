import React, { useEffect, useState } from 'react'
import CreatePost from '../post/CreatePost'
import { useGetPostsForTimelineQuery, useGetSavedPostQuery } from '../../features/posts/postsApiSlice';
import Posts from '../post/Posts';

export default function Timeline() {

    const { data: timelinePosts, error: errorTimelinePosts, isLoading: isLoadingTimelinePosts, refetch: refetchTimelinePosts } = useGetPostsForTimelineQuery();
    console.log("Myy timeline posts", timelinePosts)

    const posts = timelinePosts ? timelinePosts.dataPost : [];

    const { data: savedPosts, error: errorSavedPosts, isLoading: isLoadingSavedPosts, refetch: refetchSavedPosts } = useGetSavedPostQuery()

    const mySavedPosts = savedPosts ? savedPosts.savedPosts : [];
    // const mySavedPosts = Array.isArray(savedPosts?.savedPosts) ? savedPosts.savedPosts : [];
    const [allSavedPostId, setAllSavedPostId] = useState<string[]>([]);
    console.log("All id that saved: ", allSavedPostId)

    useEffect(() => {
        if (mySavedPosts) {
            const allPostIds = mySavedPosts.map(post => post._id);
            setAllSavedPostId(allPostIds);
        }
    }, [mySavedPosts]); 

    useEffect(() => {
        refetchTimelinePosts();
    }, [refetchTimelinePosts]);

    if (isLoadingTimelinePosts) return <div>Loading...</div>;
    if (errorTimelinePosts) return <div>Error fetching posts</div>;

    return (
        <div className='flex w-full flex-col lg:w-[55%] xl:w-[45%]'>
            <CreatePost/>
            <Posts 
                posts={posts}
                isLoading={isLoadingTimelinePosts}
                error={errorTimelinePosts}
                savedPostIds={allSavedPostId}
            />
            
        </div>
    )
}

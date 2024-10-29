import React, { useEffect } from 'react'
import CreatePost from '../post/CreatePost'
import { useGetPostsForTimelineQuery } from '../../features/posts/postsApiSlice';
import Posts from '../post/Posts';

export default function Timeline() {

    const { data: timelinePosts, error: errorTimelinePosts, isLoading: isLoadingTimelinePosts, refetch: refetchTimelinePosts } = useGetPostsForTimelineQuery();
    console.log("Myy timeline posts", timelinePosts)

    const posts = timelinePosts ? timelinePosts.dataPost : [];

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
            />
            
        </div>
    )
}

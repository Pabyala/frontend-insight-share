import CreatePost from '../post/CreatePost'
import { useGetPostsForTimelineQuery } from '../../features/posts/postsApiSlice';
import Posts from '../post/Posts';
import BeatLoading from '../loading/BeatLoading';

export default function Timeline() {

    const { data: timelinePosts, error: errorTimelinePosts, isLoading: isLoadingTimelinePosts, refetch: refetchTimelinePosts } = useGetPostsForTimelineQuery();

    const posts = timelinePosts ? timelinePosts.dataPost : []

    if (isLoadingTimelinePosts) return <BeatLoading/>;

    return (
        <div className='flex w-full flex-col lg:w-[55%] xl:w-[45%]'>
            <CreatePost/>
            <Posts 
                posts={posts}
                // isLoading={isLoadingTimelinePosts}
                error={errorTimelinePosts}
                refetch={refetchTimelinePosts}
            />
        </div>
    )
}

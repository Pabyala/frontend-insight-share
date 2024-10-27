import React from 'react'
import CreatePost from '../post/CreatePost'
// import { useGetPostsQuery } from '../../features/auth/authApiSlice';

export default function Timeline() {

    // const { data: posts, error, isLoading } = useGetPostsQuery();
    // console.log("Your timeline posts", posts?.yourPost )

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error fetching posts</div>;

    return (
        <div className='flex w-full flex-col lg:w-[55%] xl:w-[45%]'>
            <CreatePost/>
            {/* <Posts allPosts={posts?.yourPost || []}/> */}
            
        </div>
    )
}

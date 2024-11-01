import { Avatar, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FluentCommentEdit16Filled, MingcuteSaveLine } from '../others/CustomIcons';
import AllReactions from './AllReactions';
import ReactCommentShare from './ReactCommentShare';
import PostModal from './PostModal';
import { dummyPosts } from '../../data/dummy-post';
import SelectOneReaction from './SelectOneReaction';
import { useSelector } from 'react-redux';
import { selectCurrentId, selectCurrentToken } from '../../features/auth/authSlice';
import { Post, TimelinePosts } from '../../interface/your-posts';
import PostTextArea from './PostTextarea';
import { useGetUserQuery } from '../../features/users/usersApiSlice';

interface PostsProps {
    posts: Post[]; 
    isLoading: boolean;
    error: any;
}

export default function Posts({ posts, isLoading, error }: PostsProps) {

    const { data: userInfo, error: errorUserInfo, isLoading: isLoadingUserInfo } = useGetUserQuery();
    
    const [openPostModal, setOpenPostModal] = useState<boolean>(false);
    const [openPostTextAre, setOpenPostTextArea] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<string>('');
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    
    const handleOption = (postId: string) => {
        console.log("clicked post: ", postId)
        setSelectedPostId((prevId) => (prevId === postId ? null : postId));
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => { 
            if ( selectedPostId &&
                !document.getElementById(`options-${selectedPostId}`)?.contains(event.target as Node)) {
                setSelectedPostId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedPostId]);

    if (isLoading) return <div>Loading posts...</div>;
    if (error) return <div>Error loading posts</div>;
    if (!posts || posts.length === 0) return <div>No posts available</div>;

    const handlePostModal = (postId: string) => {
        setSelectedPost(postId)
        setOpenPostModal(!openPostModal)
    }

    const toggleShowPostTextArea = () => {
        setOpenPostTextArea(!openPostTextAre);
    };

    return (
        <div className='flex flex-col pb-3 space-y-2 lg:space-y-3'>
            {/* {posts ? ( */}
                {posts?.map(post => (
                    <div key={post._id} className='w-full relative'>
                        <div className='bg-lightWhite p-3 rounded'>
                            {/* Profile and more option */}
                            <div className='mb-1'>
                                <div className="flex justify-between">
                                    <div className='flex items-center space-x-3'>
                                        <Avatar
                                            sx={{ width: 38, height: 38 }}
                                            alt="Remy Sharp"
                                            src={post?.authorId?.avatarUrl}
                                        />
                                        <div className='flex flex-col'>
                                            <span className='text-sm font-semibold text-black'>{post?.authorId?.firstName} {post?.authorId?.middleName} {post?.authorId?.lastName}</span>
                                            <span className='text-xs text-slate-600'>9m ago</span>
                                        </div>
                                    </div>
                                    <div id={`options-${post._id}`} >
                                        <Tooltip title="Show more">
                                            <IconButton
                                                onClick={() => handleOption(post._id)}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {selectedPostId === post._id && (
                                            <div className='absolute top-[30px] right-[55px] z-[2]'>
                                                <div className='bg-white drop-shadow-lg p-2 flex flex-col items-start border-[1px] rounded'>
                                                    {userInfo?._id === post.authorId._id && (
                                                        <>
                                                            <div className='text-sm hover:bg-gray-300 p-1.5 w-full rounded-sm cursor-pointer'>Update post</div>
                                                            <div className='text-sm hover:bg-gray-300 p-1.5 w-full rounded-sm cursor-pointer'>Delete post</div>
                                                        </>
                                                    )}
                                                    
                                                    <div className='text-sm hover:bg-gray-300 p-1.5 w-full rounded-sm cursor-pointer'>Save post</div>
                                                    <div className='text-sm hover:bg-gray-300 p-1.5 w-full rounded-sm cursor-pointer'>Unsave post</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Post content */}
                            <div className=''>
                                <div className="flex">
                                    <div className="my-2">
                                        {post.captionPost.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line}
                                                {index < post.captionPost.split('\n').length - 1 && <br />}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* <ReactCommentShare 
                                // totalCommets={totalCommets} 
                                // totolReplies={totolReplies} 
                                post={post}
                            /> */}
                            <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
                            {/* react, comment */}
                            <div className='pt-1'>
                                <div  className='w-full flex justify-between'>
                                    <div 
                                        className='w-1/3 flex items-center justify-center space-x-1 relative group p-1.5 rounded-full hover:bg-slate-200 cursor-pointer'
                                        style={{ minWidth: '100px', minHeight: '24px' }}
                                    >
                                        <div className='flex items-center justify-center space-x-2'>
                                            {/* <NotoOrangeHeart className='text-lg'/>
                                            <span className='text-sm font-medium text-slate-500'>Heart</span> */}

                                            <AllReactions/>
                                        </div>
                                        <div className="absolute bottom-full  mb-2 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-center flex items-center space-x-1">
                                            <SelectOneReaction/>
                                        </div>
                                    </div>
                                    <div >
                                        <div 
                                            
                                            data-dropdown-toggle="mega-menu-dropdown"
                                            className='w-1/3 flex items-center justify-center space-x-1 cursor-pointer relative group p-1.5 rounded-full hover:bg-slate-200'
                                            onClick={() => handlePostModal(post._id)}
                                        >
                                            <FluentCommentEdit16Filled className='text-lg'/>
                                            <span className='text-sm font-medium text-slate-500'>Comment</span>
                                        </div>
                                    </div>
                                    {/* {openPostModal && <PostModal post={post} onClose={handlePostModal}/>} */}
                                    { openPostModal && 
                                        <PostModal 
                                            selectedPost={selectedPost} 
                                            onClose={() => handlePostModal('')} 
                                        />}
                                    <div className='w-1/3 flex items-center justify-center space-x-1 cursor-pointer p-1.5 rounded-full hover:bg-slate-200'>
                                        <MingcuteSaveLine className='text-lg'/>
                                        <span className='text-sm font-medium text-slate-500'>Save</span>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        {/* Option modal show*/}
                        {/* {openOptions[post._id] && ( */}
                        
                        
                    </div>
                ))}
                {openPostTextAre && <PostTextArea onClose={toggleShowPostTextArea} />}
            {/* ) : (
                <div className='bg-lightWhite p-3 rounded w-full flex justify-center'>
                    <span className=''>No posts available.</span>
                </div>
            )} */}
        </div>
    )
}

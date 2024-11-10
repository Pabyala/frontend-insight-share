import React from 'react'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FluentCommentEdit16Filled, MingcuteSaveLine } from '../others/CustomIcons';
import SelectOneReaction from './SelectOneReaction';
import { Post } from '../../interface/your-posts';
import PostTextArea from './PostTextarea';
import { useGetUserQuery } from '../../features/users/usersApiSlice';
import UpdatePostModal from './UpdatePostModal';
import { useDeletePostMutation, useSavedPostMutation, useUnsavedPostMutation } from '../../features/posts/postsApiSlice';
import PostModal from './PostModal';

interface PostsProps {
    posts: Post[]; 
    isLoading: boolean;
    error: any;
    savedPostIds: string[];
}

export default function TestPost01({ posts, isLoading, error, savedPostIds }: PostsProps) {

    const { data: userInfo, error: errorUserInfo, isLoading: isLoadingUserInfo } = useGetUserQuery();
    const [deletePost] = useDeletePostMutation();
    const [savedPost] = useSavedPostMutation();
    const [unsavedPost] = useUnsavedPostMutation();

    const [openPostModal, setOpenPostModal] = useState<boolean>(false);
    const [openPostTextAre, setOpenPostTextArea] = useState<boolean>(false);
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<string>('');
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [selectedPostData, setSelectedPostData] = useState<Post>() // for update the post
    const userId = userInfo?._id;
    console.log("All ids that saved: ", savedPostIds)
    
    const [isSavedPost, setIsSavedPost] = useState<boolean>(false)
    const handleOption = (postId: string) => {
        setSelectedPostId((prevId) => (prevId === postId ? null : postId));
        if(savedPostIds.includes(postId)){
            setIsSavedPost(true)
        } else {
            setIsSavedPost(false)
        }
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

    const handleShowModalUpdate = (post: Post) => {
        setSelectedPostData(post)
        setOpenUpdateModal(true)
    }

    const handleDeletePost = async (postId: string) => {
        if(!postId) return
        try {
            await deletePost(postId).unwrap();
            setSelectedPostId(null);
            console.log(`Post id: ${postId} deleted!`)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSavePost = async (postId: string) => {
        if(!postId) return
        try {
            await savedPost(postId).unwrap();
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnsavedPost = async (postId: string) => {
        if(!postId) return
        try {
            await unsavedPost(postId).unwrap();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col pb-3 space-y-2 lg:space-y-3'>
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
                                            <div className='flex space-x-2'>
                                                <p className='text-sm font-semibold text-black'>{post?.authorId?.firstName} {post?.authorId?.middleName} {post?.authorId?.lastName}</p>
                                                <p className='text-sm font-semibold text-blue-500'>Follow</p>
                                            </div>
                                            <p className='text-xs text-slate-600'>9m ago</p>
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
                                                    {userId === post.authorId._id && (
                                                        <>
                                                            <div 
                                                                onClick={() => handleShowModalUpdate(post)}
                                                                className='text-sm hover:bg-gray-300 p-1.5 w-full rounded-sm cursor-pointer'
                                                            >
                                                                Update post
                                                            </div>
                                                            <div 
                                                                onClick={() => handleDeletePost(post._id)}
                                                                className='text-sm hover:bg-gray-300 p-1.5 w-full rounded-sm cursor-pointer'
                                                            >
                                                                Delete post
                                                            </div>
                                                        </>
                                                    )}
                                                    {isSavedPost ? (
                                                        <div 
                                                            onClick={() => handleUnsavedPost(post._id)}
                                                            className='text-sm hover:bg-gray-300 p-1.5 w-full rounded-sm cursor-pointer'
                                                        >
                                                            Unsave post
                                                        </div>
                                                    ) : (
                                                        <div 
                                                            onClick={() => handleSavePost(post._id)}
                                                            className='text-sm hover:bg-gray-300 p-1.5 w-full rounded-sm cursor-pointer'
                                                        >
                                                            Save post
                                                        </div>
                                                    )}
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

                                            {/* <AllReactions/> */}
                                        </div>
                                        <div className="absolute bottom-full  mb-2 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-center flex items-center space-x-1">
                                            {/* <SelectOneReaction/> */}
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
                    </div>
                ))}
                {openPostTextAre && <PostTextArea onClose={toggleShowPostTextArea} />}

                {openUpdateModal &&  (
                    <UpdatePostModal
                        onClose={() => setOpenUpdateModal(false)}
                        selectedPostData={selectedPostData}
                    />
                )}
        </div>
    )
}
import { Avatar, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FluentCommentEdit16Filled, MingcuteSaveLine } from '../others/CustomIcons';
import AllReactions from './AllReactions';
import ReactCommentShare from './ReactCommentShare';
import PostModal from './PostModal';
import { dummyPosts } from '../../data/dummy-post';
import SelectOneReaction from './SelectOneReaction';

export default function Posts() {
    const [openPostModal, setOpenPostModal] = useState<boolean>(false);
    // const [totalOfComment, setTotalOfComment] = useState<number>(0);
    // const [totalOfReply, setTotalOfReply] = useState<number>(0);
    const [selectedPost, setSelectedPost] = useState<string>('');
    const handlePostModal = (postId: string) => {
        setSelectedPost(postId)
        setOpenPostModal(!openPostModal)
    }
    console.log("Selected Post ID: ", selectedPost)
    console.log("All post: ", dummyPosts)

    const allPost = dummyPosts.slice(0,5)

    return (
        <div className='flex flex-col pb-3 space-y-2 lg:space-y-3'>
        {allPost.map((post) => {
            const totalCommets = post.comments.length;
            const totolReplies = post.comments.reduce((acc, comment) => acc + (comment.replies?.length || 0), 0);
            let totalCommentsAndReplies: number = totalCommets + totolReplies;
            return (
                
        <div key={post.postId} className='w-full'>
            <div className='bg-lightWhite p-3 rounded'>
                {/* Profile and more option */}
                <div className='mb-1'>
                    <div className="flex justify-between">
                        <div className='flex items-center space-x-3'>
                            <Avatar
                                sx={{ width: 38, height: 38 }}
                                alt="Remy Sharp"
                                src={post.authorAvatarUrl}
                            />
                            <div className='flex flex-col'>
                                <span className='text-sm font-semibold text-black'>{post.firstName} {post.middleName} {post.lastName}</span>
                                <span className='text-xs text-slate-600'>9m ago</span>
                            </div>
                        </div>
                        <div>
                            <Tooltip title="Show more">
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                {/* Post content */}
                <div className=''>
                    <div className="flex">
                        <div className="my-2">
                            <span className='text-sm'>{post.captionPost}</span>
                        </div>
                    </div>
                </div>
                <ReactCommentShare 
                    // totalCommets={totalCommets} 
                    // totolReplies={totolReplies} 
                    post={post}
                />
                <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
                {/* react, comment */}
                <div className='pt-1'>
                    <div className='w-full flex justify-between'>
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
                        <div 
                            className='w-1/3 flex items-center justify-center space-x-1 cursor-pointer relative group p-1.5 rounded-full hover:bg-slate-200'
                            onClick={() => handlePostModal(post.postId)}
                        >
                            <FluentCommentEdit16Filled className='text-lg'/>
                            <span className='text-sm font-medium text-slate-500'>Comment</span>
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
    )
    })}
    {/* { openPostModal && 
        <PostModal 
            selectedPost={selectedPost} 
            onClose={() => handlePostModal('')} 
        />} */}
    </div>
    )
}

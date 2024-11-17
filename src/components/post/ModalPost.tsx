import React, { useEffect, useRef, useState } from 'react'
import { useAddCommentToPostMutation, useAddReplyToCommentMutation, useGetPostByIdQuery } from '../../features/posts/postsApiSlice';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TimeAgoPost from './TimeAgoPost';
import { FluentSend28Filled, FluentSend28FilledColored, MiOptionsVertical } from '../others/CustomIcons';
import ReactCommentShare from './ReactCommentShare';
import Reactions from './Reactions';
import SelectOneReaction from './SelectOneReaction';
import PostOptions from './PostOptions';
import CommentOptions from './CommentOptions';

interface PostModalInterface {
    onClose: () => void;
    selectedPost: string | null;
    // selectedPostData: Post | undefined;
    userId: string | undefined;
    
    // setSelectedPostId: string | undefined;
    // isSavedPost: boolean;
    // setSelectedPostId: (postId: string) => void;
    // selectedPostId: string | null;
    
}

interface CommentDetails {
    commentId: string;
    firstName: string;
    middleName: string | undefined;
    lastName: string;
}

export default function ModalPost({ onClose, selectedPost, userId,  }: PostModalInterface) {

    const { data: post, error: errorPost, isLoading: isLoadingPost, refetch: refreshPost } = useGetPostByIdQuery(selectedPost!, {
        skip: !selectedPost, // skip the query if postId is falsy (undefined/null).
    });
    const [addCommentToPost, { isLoading: isLoadingAddCommentToPost, isError: isErrorAddCommentToPost, error: errorAddCommentToPost }] = useAddCommentToPostMutation()
    const [addReplyToComment, { isLoading: isLoadingAddReplyToComment, isError: isErrorAddReplyToComment, error: errorAddReplyToComment }] = useAddReplyToCommentMutation()

    const [replyComment, setReplyComment] = useState<string>('')
    const [isReplyToComment, setIsReplyToComment] = useState<boolean>(false)
    const [commentDetails, setCommentDetails] = useState<CommentDetails>({
        commentId: '',
        firstName: '',
        middleName: '',
        lastName: ''
    })
    // const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    // const [openOption, setOpenOption] = useState<boolean>(false);
    const [isOpenCommentOptions, setIsOpenCommentOptions] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    console.log("MY ID:", userId)
    console.log("IS UPDATE: ", isUpdate)

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

    useEffect(() => {
        if (selectedPost) {
            refreshPost();
        }
    }, [selectedPost, refreshPost]);

    useEffect(() => {
      // prevent scrolling when the modal is open
        document.body.style.overflow = 'hidden';
        return () => {
          // restore body scroll behavior when modal is closed
            document.body.style.overflow = '';
        };
    }, []);

    const postId = post?._id
    const handleComment = async () => {
        if(replyComment.length == 0) return
        if(isReplyToComment) {
            try {
                await addReplyToComment({commentId: commentDetails.commentId, userId, reply: replyComment})
                refreshPost()
                setReplyComment('');
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await addCommentToPost({postId, commenterId: userId, comment: replyComment})
                refreshPost()
                setReplyComment('');
            } catch (error) {
                console.log(error)
            }
        }
        setIsReplyToComment(false)
    }

    const handleReply = async (commentId: string, firstName: string, middleName: string | undefined, lastName: string) => {
        setIsReplyToComment(true)
        setCommentDetails({
            commentId,
            firstName,
            middleName: middleName ?? '',
            lastName
        });
        
        textareaRef.current?.focus();
    }

    const handelCloseReply = () => {
        setIsReplyToComment(false)
        setCommentDetails({
            commentId: '',
            firstName: '',
            middleName: '',
            lastName: ''
        });
        setReplyComment('')
    }

    const handleOption = (postId: string) => {
        console.log("POST ID: ", postId)
        // setOpenOption(true)
    }

    const handleCommentOptions = (commentId: string, authorCommentId: string) => {
        setIsOpenCommentOptions(true)
        console.log("COMMENT ID: ", commentId)
        console.log("AUTHOR OF THE COMMENT ID: ", authorCommentId)
        if(authorCommentId === userId) {
            setIsUpdate(true)
        } else { 
            setIsUpdate(false)
        }
    }

    if (isLoadingPost) return <div>Loading posts...</div>;
    if (errorPost) return <div>Error loading posts</div>;
    if (!post) return <div>No posts available</div>;

    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center w-full h-full overflow-y-auto"
            // onClick={handleOverlayClick}
            // onClick={onClose}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* header: name of post and close btn */}
                    <div className="flex items-center justify-between px-3 py-2.5 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h4 className="text-base font-semibold text-center text-black dark:text-white">
                            {post?.authorId.firstName} {post?.authorId.middleName} {post?.authorId.lastName}'s Post
                        </h4>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="px-3 py-2 md:p-5">
                        {/* user avatar and name */}
                        <div className="mb-1">
                            <div className="flex justify-between ">
                                <div className="flex items-center space-x-3">
                                    <Avatar
                                        sx={{ width: 38, height: 38 }}
                                        alt={post?.authorId.username}
                                        src={post?.authorId.avatarUrl}
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-black">
                                            {post?.authorId.firstName} {post?.authorId.middleName} {post?.authorId.lastName}
                                        </span>
                                        <span className="text-xs text-slate-600">
                                            <TimeAgoPost 
                                                timeStamp={post?.createdAt}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <Tooltip title="Show more">
                                    <IconButton
                                        onClick={() => handleOption(post._id)}
                                        // onClick={handleOption}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </Tooltip>
                                {/* {selectedPostId === post._id && (
                                    <PostOptions
                                        post={post}
                                        userId={userId} 
                                        isSavedPost={isSavedPost}
                                        setSelectedPostId={setSelectedPostId}
                                    />
                                )} */}
                                {/* {isOpenCommentOptions && (
                                    <CommentOptions
                                    />
                                )} */}
                            </div>
                        </div>

                        {/* Post content */}
                        <div className="">
                            <div className="flex">
                                <div className="my-2">
                                <span className="text-sm">
                                    {post?.captionPost.split('\n').map((line, index) => (
                                        <span key={index} className='text-base'>
                                            {line}
                                            {index < post?.captionPost.split('\n').length - 1 && <br />}
                                        </span>
                                    ))}
                                </span>
                                </div>
                            </div>
                        </div>

                        {/* numbers of react, comment, and share */}
                        <ReactCommentShare 
                                post={post}
                        />
                        <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
                        {/* react, comment, share */}
                        <div className='pt-1'>
                            <div  className='w-full flex justify-between'>
                                <div 
                                    className='w-1/3 flex items-center justify-center space-x-1 relative group rounded-full hover:bg-slate-200 cursor-pointer'
                                >
                                    <div className='space-x-2 block h-[26px]'>
                                        <Reactions
                                            post={post}
                                        />
                                    </div>
                                    <div 
                                        className={`absolute bottom-full  mb-2 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-center flex items-center space-x-1`}
                                    >
                                        <SelectOneReaction 
                                            postId={post._id}
                                        />
                                    </div>
                                </div>
                                <div className='w-1/3 flex items-center justify-center'>
                                    <div 
                                        data-dropdown-toggle="mega-menu-dropdown"
                                        className='w-full flex items-center justify-center space-x-1 cursor-pointer relative group p-1.5 rounded-full hover:bg-slate-200'
                                    >
                                        <span className='text-sm font-medium text-slate-500'>
                                            Comment
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
                        <div className='py-1.5'>
                            <div className="flex flex-col">
                                <div className='overflow-y-auto max-h-[300px]'>
                                    {/* comments */}
                                    {post?.comments.map(comment => (
                                        <div key={comment._id} className="w-full flex space-x-1 py-1">
                                            <div className="flex py-1">
                                                <Avatar
                                                    sx={{ width: 38, height: 38 }}
                                                    alt={comment.from.username}
                                                    src={comment.from.avatarUrl}
                                                />
                                            </div>
                                            <div>
                                                <div className='flex justify-between relative'>
                                                    <div className="w-full flex flex-col flex-grow cursor-pointer bg-slate-200 rounded-lg py-1.5 px-2.5">
                                                        <span className="text-sm font-semibold text-black">
                                                            {comment.from.firstName} {comment.from.middleName} {comment.from.lastName}
                                                        </span>
                                                        <span className="w-full flex text-sm text-black xl:text-sm">
                                                            {comment.comment.split('\n').map((line, index) => (
                                                                <span key={index}>
                                                                    {line}
                                                                    {index < comment.comment.split('\n').length - 1 && <br />}
                                                                </span>
                                                            ))}
                                                        </span>
                                                    </div>
                                                    {/* <div className='relative'> */}
                                                        <div className='flex items-center p-1.5'>
                                                            <MiOptionsVertical className='text-sm cursor-pointer' onClick={() => handleCommentOptions(comment._id, comment.from._id)}/>
                                                        </div>
                                                        {isOpenCommentOptions && (
                                                            <CommentOptions
                                                                isUpdate={isUpdate}
                                                            />
                                                        )}
                                                    {/* </div> */}
                                                </div>
                                                <div className="flex space-x-5 px-2.5">
                                                    <div className="text-xs">
                                                        <span>
                                                            <TimeAgoPost 
                                                                timeStamp={comment.createdAt}
                                                            />
                                                        </span>
                                                    </div>
                                                    <div className="text-xs">
                                                        <span className='cursor-pointer'>Like</span>
                                                    </div>
                                                    <div className="text-xs">
                                                        <span className='cursor-pointer' onClick={() => handleReply(comment._id, comment.from.firstName, comment.from.middleName, comment.from.lastName)}>Reply</span>
                                                    </div>
                                                </div>
                                                {/* replies comment */}
                                                <div className=''>
                                                    {comment.replies.map(reply => (
                                                        <div key={reply._id} className="w-full flex space-x-1 py-1">
                                                            <div className="flex py-1">
                                                                <Avatar
                                                                    sx={{ width: 38, height: 38 }}
                                                                    alt={reply.userId.username}
                                                                    src={reply.userId.avatarUrl}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className='flex justify-between'>
                                                                    <div className="w-full flex flex-col flex-grow cursor-pointer bg-slate-200 rounded-lg py-1.5 px-2.5">
                                                                        <span className="text-sm font-semibold text-black">
                                                                            {reply.userId.firstName} {reply.userId.middleName} {reply.userId.lastName}
                                                                        </span>
                                                                        <span className="w-full flex text-sm text-black xl:text-sm">
                                                                            {reply.comment}
                                                                        </span>
                                                                    </div>
                                                                    <div className='flex items-center p-1.5'>
                                                                        <MiOptionsVertical className='text-sm' onClick={() => handleCommentOptions(reply._id, reply.userId._id)}/>
                                                                    </div>
                                                                </div>
                                                                <div className="flex space-x-5 px-2.5">
                                                                    <div className="text-xs">
                                                                        <TimeAgoPost 
                                                                            timeStamp={reply.createdAt}
                                                                        />
                                                                    </div>
                                                                    <div className="text-xs">
                                                                        <span className='cursor-pointer'>Like</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* textarea for comment and reply */}
                            <div className='flex flex-col space-y-1.5 pt-2.5'>
                                {isReplyToComment && (
                                    <div className='flex space-x-2'>
                                        <p className='text-xs cursor-pointer'>Replying to <span className='font-bold'>{commentDetails.firstName} {commentDetails.middleName} {commentDetails.lastName}</span> - <span onClick={handelCloseReply}>Cancel</span></p>
                                    </div>
                                )}
                                <div className="relative flex items-center">
                                    <textarea 
                                        ref={textareaRef}
                                        rows={1}
                                        cols={30}
                                        onChange={(e) => setReplyComment(e.target.value)}
                                        placeholder="Write a comment..."
                                        value={replyComment}
                                        className="w-full p-2 rounded-md border outline-none resize-none overflow-y-auto bg-gray-200 dark:bg-gray-700 text-sm"
                                    />
                                    <div className="absolute right-0 pr-3 flex items-center h-full">
                                        {replyComment.length !== 0 ? (
                                            <FluentSend28FilledColored 
                                                className="text-base cursor-pointer" 
                                                onClick={handleComment}
                                            />
                                        ) : (
                                            <FluentSend28Filled
                                                className="text-base cursor-pointer" 
                                                onClick={handleComment}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

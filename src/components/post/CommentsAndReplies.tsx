import React, { useEffect, useRef, useState } from 'react'
import { Post } from '../../interface/your-posts';
import { useAddCommentToPostMutation, useAddOrRemoveHeartToCommentMutation, useAddOrRemoveHeartToReplyMutation, useAddReplyToCommentMutation } from '../../features/posts/postsApiSlice';
import { Avatar } from '@mui/material';
import { FluentSend28Filled, FluentSend28FilledColored, MiOptionsVertical, NotoOrangeHeart } from '../others/CustomIcons';
import CommentOptions from './CommentOptions';
import TimeAgoPost from './TimeAgoPost';
import UpdateCommentTextArea from './UpdateCommentTextArea';
import { Link } from 'react-router-dom';
import { showErrorToast, showLoadingToast } from '../utils/ToastUtils';
import { toast } from 'react-toastify';
import socketSetup from '../../socket-io/socket-setup';

interface CommentDetails {
    commentId: string;
    firstName: string;
    middleName: string | undefined;
    lastName: string;
}

interface PropsPost {
    post: Post;
    userId: string | undefined
    selectedPost: string | null;
    postId: string
    refetch: () => Promise<any>;
}

export default function CommentsAndReplies({ userId, selectedPost, postId, post, refetch }: PropsPost) {

    const [addCommentToPost, { isLoading: isLoadingAddCommentToPost, isError: isErrorAddCommentToPost, error: errorAddCommentToPost }] = useAddCommentToPostMutation()
    const [addReplyToComment, { isLoading: isLoadingAddReplyToComment, isError: isErrorAddReplyToComment, error: errorAddReplyToComment }] = useAddReplyToCommentMutation()
    const [addOrRemoveHeartToComment, { isLoading: isLoadingReactionToComment, isError: isErrorReactionToComment, error: errorReactionToComment }] = useAddOrRemoveHeartToCommentMutation()
    const [addOrRemoveHeartToReply, { isLoading: isLoadingReactionToReply, isError: isErrorReactionToReply, error: errorReactionToReply }] = useAddOrRemoveHeartToReplyMutation()

    useEffect(() => {
        if (isLoadingAddCommentToPost || isLoadingAddReplyToComment || isLoadingReactionToComment || isLoadingReactionToReply) {
            const loadingToast = showLoadingToast("Processing request...");
    
          return () => toast.dismiss(loadingToast); // Cleanup the toast when loading stops
        }
    }, [isLoadingAddCommentToPost, isLoadingAddReplyToComment, isLoadingReactionToComment, isLoadingReactionToReply]);

    useEffect(() => {
        if (isErrorAddCommentToPost) showErrorToast("Failed to add comment.");
        if (isErrorAddReplyToComment) showErrorToast("Failed to add reply.");
        if (isErrorReactionToComment) showErrorToast("Failed to react to comment.");
        if (isErrorReactionToReply) showErrorToast("Failed to react to reply.");
    }, [isErrorAddCommentToPost, isErrorAddReplyToComment, isErrorReactionToComment, isErrorReactionToReply]);
    
    const [replyComment, setReplyComment] = useState<string>('')
    const [isReplyToComment, setIsReplyToComment] = useState<boolean>(false)
    const [commentDetails, setCommentDetails] = useState<CommentDetails>({
        commentId: '',
        firstName: '',
        middleName: '',
        lastName: ''
    })
    const [isOpenCommentOptionsId, setIsOpenCommentOptionsId] = useState<string | null>(null);
    const [isOpenCommentOption, setIsOpenCommentOption] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isUpdatingComment, setIsUpdatingComment] = useState<boolean>(false);
    const [commentIdUpdating, setCommentIdUpdating] = useState<string | null>(null);
    const [replyCommentId, setReplyCommentId] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // const postId = post?._id
    const handleComment = async () => {
        if(replyComment.length === 0) return
        if(isReplyToComment) {
            try {
                await addReplyToComment({commentId: commentDetails.commentId, userId, reply: replyComment})
                refetch()
                setReplyComment('');
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await addCommentToPost({postId, commenterId: userId, comment: replyComment})
                refetch()
                setReplyComment('');
                socketSetup.emit('addCommentToPost', userId);
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

    const handleCommentOptions = (typeOfOption: string, postAuthorId: string, commentId: string, authorCommentId: string, commentText: string) => {

        if(!commentId || !authorCommentId) return

        if(typeOfOption === 'comment') {
            setIsOpenCommentOption(true)
            setIsOpenCommentOptionsId(commentId === isOpenCommentOptionsId ? null : commentId);
            setReplyCommentId('')
            if(authorCommentId === userId) {
                setIsUpdate(true)
                setIsDelete(true)
            } 
            if(postAuthorId ===  userId) { 
                setIsDelete(true)
            }
        } else if(typeOfOption === 'reply') {
            setIsOpenCommentOption(true)
            setReplyCommentId(commentId)
            setIsOpenCommentOptionsId('')
            if(authorCommentId === userId){
                setIsUpdate(true)
                setIsDelete(true)
            } 
            if(postAuthorId ===  userId) { 
                setIsDelete(true)
            }
        } else {
            setIsUpdate(false)
            setIsDelete(false)
            console.log("Unknown type of option")
        }
        
    }


    useEffect(() => {
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = 'auto'; // Reset height to auto to shrink when text is deleted
            const maxHeight = 200;
            const minHeight = 70;
            
            textarea.style.height = 'auto'; // Reset height to auto to shrink when text is deleted
            // textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`; // Set height, respecting maxHeight

            textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight)}px`; // Set height, respecting min and max height
        }
    }, [replyComment]);

    const commentReplyReaction = async (typeOfReaction: string, commentId: string, replyId: string) => {
        if(!typeOfReaction) return
        if(typeOfReaction === 'commentReaction'){
            await addOrRemoveHeartToComment({commentId, userId})
        }
        if(typeOfReaction === 'replyReaction') {
            await addOrRemoveHeartToReply({commentId, replyId, userId})
        }
        refetch()
    }

    return (
        <>
        <div className="flex flex-col">
            <div className='overflow-y-auto max-h-[300px]'>
                {/* comments */}
                {post?.comments.map(comment => (
                    <div key={comment._id} className="w-full flex space-x-1 py-1">
                        <div className="flex py-1">
                            <Link 
                                to={`/profile/${comment.from.username}/${comment.from._id}`}
                            >
                                <Avatar
                                    sx={{ width: 38, height: 38 }}
                                    alt={comment.from.username}
                                    src={comment.from.avatarUrl}
                                />
                            </Link>
                        </div>
                        <div className='w-full'>
                            {isUpdatingComment && commentIdUpdating === comment._id ? (
                                <UpdateCommentTextArea
                                    typeOfUpdate={'comment'}
                                    // comment={comment}
                                    commentId={comment._id}
                                    replyId={''}
                                    comment={comment.comment}
                                    userId={userId}
                                    setIsUpdatingComment={setIsUpdatingComment}
                                    setIsOpenCommentOption={setIsOpenCommentOption}
                                    postId={postId}
                                />
                            ) : (
                                <>
                                    <div className='flex justify-between relative w-fit'>
                                        <div className="flex flex-col flex-grow cursor-pointer bg-slate-200 rounded-lg py-1.5 px-2.5">
                                            <Link
                                                to={`/profile/${comment.from.username}/${comment.from._id}`}
                                            >
                                                <span className="text-sm font-semibold text-black">
                                                    {comment.from.firstName} {comment.from.middleName} {comment.from.lastName}
                                                </span>
                                            </Link>
                                            <div className=" flex text-sm text-black xl:text-sm">
                                                <div>
                                                    {comment.comment.split('\n').map((line, index) => (
                                                        <span key={index}>
                                                            {line}
                                                            {index < comment.comment.split('\n').length - 1 && <br />}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center p-1.5'>
                                            <MiOptionsVertical 
                                                className='text-sm cursor-pointer' 
                                                onClick={() => handleCommentOptions('comment', post.authorId._id, comment._id, comment.from._id, comment.comment)}
                                                />
                                        </div>
                                        {isOpenCommentOption && isOpenCommentOptionsId === comment._id && (
                                            <CommentOptions
                                                isUpdate={isUpdate}
                                                isDelete={isDelete}
                                                postId={postId}
                                                setIsUpdatingComment={setIsUpdatingComment}
                                                setCommentIdUpdating={setCommentIdUpdating}
                                                commentId={comment._id}
                                                replyId={''}
                                                userId={userId}
                                                setIsOpenCommentOption={setIsOpenCommentOption}
                                                // parentRef={commentRef}
                                                typeOfUpdate={'comment'}
                                            />
                                        )}
                                    </div>
                                    <div className="flex space-x-3 px-2.5">
                                        <div className="text-xs">
                                            <span>
                                                <TimeAgoPost 
                                                    timeStamp={comment.createdAt}
                                                />
                                            </span>
                                        </div>
                                        <div className="text-xs">
                                            <span 
                                                className='cursor-pointer'
                                                onClick={() => commentReplyReaction('commentReaction', comment._id, '')}
                                            >Heart</span>
                                        </div>
                                        <div className="text-xs">
                                            <span 
                                                className='cursor-pointer' 
                                                onClick={() => handleReply(comment._id, comment.from.firstName, comment.from.middleName, comment.from.lastName)}
                                            >
                                                Reply
                                            </span>
                                        </div>
                                        {comment.createdAt != comment.updatedAt &&
                                            (<div className='text-xs'>
                                                <span>
                                                    Edited
                                                </span>
                                            </div>)
                                        }
                                        { comment.heart.length !== 0 && (
                                            <div className="text-xs flex items-center">
                                                <span>{comment.heart.length}</span>
                                                <NotoOrangeHeart />
                                            </div>
                                            )
                                        }
                                    </div>
                                </>
                            )}

                            {/* replies comment */}
                            <div className='w-full'>
                                {comment.replies.map(reply => (
                                    <div key={reply._id} className="w-full flex space-x-1 py-1">
                                        <div className="flex py-1 w-fit">
                                            <Link
                                                to={`/profile/${reply.userId.username}/${reply.userId._id}`}
                                            >
                                                <Avatar
                                                    sx={{ width: 38, height: 38 }}
                                                    alt={reply.userId.username}
                                                    src={reply.userId.avatarUrl}
                                                />
                                            </Link>
                                        </div>
                                        <div className='w-full'>
                                            {isUpdatingComment && replyCommentId === reply._id ? (
                                                <UpdateCommentTextArea
                                                    typeOfUpdate={'reply'}
                                                    // comment={comment}
                                                    commentId={comment._id}
                                                    replyId={reply._id}
                                                    comment={reply.comment}
                                                    userId={userId}
                                                    setIsUpdatingComment={setIsUpdatingComment}
                                                    setIsOpenCommentOption={setIsOpenCommentOption}
                                                    postId={postId}
                                                />
                                            ) : (
                                            <>
                                                <div className='w-fit flex justify-between'>
                                                    <div className="w-full flex flex-col flex-grow cursor-pointer bg-slate-200 rounded-lg py-1.5 px-2.5">
                                                        <Link
                                                            to={`/profile/${reply.userId.username}/${reply.userId._id}`}
                                                        >
                                                            <span className="text-sm font-semibold text-black">
                                                                {reply.userId.firstName} {reply.userId.middleName} {reply.userId.lastName}
                                                            </span>
                                                        </Link>
                                                        <div className="w-full flex text-sm text-black xl:text-sm">
                                                            <div>
                                                                {reply.comment.split('\n').map((line, index) => (
                                                                    <span key={index}>
                                                                        {line}
                                                                        {index < reply.comment.split('\n').length - 1 && <br />}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center p-1.5'>
                                                        <MiOptionsVertical 
                                                            className='text-sm cursor-pointer'
                                                            onClick={() => handleCommentOptions('reply', post.authorId._id, reply._id, reply.userId._id, comment.comment)}
                                                        />
                                                    </div>
                                                    {isOpenCommentOption && replyCommentId === reply._id && (
                                                        <CommentOptions
                                                            isUpdate={isUpdate}
                                                            isDelete={isDelete}
                                                            postId={postId}
                                                            setIsUpdatingComment={setIsUpdatingComment}
                                                            setCommentIdUpdating={setCommentIdUpdating}
                                                            commentId={comment._id}
                                                            replyId={reply._id}
                                                            userId={userId}
                                                            setIsOpenCommentOption={setIsOpenCommentOption}
                                                            // parentRef={commentRef}
                                                            typeOfUpdate={'reply'}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex space-x-5 px-2.5">
                                                    <div className="text-xs">
                                                        <span>
                                                            <TimeAgoPost 
                                                                timeStamp={reply.createdAt}
                                                            />
                                                        </span>
                                                    </div>
                                                    <div className="text-xs">
                                                        <span 
                                                            className='cursor-pointer' 
                                                            onClick={() => commentReplyReaction('replyReaction', comment._id, reply._id)}
                                                        >Heart</span>
                                                    </div>
                                                    {reply.createdAt != reply.updatedAt &&
                                                        (<div className='text-xs'>
                                                            <span>
                                                                Edited
                                                            </span>
                                                        </div>)
                                                    }
                                                    { reply.heart.length !== 0 && (
                                                        <div className="text-xs flex items-center">
                                                            <span>{reply.heart.length}</span>
                                                            <NotoOrangeHeart />
                                                        </div>
                                                        )
                                                    }
                                                </div>
                                            </>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className='flex flex-col space-y-1.5 pt-2.5'>
            {isReplyToComment && (
                <div className='flex space-x-2'>
                    <p className='text-xs cursor-pointer'>Replying to <span className='font-bold'>{commentDetails.firstName} {commentDetails.middleName} {commentDetails.lastName}</span> - <span onClick={handelCloseReply}>Cancel</span></p>
                </div>
            )}
            <div className="flex justify-between bg-gray-200 dark:bg-gray-700 rounded-lg">
                <div className="w-[97%] flex flex-col flex-grow cursor-pointer bg-slate-200 rounded-lg">
                    <textarea 
                        ref={textareaRef}
                        rows={1}
                        cols={30}
                        onChange={(e) => setReplyComment(e.target.value)}
                        placeholder="Write a comment..."
                        value={replyComment}
                        className="w-full p-2 rounded-md border outline-none resize-none overflow-y-auto bg-gray-200 dark:bg-gray-700 text-sm"
                    />
                </div>
                <div className="p-2 w-[5%] flex justify-end items-center">
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
        </>
    )
}
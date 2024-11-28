import React, { useRef, useState } from 'react'
import { Post } from '../../interface/your-posts';
import { useAddCommentToPostMutation, useAddReplyToCommentMutation, useDeleteCommentToPostMutation, useUpdateCommentToPostMutation } from '../../features/posts/postsApiSlice';
import { Avatar } from '@mui/material';
import { FluentSend28Filled, FluentSend28FilledColored, MiOptionsVertical } from '../others/CustomIcons';
import CommentOptions from './CommentOptions';
import TimeAgoPost from './TimeAgoPost';
import UpdateCommentTextArea from './UpdateCommentTextArea';

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
    const [updateCommentToPost, { isLoading: isLoadingUpdateComment, isError: isErrorUpdateComment, error: errorUpdateComment }] = useUpdateCommentToPostMutation();
    const [deleteCommentToPost, { isLoading: isLoadingDeleteComment, isError: isErrorDeleteComment, error: errorDeleteComment }] = useDeleteCommentToPostMutation();



    const [addReplyToComment, { isLoading: isLoadingAddReplyToComment, isError: isErrorAddReplyToComment, error: errorAddReplyToComment }] = useAddReplyToCommentMutation()
    


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
    const [isUpdatingComment, setIsUpdatingComment] = useState<boolean>(false);
    const [commentIdUpdating, setCommentIdUpdating] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    console.log("IS UPDATING COMMENT: ", isUpdatingComment)


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
            } catch (error) {
                console.log(error)
            }
        }
        setIsReplyToComment(false)
        // try {
        //     if (isUpdatingComment) {
        //         // Update comment logic
        //         await updateCommentToPost({
        //             commentId: commentDetails.commentId,
        //             updatedComment: replyComment,
        //             userId,
        //         });
        //     } else if (isReplyToComment) {
        //         // Reply to comment logic
        //         await addReplyToComment({
        //             commentId: commentDetails.commentId,
        //             userId,
        //             reply: replyComment,
        //         });
        //     } else {
        //         // Add new comment logic
        //         await addCommentToPost({
        //             postId,
        //             commenterId: userId,
        //             comment: replyComment,
        //         });
        //     }
        //     refetch();
        //     setReplyComment('');
        // } catch (error) {
        //     console.log(error);
        // }
    
        // setIsReplyToComment(false);
        // setIsUpdatingComment(false);
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

    const handleCommentOptions = (commentId: string, authorCommentId: string, commentText: string) => {
        setIsOpenCommentOption(true)
        setIsOpenCommentOptionsId(commentId === isOpenCommentOptionsId ? null : commentId);
        
        console.log("COMMENT ID: ", commentId)
        console.log("AUTHOR OF THE COMMENT ID: ", authorCommentId)
        if(authorCommentId === userId) {
            setIsUpdate(true)
        } else { 
            setIsUpdate(false)
        }
    }

    return (
        <>
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
                        <div className='w-full'>
                            {isUpdatingComment && commentIdUpdating === comment._id ? (
                                <UpdateCommentTextArea
                                    comment={comment}
                                    userId={userId}
                                    setIsUpdatingComment={setIsUpdatingComment}
                                    setIsOpenCommentOption={setIsOpenCommentOption}
                                    postId={postId}
                                />
                            ) : (
                                <>
                                    <div className='flex justify-between relative w-fit'>
                                        <div className="flex flex-col flex-grow cursor-pointer bg-slate-200 rounded-lg py-1.5 px-2.5">
                                            <span className="text-sm font-semibold text-black">
                                                {comment.from.firstName} {comment.from.middleName} {comment.from.lastName}
                                            </span>
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
                                                onClick={() => handleCommentOptions(comment._id, comment.from._id, comment.comment)}
                                                />
                                        </div>
                                        {isOpenCommentOption && isOpenCommentOptionsId === comment._id && (
                                            <CommentOptions
                                                isUpdate={isUpdate}
                                                postId={postId}
                                                setIsUpdatingComment={setIsUpdatingComment}
                                                setCommentIdUpdating={setCommentIdUpdating}
                                                comment={comment}
                                                userId={userId}
                                                setIsOpenCommentOption={setIsOpenCommentOption}
                                                // parentRef={commentRef}
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
                                            <span className='cursor-pointer'>Like</span>
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
                                    </div>
                                </>
                            )}

                            {/* replies comment */}
                            <div className='w-full'>
                                {comment.replies.map(reply => (
                                    <div key={reply._id} className="w-full flex space-x-1 py-1">
                                        <div className="flex py-1 w-fit">
                                            <Avatar
                                                sx={{ width: 38, height: 38 }}
                                                alt={reply.userId.username}
                                                src={reply.userId.avatarUrl}
                                            />
                                        </div>
                                        {/* <div className='w-full'> */}
                                        <div className='w-full'>
                                            <div className='w-fit flex justify-between'>
                                                <div className="w-full flex flex-col flex-grow cursor-pointer bg-slate-200 rounded-lg py-1.5 px-2.5">
                                                    <span className="text-sm font-semibold text-black">
                                                        {reply.userId.firstName} {reply.userId.middleName} {reply.userId.lastName}
                                                    </span>
                                                    <div className="w-full flex text-sm text-black xl:text-sm">
                                                        {/* {reply.comment} */}
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
                                                        className='text-sm' 
                                                        onClick={() => handleCommentOptions(reply._id, reply.userId._id, comment.comment)}
                                                    />
                                                </div>
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
                                                    <span className='cursor-pointer'>Like</span>
                                                </div>
                                            </div>


                                            {/* <div className='relative flex justify-between'>
                                                <div className="w-full flex flex-col flex-grow cursor-pointer bg-slate-200 rounded-lg py-1.5 px-2.5">
                                                    <textarea 
                                                        ref={textareaRef}
                                                        rows={1}
                                                        cols={30}
                                                        onChange={(e) => setReplyComment(e.target.value)}
                                                        onInput={(e) => {
                                                            const target = e.target as HTMLTextAreaElement;
                                                            target.style.height = 'auto'; // reset height to auto to calculate new height
                                                            target.style.height = `${target.scrollHeight}px`; // set height based on scrollHeight
                                                        }}
                                                        placeholder="Write a comment..."
                                                        value={replyComment}
                                                        className="w-full p-2 rounded-md border outline-none resize-none overflow-y-auto bg-gray-200 dark:bg-gray-700 text-sm"
                                                    />
                                                </div>
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
                                            <div className="flex space-x-5 px-2.5">
                                                <div className="text-xs">
                                                    <p className='cursor-pointer'>Press Ecs to <span className='font-semibold'>cancel</span></p>
                                                </div>
                                            </div> */}
                                            
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
        </>
    )
}
import React, { useRef, useState } from 'react'
import { useAddCommentToPostMutation, useDeleteAddReplyToCommentMutation, useDeleteCommentToPostMutation, useGetPostByIdQuery, useUpdateCommentToPostMutation } from '../../features/posts/postsApiSlice';

interface PropsCommentOptions {
    isUpdate: boolean;
    isDelete: boolean;
    postId: string;
    setIsUpdatingComment: (value: boolean) => void;
    setCommentIdUpdating: (value: string) => void;
    commentId: string;
    replyId: string;
    userId?: string;
    setIsOpenCommentOption: (value: boolean) => void;
    typeOfUpdate: string
}

export default function CommentOptions({ userId, isUpdate, isDelete, postId, setIsUpdatingComment, setCommentIdUpdating, commentId, replyId, setIsOpenCommentOption, typeOfUpdate }: PropsCommentOptions) {

    const [position, setPosition] = useState({ top: 0, left: 0 });
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [addCommentToPost, { isLoading: isLoadingAddCommentToPost, isError: isErrorAddCommentToPost, error: errorAddCommentToPost }] = useAddCommentToPostMutation()
    const [updateCommentToPost, { isLoading: isLoadingUpdateComment, isError: isErrorUpdateComment, error: errorUpdateComment }] = useUpdateCommentToPostMutation();
    const [deleteCommentToPost, { isLoading: isLoadingDeleteComment, isError: isErrorDeleteComment, error: errorDeleteComment }] = useDeleteCommentToPostMutation();

    const [deleteAddReplyToComment, { isLoading: isLoadingDeleteReply, isError: isErrorDeleteReply, error: errorDeleteReply }] = useDeleteAddReplyToCommentMutation();

    const { data: post, error: errorPost, isLoading: isLoadingPost, refetch: refreshPost } = useGetPostByIdQuery(postId!,{
        skip: !postId, // skip the query if postId is falsy (undefined/null).
    });

    const handleUpdateComment = () => {
        if(typeOfUpdate === 'comment') {
            setIsUpdatingComment(true)
            setCommentIdUpdating(commentId)
        } else if (typeOfUpdate === 'reply') {
            setIsUpdatingComment(true)
            setCommentIdUpdating(commentId)
        }
    }

    const handleDeleteComment = async (commentId: string) => {
        console.log("REPLY ID: ", replyId)
        if (!commentId || !userId) {
            alert('Missing required parameters.')
            return;
        }
    
        try {
            if(typeOfUpdate === 'comment'){
                await deleteCommentToPost({ commentId, userId }).unwrap(); 
                refreshPost()
                setIsOpenCommentOption(false)
            } else if (typeOfUpdate === 'reply'){
                await deleteAddReplyToComment({ commentId, replyId, userId }).unwrap();
                refreshPost()
                setIsOpenCommentOption(false)
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    }

    const handleCloseCommentModal = () => {
        setIsOpenCommentOption(false)
    }

    return (
        <div  className='fixed inset-0 z-51 drop-shadow-2xl flex items-center justify-center w-full h-full overflow-y-auto'>
            <div className='relative w-fit'>
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                    <div className='flex items-center justify-between p-1.5 px-3 border-b rounded-t dark:border-gray-600'>
                        <p className='text-sm font-medium'>Update</p>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-2.5 h-2.5 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={handleCloseCommentModal}
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
                    <div className="flex flex-col bg-white p-2.5 w-fit rounded shadow-lg">
                        {isUpdate && (
                            <span 
                                className='text-sm p-1 hover:bg-gray-200 rounded cursor-pointer' 
                                onClick={handleUpdateComment}
                            >
                                Edit comment
                            </span>
                        )}
                        {isDelete && (
                            <span 
                                className='text-sm p-1 hover:bg-gray-200 rounded cursor-pointer' 
                                onClick={() => handleDeleteComment(commentId)}
                            >
                                Delete comment
                            </span>
                        )}
                        <span 
                            className='text-sm p-1 hover:bg-gray-200 rounded cursor-pointer'
                        >
                            Report comment
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
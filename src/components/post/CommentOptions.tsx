import React, { useRef, useState } from 'react'
import { useAddCommentToPostMutation, useDeleteAddReplyToCommentMutation, useDeleteCommentToPostMutation, useGetPostByIdQuery, useUpdateCommentToPostMutation } from '../../features/posts/postsApiSlice';
import { FlatColorIconsFullTrash, FluentColorDocumentEdit20, FluentColorWarning20 } from '../others/CustomIcons';
import ConfirmAlert from '../alert/ConfirmAlert';
import { toast } from 'react-toastify';
import { showToast } from '../utils/ToastUtils';

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

    const [deleteCommentToPost, { isLoading: isLoadingDeleteComment, isError: isErrorDeleteComment, error: errorDeleteComment }] = useDeleteCommentToPostMutation();
    const [deleteAddReplyToComment, { isLoading: isLoadingDeleteReply, isError: isErrorDeleteReply, error: errorDeleteReply }] = useDeleteAddReplyToCommentMutation();
    const { data: post, error: errorPost, isLoading: isLoadingPost, refetch: refreshPost } = useGetPostByIdQuery(postId!,{
        skip: !postId, // skip the query if postId is falsy (undefined/null).
    });
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

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
        if (!commentId || !userId) {
            alert('Missing required parameters.')
            return;
        }
        setShowDeleteModal(true)
    }

    const handleCloseCommentModal = () => {
        setIsOpenCommentOption(false)
    }

    const handleConfirmDeleteComment = async () => {
        try {
            if(typeOfUpdate === 'comment'){
                await deleteCommentToPost({ commentId, userId }).unwrap(); 
                refreshPost()
            } else if (typeOfUpdate === 'reply'){
                await deleteAddReplyToComment({ commentId, replyId, userId }).unwrap();
                refreshPost()
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert(error);
        }
        setIsOpenCommentOption(false)
    }

    const handleCancelDeleteComment = () => {
        setShowDeleteModal(false)
        setIsOpenCommentOption(false)
    }

    const handleReportComment = () => {
        showToast("Ongoing development", "warning")
    }

    return (
        <div  className='fixed inset-0 z-51 drop-shadow-2xl flex items-center justify-center w-full h-full overflow-y-auto'>
            <div className='relative w-fit'>
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                    <div className='flex items-center justify-between p-1.5 px-3 border-b rounded-t dark:border-gray-600'>
                        <p className='text-sm font-medium'>Update</p>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-7 h-7 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={handleCloseCommentModal}
                        >
                            <svg
                                className="w-2 h-2"
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
                                className='text-sm flex items-center space-x-2 p-1 hover:bg-gray-200 rounded cursor-pointer' 
                                onClick={handleUpdateComment}
                            >
                                <span className='text-[20px]'>
                                    <FluentColorDocumentEdit20/>
                                </span>
                                <span>Edit comment</span>
                            </span>
                        )}
                        {isDelete && (
                            <span 
                                className='text-sm flex items-center space-x-2 p-1 hover:bg-gray-200 rounded cursor-pointer' 
                                onClick={() => handleDeleteComment(commentId)}
                            >
                                <span className='text-[20px]'>
                                    <FlatColorIconsFullTrash/>
                                </span>
                                <span>Delete comment</span>
                            </span>
                        )}
                        <span 
                            className='text-sm flex items-center space-x-2 p-1 hover:bg-gray-200 rounded cursor-pointer' 
                            onClick={handleReportComment}
                        >
                            <span className='text-[20px]'>
                                <FluentColorWarning20/>
                            </span>
                            <span>Report</span>
                        </span>
                    </div>
                </div>
            </div>
            {showDeleteModal && (
                <ConfirmAlert
                    message='Are you sure you want to delete this comment?'
                    onConfirm={handleConfirmDeleteComment}
                    onCancel={handleCancelDeleteComment}
                />
            )}
        </div>
    )
}
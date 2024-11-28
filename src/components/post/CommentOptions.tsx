import React, { RefObject, useEffect, useRef, useState } from 'react'
import { useAddCommentToPostMutation, useDeleteCommentToPostMutation, useGetPostByIdQuery, useUpdateCommentToPostMutation } from '../../features/posts/postsApiSlice';
import { PostComment } from '../../interface/your-posts';

interface PropsCommentOptions {
    isUpdate: boolean;
    // parentRef: RefObject<HTMLDivElement>;
    postId: string;
    setIsUpdatingComment: (value: boolean) => void;
    setCommentIdUpdating: (value: string) => void;
    comment: PostComment;
    userId?: string;
    setIsOpenCommentOption: (value: boolean) => void;
}

export default function CommentOptions({ userId, isUpdate, postId, setIsUpdatingComment, setCommentIdUpdating, comment, setIsOpenCommentOption }: PropsCommentOptions) {

    const [position, setPosition] = useState({ top: 0, left: 0 });
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [addCommentToPost, { isLoading: isLoadingAddCommentToPost, isError: isErrorAddCommentToPost, error: errorAddCommentToPost }] = useAddCommentToPostMutation()
    const [updateCommentToPost, { isLoading: isLoadingUpdateComment, isError: isErrorUpdateComment, error: errorUpdateComment }] = useUpdateCommentToPostMutation();
    const [deleteCommentToPost, { isLoading: isLoadingDeleteComment, isError: isErrorDeleteComment, error: errorDeleteComment }] = useDeleteCommentToPostMutation();
    const { data: post, error: errorPost, isLoading: isLoadingPost, refetch: refreshPost } = useGetPostByIdQuery(postId!,{
        skip: !postId, // skip the query if postId is falsy (undefined/null).
    });

    const handleUpdateComment = () => {
        setIsUpdatingComment(true)
        setCommentIdUpdating(comment._id)
    }

    const handleDeleteComment = async (commentId: string) => {
        if (!commentId || !userId) {
            console.log("Missing required parameters.");
            return;
        }
    
        try {
            await deleteCommentToPost({ commentId, userId }).unwrap(); // Unwrap to handle errors directly
            refreshPost()
            setIsOpenCommentOption(false)
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    }

    // useEffect(() => {
    //     if (parentRef.current && dropdownRef.current) {
    //         const parentRect = parentRef.current.getBoundingClientRect();
    //         const dropdownRect = dropdownRef.current.getBoundingClientRect();
    //         const viewportHeight = window.innerHeight;
    //         const viewportWidth = window.innerWidth;

    //         // Calculate dropdown position dynamically
    //         const fitsBelow = viewportHeight - parentRect.bottom > dropdownRect.height;
    //         const fitsAbove = parentRect.top > dropdownRect.height;
    //         const fitsRight = viewportWidth - parentRect.right > dropdownRect.width;
    //         const fitsLeft = parentRect.left > dropdownRect.width;

    //         setPosition({
    //             top: fitsBelow ? parentRect.bottom : fitsAbove ? parentRect.top - dropdownRect.height : parentRect.bottom,
    //             left: fitsRight ? parentRect.right - dropdownRect.width : fitsLeft ? parentRect.left : parentRect.left,
    //         });
    //     }
    // }, [parentRef]);

    return (
        // <div className='absolute top-[45px] right-[-60px] z-[2]'>
        <div 
            ref={dropdownRef}
            style={{
                position: 'absolute',
                top: `${position.top}px`,
                left: `${position.left}px`,
                zIndex: 2,
            }}
            className='bg-white drop-shadow-lg p-2 flex flex-col items-start border-[1px] rounded'
        >
            {/* <div className='bg-white drop-shadow-lg p-2 flex flex-col items-start border-[1px] rounded'> */}
                <div className='flex flex-col w-[130px]'>
                    {isUpdate && (
                        <span 
                            className='text-sm p-1 hover:bg-gray-200 rounded' 
                            onClick={handleUpdateComment}
                        >
                            Edit comment
                        </span>
                    )}
                        <span 
                            className='text-sm p-1 hover:bg-gray-200 rounded'
                            onClick={() => handleDeleteComment(comment._id)}
                        >
                            Delete comment
                        </span>
                        <span 
                            className='text-sm p-1 hover:bg-gray-200 rounded'
                        >
                            Report comment
                        </span>
                </div>
            {/* </div> */}
        </div>
    )
}
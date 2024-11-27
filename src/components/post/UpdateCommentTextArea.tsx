import React, { useEffect, useRef, useState } from 'react'
import { CommentFrom, PostComment } from '../../interface/your-posts';
import { FluentSend28Filled, FluentSend28FilledColored } from '../others/CustomIcons';
import { useUpdateCommentToPostMutation } from '../../features/posts/postsApiSlice';

interface PropsUpdateCommentTextArea {
    comment: PostComment;
    userId?: string
    setIsUpdatingComment: (isUpdatingComment: boolean) => void;
    setIsOpenCommentOption: (value: boolean) => void;
}

export default function UpdateCommentTextArea({ comment, userId, setIsUpdatingComment, setIsOpenCommentOption }: PropsUpdateCommentTextArea) {

    const [updateCommentToPost, { isLoading: isLoadingUpdateComment, isError: isErrorUpdateComment, error: errorUpdateComment }] = useUpdateCommentToPostMutation();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [commentContext, setCommentContext] = useState<string>(comment.comment);

    const handleCommentUpdate = async () => {
        try {
            // await updateCommentToPost
            await updateCommentToPost({
                commentId: comment._id,
                updatedComment: commentContext,
                userId,
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleCancelUpdateComment = () => {
        setIsUpdatingComment(false)
        setIsOpenCommentOption(false)
    }

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target;
        setCommentContext(target.value);

        // Reset height to auto for recalculating
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;

        // Set height based on scrollHeight, but with a max height
        // target.style.height = `${Math.min(target.scrollHeight, 300)}px`; // Max height of 150px
    };

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
    }, [commentContext]);

    return (
        <div className='w-full'>
            <div className='relative flex justify-between'>
                <div className="w-full flex flex-col flex-grow cursor-pointer bg-slate-200 rounded-lg">
                    <textarea 
                        ref={textareaRef}
                        rows={1}
                        cols={30}
                        onChange={(e) => setCommentContext(e.target.value)}
                        // onInput={(e) => {
                        //     const target = e.target as HTMLTextAreaElement;
                        //     target.style.height = 'auto'; // reset height to auto to calculate new height
                        //     target.style.height = `${target.scrollHeight}px`; // set height based on scrollHeight
                        // }}
                        // onInput={handleInput}
                        placeholder="Write a comment..."
                        value={commentContext}
                        className="w-full p-2 rounded-md border outline-none resize-none overflow-y-auto bg-gray-200 dark:bg-gray-700 text-sm"
                    />
                </div>
                <div className="absolute right-0 pr-3 flex items-center h-full">
                    {commentContext.length !== 0 ? (
                        <FluentSend28FilledColored 
                            className="text-base cursor-pointer" 
                            onClick={handleCommentUpdate}
                        />
                    ) : (
                        <FluentSend28Filled
                            className="text-base cursor-pointer" 
                            onClick={handleCommentUpdate}
                        />
                    )}
                </div>
            </div>
            <div className="flex space-x-5 px-2.5">
                <div className="text-xs">
                    <p className='cursor-pointer'>Press Ecs to <span className='font-semibold' onClick={handleCancelUpdateComment}>cancel</span></p>
                </div>
            </div>
        </div>
    )
}
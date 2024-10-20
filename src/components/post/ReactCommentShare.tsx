import React from 'react'

interface PostNumberOfComment {
    totalCommets: number; 
    totolReplies: number;  
}

interface Post {
    post: {
        comments: {
            replies?: { [key: string]: any }[]; 
        }[];
    };
}

export default function ReactCommentShare({ post }: Post ) {
    const totalComments = post.comments.length; 
    const totalReplies = post.comments.reduce((acc, comment) => acc + (comment.replies?.length || 0), 0);
    const allComments = totalComments + totalReplies
    return (
        <div className='flex'>
            <div className='pt-1 flex justify-between w-full'>
                {/* reaction */}
                <div className='w-1/3 flex items-center justify-start'>
                    <span className='text-sm text-slate-500 cursor-pointer'>12.1K</span>
                </div>
                {/* comment */}
                <div className='w-1/3 flex items-center justify-center'>
                    <span className='text-sm text-slate-500 cursor-pointer'>
                    {allComments === 0  ? '' 
                        : (allComments === 1 
                        ? `${allComments} comment` 
                        : `${allComments} comments`)
                    }
                    </span>
                </div>
                {/* share */}
                <div className='w-1/3 flex items-center justify-end'>
                    <span className='text-sm text-slate-500 cursor-pointer'>1K shares</span>
                </div>
            </div>
        </div>
    )
}





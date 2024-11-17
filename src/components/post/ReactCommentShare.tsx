import React from 'react'
import { Post } from '../../interface/your-posts';

interface PostNumberOfComment {
    totalCommets: number; 
    totolReplies: number;  
}

interface PropsPost {
    post: Post;
}

export default function ReactCommentShare({ post }: PropsPost) {

    const totalComments = post.comments.length; 
    const totalReplies = post.comments.reduce((acc, comment) => acc + (comment.replies?.length || 0), 0);
    const allComments = totalComments + totalReplies

    const getTotalReactions = () => {
        let totalReactions = 0;
        if (post.reactions) {
            // sum up the reactions for each type
            totalReactions += post.reactions.fire ? post.reactions.fire.length : 0;
            totalReactions += post.reactions.handsUp ? post.reactions.handsUp.length : 0;
            totalReactions += post.reactions.disLike ? post.reactions.disLike.length : 0;
            totalReactions += post.reactions.heart ? post.reactions.heart.length : 0;
        }

        return totalReactions;
    };
    const totalReactions = getTotalReactions();

    return (
        <div className='flex'>
            <div className='pt-1 flex justify-between w-full'>
                {/* reaction */}
                <div className='w-1/3 flex items-center justify-center'>
                    <span className='text-sm text-slate-500 cursor-pointer'>
                        {totalReactions === 0 ? '' : `${totalReactions} reacted`}
                    </span>
                </div>
                {/* comment */}
                <div className='w-1/3 flex items-center justify-center'>
                    <span className='text-sm text-slate-500 cursor-pointer'>
                    {allComments === 0  ? '' 
                        : (allComments === 1 
                        ? `${allComments} comment` 
                        : `${allComments} comments`)
                    }
                    {/* 1.1K comments */}
                    </span>
                </div>
            </div>
        </div>
    )
}





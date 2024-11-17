import React from 'react'

interface PropsCommentOptions {
    isUpdate: boolean;
}

export default function CommentOptions({ isUpdate }: PropsCommentOptions) {
    return (
        <div className='absolute top-0 right-[30px] z-[2]'>
            <div className='bg-white drop-shadow-lg p-2 flex flex-col items-start border-[1px] rounded'>
                <div className='flex flex-col'>
                    {isUpdate && (<p>Edit</p>)}
                    <p>Delete</p>
                    <p>Hide</p>
                </div>
            </div>
        </div>
    )
}
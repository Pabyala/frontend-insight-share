import React, { RefObject, useEffect, useRef, useState } from 'react'

interface PropsCommentOptions {
    isUpdate: boolean;
    // parentRef: RefObject<HTMLDivElement>;
}

export default function CommentOptions({ isUpdate }: PropsCommentOptions) {

    const [position, setPosition] = useState({ top: 0, left: 0 });
    const dropdownRef = useRef<HTMLDivElement>(null);

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
                    {isUpdate && (<span className='text-sm p-1 hover:bg-gray-200 rounded'>Edit comment</span>)}
                    <span className='text-sm p-1 hover:bg-gray-200 rounded'>Delete comment</span>
                    <span className='text-sm p-1 hover:bg-gray-200 rounded'>Report comment</span>
                </div>
            {/* </div> */}
        </div>
    )
}
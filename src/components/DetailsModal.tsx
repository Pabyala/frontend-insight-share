import React from 'react'

interface DetailsPropsInterface {
    onClose: () => void;
}

export default function DetailsModal({onClose}:DetailsPropsInterface) {
    return (
        <div 
            onClick={onClose}
            className='fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50'
        >
            <div className='relative p-4 w-full max-w-2xl max-h-full'>
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                    <p className='p-4'>DetailsModal</p>
                </div>
            </div>
        </div>
    )
}

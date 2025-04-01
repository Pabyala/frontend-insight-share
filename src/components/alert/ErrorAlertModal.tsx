import React from 'react'
import { FluentColorErrorCircle16 } from '../others/CustomIcons';

interface ErrorAlertModalProps {
    message: string;
    onClose: () => void;
}

export default function ErrorAlertModal({ message, onClose }: ErrorAlertModalProps) {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50">
            <div className='className="relative p-4 w-full max-w-sm max-h-full"'>
                <div className='className="relative bg-white rounded-lg shadow p-3 space-y-3 lg:p-4"'>
                    <span className="w-full flex item-center justify-center text-[100px]">
                        <FluentColorErrorCircle16 />
                    </span>
                    <h2 className="text-base text-center font-semibold text-gray-900">
                        {message}
                    </h2>
                    <div className="flex w-full justify-center items-center space-x-3">
                        <button 
                            onClick={onClose}
                            className="text-sm w-1/2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
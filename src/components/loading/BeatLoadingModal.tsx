import React, { useEffect } from 'react'
import { BeatLoader } from 'react-spinners';

export default function BeatLoadingModal() {

    useEffect(() => {
        // prevent scrolling when the modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            // restore body scroll behavior when modal is closed
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center w-full h-full overflow-y-auto">
            <BeatLoader />
        </div>
    );
}

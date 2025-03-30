import React, { useEffect } from 'react'
import { BeatLoader } from 'react-spinners';

export default function BeatLoadingModal() {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center w-full h-full overflow-y-auto">
            <BeatLoader />
        </div>
    );
}

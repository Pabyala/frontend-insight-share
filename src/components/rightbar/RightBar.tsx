import SuggestedFollowing from './SuggestedFollowing'
import '.././style/Style.css'
import TodaysBdayList from './TodaysBdayList'
import { useEffect, useRef, useState } from 'react'

export default function RightBar() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div className="hidden lg:w-[40%] lg:block xl:w-[26%]"
        >
            <div
                className="right-bar fixed rounded-sm flex flex-col w-full lg:max-w-[358px] xl:max-w-[290px] 2xl:max-w-[348px] 
                [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 space-y-1"
                ref={dropdownRef}
                style={{ maxHeight: `${windowHeight - 85}px`, overflowY: "auto", zIndex: '2'}}
                
            >
                {/* This section stays fixed at the top */}
                <TodaysBdayList />
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    <p className="text-sm font-semibold mb-1">Suggested for you</p>
                    <div className="overflow-y-auto rounded-sm">
                        <SuggestedFollowing />
                    </div>
            </div>
        </div>
    )
}
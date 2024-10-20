import SuggestedFollowing from './SuggestedFollowing'
import '.././style/Style.css'
import { StreamlineEmojisWrappedGift2 } from '../others/CustomIcons'

export default function RightBar() {
    return (
        <div className='hidden lg:w-[40%] lg:block xl:w-[26%]'>
            <div
                className="right-bar space-y-2 fixed w-full lg:max-w-[358px] xl:max-w-[290px] 2xl:max-w-[348px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                style={{ zIndex: "1" }}
            >
                <div className="">
                    <p className="text-sm font-semibold mb-1">Birthdays</p>
                        <div className="flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                            <div className="flex">
                                <span className="text-3xl">
                                    <StreamlineEmojisWrappedGift2 />
                                </span>
                            </div>
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold">Monkey D. Luffy</span>'s
                                    birthday is today.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                            <div className="flex">
                                <span className="text-3xl">
                                    <StreamlineEmojisWrappedGift2 />
                                </span>
                            </div>
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold">Monkey D. Garp</span>'s
                                    birthday is today.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                            <div className="flex">
                                <span className="text-3xl">
                                    <StreamlineEmojisWrappedGift2 />
                                </span>
                            </div>
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold">Portgas D. Ace</span>'s
                                    birthday is today.
                                </p>
                            </div>
                        </div>
                </div>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                <SuggestedFollowing/>
            </div>
        </div>
    )
}

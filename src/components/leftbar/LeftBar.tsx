import { Avatar } from "@mui/material";
import { EmojioneV1Newspaper, FluentColorPeople48 } from "../others/CustomIcons";
import Sponsored from "./Sponsored";
import { Link } from "react-router-dom";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useGetUserDataQuery } from "../../features/auth/authApiSlice";
import { useSelector } from "react-redux";

export default function LeftBar() {

    const token = useSelector(selectCurrentToken)
    // Fetch user data; skip fetching if user is not logged in
    const { data: userData, error, isLoading } = useGetUserDataQuery(undefined, {
        skip: !token,
    });

    return (
        <div className="hidden xl:w-[26%] xl:block">
            <div
                className="h-full fixed overflow-hidden w-full xl:max-w-[290px] 2xl:max-w-[348px]"
                style={{ zIndex: "1" }}
            >
                {/* profile */}
                <Link to='/profile' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                    <div className="flex">
                        <Avatar
                            sx={{ width: 33, height: 33 }}
                            alt="Remy Sharp"
                            src="https://fastly.picsum.photos/id/865/256/256.jpg?hmac=nl8-UJCFEQkQonS4z_cfKCfvWzVSGyu_IdzeU6MRMo4"
                        />
                    </div>
                    <div>
                        <p className="font-medium text-sm">
                            <span>{userData?.userInfo?.firstName} </span>  
                            <span>{userData?.userInfo?.middleName} </span>  
                            <span>{userData?.userInfo?.lastName}</span>
                        </p>
                    </div>
                </Link>

                {/* followers */}
                    <Link to='/' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                        <div className="flex">
                            <span className="text-3xl">
                                <FluentColorPeople48 />
                            </span>
                        </div>
                        <div className="flex space-x-1">
                            <span className="font-medium text-sm">Followers</span>
                            {userData?.userInfo?.followers.length !== 0 &&
                                (<span className="font-semibold text-sm">{userData?.userInfo?.followers.length }</span>)
                            }
                        </div>
                    </Link>

                {/* posts */}
                {/* <div> */}
                    <Link to='/' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded mb-2">
                        <div className="flex">
                            <span className="text-3xl">
                                <EmojioneV1Newspaper />
                            </span>
                        </div>
                        <div className="flex space-x-1">
                            <span className="font-medium text-sm">Posts</span>
                            {userData?.userInfo?.followers.length !== 0 &&
                                (<span className="font-semibold text-sm">{userData?.userInfo?.followers.length }</span>)
                            }
                            <span className="font-semibold text-sm">(100)</span>
                        </div>
                    </Link>
                {/* </div> */}

                <hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700" />

                <Sponsored/>

                {/* birthday */}
                {/* <div className="">
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
                </div> */}
            </div>
        </div>
    );
}

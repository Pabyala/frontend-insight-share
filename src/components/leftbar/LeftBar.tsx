import { Avatar } from "@mui/material";
import { EmojioneV1Newspaper, FlatColorIconsFolder, FluentColorPeople48 } from "../others/CustomIcons";
import Sponsored from "./Sponsored";
import { Link } from "react-router-dom";
import { selectCurrentToken } from "../../features/auth/authSlice";
// import { useGetUserDataQuery } from "../../features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../features/users/usersApiSlice";

export default function LeftBar() {
    
    const token = useSelector(selectCurrentToken)
    const { data: userInfo } =  useGetUserQuery();
    console.log("My Data", userInfo);

    return (
        <div className="hidden xl:w-[26%] xl:block">
            <div
                className="h-full fixed overflow-hidden w-full xl:max-w-[290px] 2xl:max-w-[348px]"
                style={{ zIndex: "1" }}
            >
                <div className="flex flex-col bg-white rounded mb-3 p-1.5">
                    {/* profile */}
                    <Link to='/profile' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                        <div className="flex">
                            <Avatar
                                sx={{ width: 33, height: 33 }}
                                alt="Remy Sharp"
                                src={userInfo?.avatarUrl}
                            />
                        </div>
                        <div>
                            <p className="font-medium text-sm">
                                <span>{userInfo?.firstName} </span>  
                                <span>{userInfo?.middleName} </span>  
                                <span>{userInfo?.lastName}</span>
                            </p>
                        </div>
                    </Link>
                    {/* followers */}
                    <Link to='/followers' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                        <div className="flex">
                            <span className="text-3xl">
                                <FluentColorPeople48 />
                            </span>
                        </div>
                        <div className="flex space-x-1">
                            <span className="font-medium text-sm">Followers</span>
                            {userInfo?.followers.length !== 0 &&
                                (<span className="font-semibold text-sm">{userInfo?.followers.length }</span>)
                            }
                        </div>
                    </Link>
                    {/* Following */}
                    <Link to='/following' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                        <div className="flex">
                            <span className="text-3xl">
                                <FluentColorPeople48 />
                            </span>
                        </div>
                        <div className="flex space-x-1">
                            <span className="font-medium text-sm">Following</span>
                            {userInfo?.followers.length !== 0 &&
                                (<span className="font-semibold text-sm">{userInfo?.followers.length }</span>)
                            }
                        </div>
                    </Link>
                    {/* My posts */}
                    <Link to='/my-post' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded">
                        <div className="flex">
                            <span className="text-3xl">
                                <EmojioneV1Newspaper />
                            </span>
                        </div>
                        <div className="flex space-x-1">
                            <span className="font-medium text-sm">My Posts</span>
                            {userInfo?.followers.length !== 0 &&
                                (<span className="font-semibold text-sm">{userInfo?.followers.length }</span>)
                            }
                            <span className="font-semibold text-sm">(100)</span>
                        </div>
                    </Link>
                    <Link to='/my-post' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded">
                        <div className="flex">
                            <span className="text-3xl">
                                <FlatColorIconsFolder />
                            </span>
                        </div>
                        <div className="flex space-x-1">
                            <span className="font-medium text-sm">Saved Posts</span>
                        </div>
                    </Link>
                </div>
                <hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700" />
                <Sponsored/>
            </div>
        </div>
    );
}

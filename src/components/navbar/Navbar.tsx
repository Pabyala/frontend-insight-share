import { useEffect, useRef, useState } from "react";
import { CiSearch } from 'react-icons/ci'
import { FluentColorPeople48, FluentEmojiBell } from '../others/CustomIcons'
import NotificationContent from "./NotificationContent";
import SubmenuProfile from "./SubMenuProfile";
import { Link } from "react-router-dom";
import FollowersRequestContent from "./FollowersRequestContent";
import { useGetUserQuery, useSearchUserQuery } from "../../features/users/usersApiSlice";
import DefaultImg from '../../asset/DefaultImg.jpg'
import BirthdayListModal from "../rightbar/BirthdayListModal";
import { useGetNotificationQuery } from "../../features/notification/notificationApiSlice";
import socketSetup from "../../socket-io/socket-setup";
import BeatLoading from "../loading/BeatLoading";
import ErrorComponent from "../alert/ErrorComponent";
import { useGetFollowersQuery } from "../../features/FollowersFollowing/followersApiSlice";
import { Avatar } from "@mui/material";
import { UserSearch } from "../../interface/user";

export default function Navbar() {

    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    const { data: getNotification, error: getNotificationError, isLoading: isGetNotificationLoading, refetch } = useGetNotificationQuery(userInfo?._id ?? "", {
        skip: !userInfo?._id, // Prevent calling API until `userId` is available
    });
    const { data: getFollowers, error: errorGetFollowers, isLoading: isLoadingGetFollowers, refetch: refetchGetFollowers } = useGetFollowersQuery();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: users, isLoading, refetch: refreshUser } = useSearchUserQuery(searchTerm, {
        skip: searchTerm.length < 1, // Skip fetching if input is empty
    });

    const countFollower = getFollowers?.totalOfFollowersYouDontFollowingBack ?? 0;
    const [showFollowerMenu, setShowFollowerMenu] = useState<boolean>(false);
    const [showNotificationMenu, setShowNotificationMenu] = useState<boolean>(false);
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const [showBdayListModal, setShowBdayListModal] = useState<boolean>(false);

    useEffect(() => {
            console.log('SOCKET IO', socketSetup)
            socketSetup.on('addReactPost', (newReact: string)=> {
                console.log(newReact)
                refetch()
            })
            socketSetup.on('deletedPost', (currentPostId: string)=> {
                console.log(currentPostId)
                refetch()
            })
            socketSetup.on('addCommentToPost', (currentPostId: string)=> {
                console.log(currentPostId)
                refetch()
            })
            socketSetup.on('addRemoveReactToComment', (addRemoveHeartReact: string)=> {
                console.log(addRemoveHeartReact)
                refetch();
            })
            socketSetup.on('addRemoveReactToReply', (addRemoveHeartReact: string)=> {
                console.log(addRemoveHeartReact)
                refetch();
            })
            socketSetup.on('newFollower', (follow: string)=> {
                console.log(follow)
                refetch();
            })
    }, [])

    const followerRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const handleShowFollower = () => {
        setShowFollowerMenu(!showFollowerMenu);
        setShowNotificationMenu(false);
        setShowProfileMenu(false);
    }

    const handleShowNotification = () => {
        setShowFollowerMenu(false);
        setShowNotificationMenu(!showNotificationMenu);
        setShowProfileMenu(false);
    }

    const handleShowSubMenu = () => {
        setShowFollowerMenu(false);
        setShowNotificationMenu(false);
        setShowProfileMenu(!showProfileMenu);
    }
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (followerRef.current && !followerRef.current.contains(event.target as Node)) {
                setShowFollowerMenu(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotificationMenu(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (isUserInfoLoading || isGetNotificationLoading) return <BeatLoading/>;
    if (userInfoError || getNotificationError) return <ErrorComponent/>;

    return (
        <div 
            style={{zIndex: '10'}}
            className="w-full flex justify-center items-center fixed bg-white shadow-md"
        >
            <div className="container">
                <div className="mx-auto py-[12px] flex items-center justify-between">
                {/* logo and search */}
                <div className='flex items-center space-x-2 md:space-x-3'>
                    <div className="text-black text-xl font-bold">
                        <Link to='/' className="text-bas">Logo</Link>
                    </div>
                    {/* main div */}
                    <div className="relative flex flex-col items-center px-2 w-[220px] md:w-[300px]">
                        <div className="relative w-full">
                            <input
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type="text"
                                placeholder="Search Insight Share"
                                className="w-full text-xs p-2 pl-8 rounded-md bg-gray-200 text-slate-950 outline-none xl:text-sm"
                            />
                            <CiSearch className="absolute left-4 top-2 text-black xl:left-3 xl:top-2.5" />
                        </div>
                        {searchTerm.length > 0 && ( 
                            <div className="relative w-full">
                                <ul className="absolute p-1.5 left-0 w-full bg-white border rounded shadow-md mt-1 max-h-60 overflow-auto">
                                    {isLoading ? (
                                        <li className="p-1.5 text-sm text-gray-500">Loading...</li>
                                    ) : users && users?.length > 0 ? (
                                        users.map((user: UserSearch) => (
                                            <li key={user._id} className="p-1.5 text-sm hover:bg-gray-100 cursor-pointer">
                                                <Link
                                                    to={`/profile/${user.username}/${user._id}`}
                                                >
                                                <div className="flex space-x-2">
                                                    <Avatar
                                                        sx={{ width: 38, height: 38 }}
                                                        alt={user.username}
                                                        src={user.avatarUrl}
                                                    />
                                                    <div className="flex flex-col">
                                                        <p className="text-sm font-normal">{user.firstName} {user.middleName} {user.lastName}</p>
                                                        <p className="text-xs">{user.username}</p>
                                                    </div>
                                                </div>
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="p-1.5 text-sm text-gray-500">No users found</li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* {filteredUsers.length > 0 && (
                        <ul className="absolute left-0 w-full bg-white border rounded-lg shadow-md mt-1 max-h-60 overflow-auto">
                        {filteredUsers.map((user, index) => {
                            const startIndex = user.toLowerCase().indexOf(searchTerm.toLowerCase());
                            const beforeMatch = user.substring(0, startIndex);
                            const match = user.substring(startIndex, startIndex + searchTerm.length);
                            const afterMatch = user.substring(startIndex + searchTerm.length);

                            return (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                            >
                                {beforeMatch}
                                <p className="font-bold text-blue-500">{match}</p>
                                {afterMatch}
                            </li>
                            );
                        })}
                        </ul>
                    )} */}
                </div>
                

            {/* follower, notification, profile */}
                <div className='flex items-center justify-end space-x-3 xl:space-x-4'>
                    {/* follower */}
                        <div 
                            className="relative inline-flex"
                            ref={followerRef}
                        >
                            <button 
                                onClick={handleShowFollower}
                                className="flex items-center rounded-full bg-gray-200 border p-1 border-transparent text-center  text-white transition-all  hover:bg-gray-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
                            >
                                <span className='text-xl'>
                                    <FluentColorPeople48/>
                                </span>
                            </button>
                            {countFollower > 0 && (
                                <span className="absolute top-0.5 right-0.5 grid min-h-[18px] min-w-[18px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-500 p-0.5 text-[12px] font-medium leading-none text-white content-['']">
                                    {countFollower}
                                </span>
                            )}
                            {showFollowerMenu && (
                                <FollowersRequestContent
                                    getFollowers={getFollowers}
                                    errorGetFollowers={errorGetFollowers}
                                    isLoadingGetFollowers={isLoadingGetFollowers}
                                />
                            )}
                        </div>

                    {/* notification */}
                        <div 
                            className="relative inline-flex"
                            ref={notificationRef}
                        >
                            <button 
                                onClick={handleShowNotification}
                                className="flex items-center rounded-full bg-gray-200 border p-1 border-transparent text-center  text-white transition-all  hover:bg-gray-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
                            >
                                <span className='text-xl'>
                                    <FluentEmojiBell/>
                                </span>
                            </button>
                            {getNotification?.notifications.length != 0 && (
                                <span className="absolute top-0.5 right-0.5 grid min-h-[18px] min-w-[18px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-500 p-0.5 text-[12px] font-medium leading-none text-white content-['']">
                                {getNotification?.notifications.length}
                                </span>
                            )}
                            {showNotificationMenu && (  
                                <NotificationContent
                                    getUserNotification={getNotification?.notifications || []}
                                />
                            )}
                        </div>

                    {/* profile */}
                        <div 
                            className="relative inline-flex cursor-pointer"
                            ref={profileRef}
                            onClick={handleShowSubMenu}
                        >
                            <div className="cursor-pointer" >
                                <img
                                    src={userInfo?.avatarUrl == '' ? DefaultImg : userInfo?.avatarUrl}
                                    alt={userInfo?.username}
                                    className="relative inline-block h-[33px] w-[33px] !rounded-full object-cover object-center"
                                />
                            </div>
                            {showProfileMenu && (
                                <SubmenuProfile
                                    setShowBdayListModal={setShowBdayListModal}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showBdayListModal && (
                <BirthdayListModal setShowBdayListModal={setShowBdayListModal}/>
            )}
        </div>
    )
}
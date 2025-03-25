import { Avatar } from '@mui/material'
import { AntDesignSettingFilled, ClarityUserSolid, EmojioneV1Newspaper, FluentColorPeople48, FluentPersonArrowBack24Filled, IconoirPostSolid, IonLogOut, MdiGift, MingcuteUserFollow2Fill, StreamlineEmojisWrappedGift2 } from '../others/CustomIcons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, selectCurrentToken } from '../../features/auth/authSlice'
import { useGetUserQuery } from '../../features/users/usersApiSlice'
import { useLogoutUserMutation } from '../../features/auth/authApiSlice'

interface SubmenuProfileProps {
    setShowBdayListModal: (value: boolean) => void;
}

export default function SubmenuProfile({setShowBdayListModal}: SubmenuProfileProps) {

    const navigate = useNavigate()
    const token = useSelector(selectCurrentToken)
    const { data: userInfo, error, isLoading } = useGetUserQuery();
    const [logoutUser, { isLoading: isLoadingLogout}] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const userId = userInfo?._id


    const handleLogout = async () => {
        if (!token) {
            console.error("Token is missing. Cannot log out.");
            return;
        }
        try {
            await logoutUser().unwrap();
            dispatch(logOut());
            console.log("Successfully logged out");
            navigate('/login', { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const handleShowBdayModal = () => {
        setShowBdayListModal(true)
    }

    return (
        <>
            <div className="absolute top-full right-[0px] mt-[11px] w-[392px] bg-white rounded-md shadow-lg p-2">
                <div className='block px-2 py-2 text-gray-800 hover:bg-gray-300 rounded'>
                    <Link to={`/profile/id/${userId}`} className=''>
                        <div className="flex items-center">
                            <Avatar
                                sx={{ width: 32, height: 32 }}
                                alt="Remy Sharp"
                                src={userInfo?.avatarUrl}
                            />
                            <div className='flex flex-col ml-2.5'>
                                <p className="text-sm font-semibold">
                                    <span>{userInfo?.firstName} </span>
                                    <span>{userInfo?.middleName} </span> 
                                    <span>{userInfo?.lastName}</span>
                                </p>
                                <span className='text-sm'>{`@${userInfo?.username}`}</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="block px-2">
                    <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
                </div>
                <Link to={`/profile/id/${userId}`} className="block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-300 rounded lg:text-sm" >
                    <div className='flex items-center space-x-2'>
                        <div>
                            <ClarityUserSolid className='text-2xl' />
                        </div>
                        <span>Profile</span>
                    </div>
                </Link>
                <Link to="/followers" className="block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-300 rounded lg:text-sm" >
                    <div className='flex items-center space-x-2'>
                        <div>
                            <FluentColorPeople48 className='text-2xl' />
                        </div>
                        <span>
                            Followers
                        </span>
                    </div>
                </Link>
                <Link to="/following" className="block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-300 rounded lg:text-sm" >
                    <div className='flex items-center space-x-2'>
                        <div>
                            <FluentColorPeople48 className='text-2xl' />
                        </div>
                        <span>
                            Following
                        </span>

                    </div>
                </Link>
                <Link to="/my-post" className="block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-300 rounded lg:text-sm" >
                    <div className='flex items-center space-x-2'>
                        <div>
                            <EmojioneV1Newspaper className='text-2xl' />
                        </div>
                        <span>Post</span>
                    </div>
                </Link>
                <div className="block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-300 rounded lg:text-sm" >
                    <div onClick={handleShowBdayModal} className='flex items-center space-x-2'>
                        <div>
                            <StreamlineEmojisWrappedGift2 className='text-2xl' />
                        </div>
                        <span>Today's birthday</span>
                    </div>
                </div>
                <Link to="/settings" className="block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-300 rounded lg:text-sm" >
                    <div className='flex items-center space-x-2'>
                        <div>
                            <AntDesignSettingFilled className='text-2xl' />
                        </div>
                        <span>Settings</span>
                    </div>
                </Link>
                <div className="block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-300 rounded lg:text-sm" >
                    <div className='flex items-center space-x-2'>
                        <div>
                            <IonLogOut className='text-2xl' />
                        </div>
                        <span onClick={handleLogout}>Logout</span>
                    </div>
                </div>
            </div>
        </>
    )
}
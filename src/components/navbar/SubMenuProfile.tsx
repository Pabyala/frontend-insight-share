import { Avatar } from '@mui/material'
import { EmojioneV1Newspaper, FluentColorCalendarPeople20, FluentColorPeopleHome16, FluentColorPeopleList32, FluentColorPeopleSync20, FluentColorStarSettings32, NotoOutboxTray, StreamlineEmojisWrappedGift2 } from '../others/CustomIcons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, selectCurrentToken } from '../../features/auth/authSlice'
import { useGetUserQuery } from '../../features/users/usersApiSlice'
import { useLogoutUserMutation } from '../../features/auth/authApiSlice'
import { apiSlice } from '../../app/api/apiSlice'
import { showToast } from '../utils/ToastUtils'
import BeatLoading from '../loading/BeatLoading'

interface SubmenuProfileProps {
    setShowBdayListModal: (value: boolean) => void;
    setShowSuggestedForYou: (value: boolean) => void;
}

export default function SubmenuProfile({setShowBdayListModal, setShowSuggestedForYou}: SubmenuProfileProps) {

    const navigate = useNavigate()
    const token = useSelector(selectCurrentToken)
    const { data: userInfo } = useGetUserQuery();
    const [logoutUser, { isLoading: isLoadingLogout}] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const userId = userInfo?._id
    
    const handleLogout = async () => {
        if (!token) {
            showToast("Token is missing. Cannot log out.", 'error');
            return;
        }

        try {
            await logoutUser().unwrap();
            dispatch(logOut());
            dispatch(apiSlice.util.resetApiState());
            showToast("Successfully logged out", "success");
            navigate('/login', { replace: true });
        } catch (error) {
            showToast("Logout failed.", 'error');
        }
    }

    const handleShowBdayModal = () => {
        setShowBdayListModal(true)
    }

    const handleShowSuggestedForYou = () => {
        setShowSuggestedForYou(true)
    }

    if (isLoadingLogout) return <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10'><BeatLoading/></div>;

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
                            <FluentColorPeopleHome16 className='text-2xl' />
                        </div>
                        <span>Profile</span>
                    </div>
                </Link>
                <Link to="/followers" className="block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-300 rounded lg:text-sm" >
                    <div className='flex items-center space-x-2'>
                        <div>
                            <FluentColorPeopleList32 className='text-2xl' />
                        </div>
                        <span>
                            Followers
                        </span>
                    </div>
                </Link>
                <Link to="/following" className="block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-300 rounded lg:text-sm" >
                    <div className='flex items-center space-x-2'>
                        <div>
                            <FluentColorPeopleSync20 className='text-2xl' />
                        </div>
                        <span>
                            Following
                        </span>

                    </div>
                </Link>
                <div className="block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-300 rounded lg:hidden" >
                    <div onClick={handleShowSuggestedForYou} className='flex items-center space-x-2'>
                        <div>
                            <FluentColorCalendarPeople20 className='text-2xl' />
                        </div>
                        <span>
                            Suggested for you
                        </span>
                    </div>
                </div>
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
                            <FluentColorStarSettings32 className='text-2xl' />
                        </div>
                        <span>Settings</span>
                    </div>
                </Link>
                <div onClick={handleLogout} className="block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-300 rounded lg:text-sm" >
                    <div className='flex items-center space-x-2'>
                        <div>
                            <NotoOutboxTray className='text-2xl' />
                        </div>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </>
    )
}
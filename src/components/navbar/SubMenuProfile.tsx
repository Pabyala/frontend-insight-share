import { Avatar } from '@mui/material'
import { AntDesignSettingFilled, ClarityUserSolid, FluentPersonArrowBack24Filled, IconoirPostSolid, IonLogOut, MdiGift, MingcuteUserFollow2Fill } from '../others/CustomIcons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, selectCurrentToken } from '../../features/auth/authSlice'
// import { useGetUserDataQuery } from '../../features/auth/authApiSlice'
import { useGetUserQuery } from '../../features/users/usersApiSlice'
import { useLogoutUserMutation } from '../../features/auth/authApiSlice'

export default function SubmenuProfile() {

    const navigate = useNavigate()
    const token = useSelector(selectCurrentToken)
    const { data: userInfo, error, isLoading } = useGetUserQuery();
    const dispatch = useDispatch();
    const userId = userInfo?._id

    const [logoutUser, { isLoading: isLoadingLogout}] = useLogoutUserMutation();

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

    // const notificationCount = userInfo?.followers.length

    return (
        <div className="absolute top-full right-[0px] mt-[11px] w-[392px] bg-white rounded-md shadow-lg py-2">
            <div className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                <div className="flex">
                    <Avatar
                        sx={{ width: 32, height: 32 }}
                        alt="Remy Sharp"
                        src={userInfo?.avatarUrl}
                    />
                    <div className='flex flex-col ml-2.5'>
                        {/* <span className='text-sm font-semibold'>Eleomar F. Fajutnao</span> */}
                        <p className="text-sm font-semibold">
                            <span>{userInfo?.firstName} </span>
                            {/* <span>{userInfo?.middleName} </span>   */}
                            <span>{userInfo?.lastName}</span>
                        </p>
                        <span className='text-sm'>{userInfo?.username}</span>
                    </div>
                </div>
            </div>
            <div className="block px-4">
                <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
            
            <Link to={`/profile/id/${userId}`} className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <ClarityUserSolid className='text-2xl' />
                    </div>
                    <span>Your Profile</span>
                </div>
            </Link>

            <a href="/" className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <MingcuteUserFollow2Fill className='text-2xl' />
                    </div>
                    <span>
                        Following {userInfo?.following && userInfo.following.length !== 0 
                            ? userInfo.following.length 
                            : ''
                        }
                    </span>

                </div>
            </a>

            <a href="/" className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <FluentPersonArrowBack24Filled className='text-2xl' />
                    </div>
                    <span>
                        Followers {userInfo?.followers && userInfo.followers.length !== 0 
                            ? userInfo.followers.length 
                            : ''
                        }
                    </span>
                </div>
            </a>

            <a href="/" className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <IconoirPostSolid className='text-2xl' />
                    </div>
                    <span>Post</span>
                </div>
            </a>

            <a href="/" className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <MdiGift className='text-2xl' />
                    </div>
                    <span>Today's birthday</span>
                </div>
            </a>

            <a href="/" className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <AntDesignSettingFilled className='text-2xl' />
                    </div>
                    <span>Settings</span>
                </div>
            </a>
            <div className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <IonLogOut className='text-2xl' />
                    </div>
                    <span onClick={handleLogout}>Logout</span>
                </div>
            </div>
        </div>
    )
}
import React from 'react'
import { EmojioneV1Newspaper, FlatColorIconsFolder, FluentColorPeople48 } from '../others/CustomIcons'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { useGetUserQuery } from '../../features/users/usersApiSlice'

export default function MenuListLeftBar() {

    // const token = useSelector(selectCurrentToken)
    const { data: userInfo } =  useGetUserQuery();

    return (
        <div className="flex flex-col bg-white rounded mb-3 p-1.5">
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
            <Link to='/saved-post' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded">
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
    )
}
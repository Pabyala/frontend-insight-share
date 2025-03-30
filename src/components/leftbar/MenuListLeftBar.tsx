import { useEffect } from 'react'
import { EmojioneV1Newspaper, FlatColorIconsFolder, FluentColorPeople48 } from '../others/CustomIcons'
import { Link } from 'react-router-dom'
import { useGetFollowersQuery, useGetFollowingQuery } from '../../features/FollowersFollowing/followersApiSlice'
import { useGetSavedPostQuery, useGetUserAllPostsQuery } from '../../features/posts/postsApiSlice'
import socketSetup from '../../socket-io/socket-setup'

export default function MenuListLeftBar() {

    const { data: getFollowers, refetch: refetchGetFollowers } = useGetFollowersQuery()
    const { data: getFollowing } = useGetFollowingQuery()
    const { data: yourPosts } = useGetUserAllPostsQuery();
    const { data: savedPosts, refetch: refetchSavedPosts } = useGetSavedPostQuery();

    useEffect(() => {
        socketSetup.on('deletedPost', () => {
            refetchSavedPosts()
        })
        socketSetup.on('newFollower', ()=> {
            refetchGetFollowers();
        })
    })

    return (
        <div className="flex flex-col bg-white rounded mb-3 p-1.5">
            {/* Followers */}
            <Link to='/followers' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                <div className="flex">
                    <span className="text-3xl">
                        <FluentColorPeople48 />
                    </span>
                </div>
                <div className="flex space-x-1">
                    <p className="font-medium text-sm">
                        Followers {getFollowers?.totalFollowers !== 0 ? `(${getFollowers?.totalFollowers})` : ''}
                    </p>
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
                    <p className="font-medium text-sm">
                        Following {getFollowing?.totalFollowing !== 0 ? `(${getFollowing?.totalFollowing})` : ''}
                    </p>
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
                    <p className="font-medium text-sm">
                        My Posts {yourPosts?.postCount !== 0 ? `(${yourPosts?.postCount})` : ''}
                    </p>
                </div>
            </Link>
            <Link to='/saved-post' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded">
                <div className="flex">
                    <span className="text-3xl">
                        <FlatColorIconsFolder />
                    </span>
                </div>
                <div className="flex space-x-1">
                    <p className="font-medium text-sm">
                        Saved Posts {savedPosts?.savedPostCount !== 0 ? `(${savedPosts?.savedPostCount})` : ''}
                    </p>
                </div>
            </Link>
        </div>
    )
}
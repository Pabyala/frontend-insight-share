import React, { useState } from 'react'
import { useFollowUserMutation, useGetFollowersQuery } from '../../features/FollowersFollowing/followersApiSlice'
import DefaultImg from '../../asset/DefaultImg.jpg';
import { notification } from '../../data/dummy-data';
import { MaterialSymbolsMore } from '../others/CustomIcons';

export default function FollowerList() {
    const { data: getFollowers, error: errorGetFollowers, isLoading: isLoadingGetFollowers, refetch: refetchGetFollowers } = useGetFollowersQuery()
    console.log("My followers", getFollowers)
    const [followUser] = useFollowUserMutation();

    const myFollowers = getFollowers?.allFollowers
    const totalFollowers = getFollowers?.totalFollowers
    const myFollowersYouDontFollowingBack = getFollowers?.followersYouDontFollowingBack
    const totalFollowersYouDontFollowingBack = getFollowers?.totalOfFollowersYouDontFollowingBack

    const followers = notification
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showAllFollowers, setShowAllFollowers] = useState<boolean>(false);

    const follower = showAllFollowers ? myFollowersYouDontFollowingBack : myFollowers
    console.log("Show all: ", follower)

    const handleFollowedUser = async (userIdToFollow: string) => {
        console.log("Author id: ", userIdToFollow)
        if(!userIdToFollow) return
        try {
            await followUser(userIdToFollow).unwrap();
        } catch (error) {
            console.log(error)
        }
    }  

    const handleShowModal = (type: string) => {
        if(!type) return
        if(type === 'Follower'){
            console.log("Show all follower")
            setShowModal(!showModal)
            setShowAllFollowers(false)
        } else {
            console.log("Show all user you dont followed back")
            setShowModal(!showModal)
            setShowAllFollowers(true)
        }
    }

    if (isLoadingGetFollowers) return <p className='text-sm'>Loading followers...</p>;
    if (errorGetFollowers) return <p className='text-sm'>Failed to load followers.</p>;
    if (totalFollowers === 0 || totalFollowersYouDontFollowingBack === 0) return <p className='text-sm bg-white p-3'>No followers</p>;

    return (
        <div className='flex flex-col pb-3 space-y-2 lg:space-y-3 w-full'>
            <div className='w-full'>
                <div className='bg-lightWhite p-3 rounded relative space-y-2'>
                    <div className='flex justify-between'>
                        <p className="text-sm font-medium lg:text-base">{showAllFollowers ? "User you don't follow back" : 'Followers'}</p>
                        <div className='cursor-pointer' onClick={() => setShowModal(!showModal)}>
                            <span className='text-[25px]'><MaterialSymbolsMore/></span>
                        </div>
                    </div>
                    {showModal && (
                        <div className='absolute right-[40px] z-10 w-fit p-1.5 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <div className='cursor-pointer p-1 rounded hover:bg-gray-200' onClick={() => handleShowModal('Follower')}>Followers</div>
                            <div className='cursor-pointer p-1 rounded hover:bg-gray-200' onClick={() => handleShowModal('DontFollowBack')}>User you don't follow back</div>
                        </div>
                    )}
                    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-6 lg:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                        {follower?.map((fol) => (
                            <div key={fol._id} className="cursor-pointer bg-white rounded-md overflow-hidden drop-shadow-md border">
                                <div className='w-full h-[100px] mb-1 md:h-[130px] lg:h-[130px] xl:h-[140px] overflow-hidden'>
                                    <img 
                                        src={fol?.avatarUrl || DefaultImg}
                                        alt={fol.username}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='w-full flex flex-col space-y-1 px-1 pb-1 md:px-1.5 md:pb-1.5 lg:px-2 lg:pb-2'>
                                    <p className='text-xs font-medium overflow-hidden whitespace-nowrap text-ellipsis max-w-xs md:text-sm'>{fol.firstName} {fol?.middleName} {fol.lastName}</p>
                                    <button 
                                        className='p-1 bg-blue-500 text-xs font-normal text-white rounded md:text-sm hover:bg-blue-600'
                                    >
                                        Follow back
                                    </button>
                                    <button 
                                        className='p-1 bg-gray-300 text-xs font-normal rounded md:text-sm hover:bg-gray-400 text-black'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
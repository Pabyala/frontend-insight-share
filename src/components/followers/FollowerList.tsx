import React from 'react'
import { useGetFollowersQuery } from '../../features/FollowersFollowing/followersApiSlice'
import DefaultImg from '../../asset/DefaultImg.jpg';
import { notification } from '../../data/dummy-data';

export default function FollowerList() {
    const { data: getFollowers, error: errorGetFollowers, isLoading: isLoadingGetFollowers, refetch: refetchGetFollowers } = useGetFollowersQuery()
    console.log("My followers", getFollowers)

    const myFollowers = getFollowers?.yourFollowers
    const totalFollowers = getFollowers?.totalFollowers


    const followers = notification
    return (
        <div className='flex flex-col pb-3 space-y-2 lg:space-y-3'>
            <div className='w-full'>
                <div className='bg-lightWhite p-3 rounded'>
                    <p>Followers</p>
                    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-6 lg:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                        {myFollowers?.map((fol) => (
                            <div key={fol._id} className="cursor-pointer bg-white rounded-md overflow-hidden drop-shadow-md border">
                                <div className='w-full h-[100px] mb-1 md:h-[130px] lg:h-[130px] xl:h-[140px] overflow-hidden'>
                                    <img 
                                        src={fol.follower?.avatarUrl || DefaultImg}
                                        alt={fol.follower.username}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='w-full flex flex-col space-y-1 px-1 pb-1 md:px-1.5 md:pb-1.5 lg:px-2 lg:pb-2'>
                                    <p className='text-xs font-medium overflow-hidden whitespace-nowrap text-ellipsis max-w-xs md:text-sm'>{fol.follower.firstName} {fol.follower?.middleName} {fol.follower.lastName}</p>
                                    <button className='p-1 bg-blue-600 text-xs font-normal text-white rounded lg:text-sm'>Confirm</button>
                                    <button className='p-1 bg-slate-300 text-xs font-normal text-black rounded lg:text-sm'>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
import React from 'react'
import { useGetFollowingQuery } from '../../features/FollowersFollowing/followersApiSlice'
import DefaultImg from '../../asset/DefaultImg.jpg';

export default function FollowingList() {
    const { data: getFollowing, error: errorGetFollowers, isLoading: isLoadingGetFollowers, refetch: refetchGetFollowers } = useGetFollowingQuery()
    console.log("My following", getFollowing)

    const myFollowing = getFollowing?.youFollowed
    const totalFollowing = getFollowing?.totalFollowing
    return (
        <div className='flex flex-col pb-3 space-y-2 lg:space-y-3'>
            <div className='w-full'>
                <div className='bg-lightWhite p-3 rounded'>
                    <p>Following</p>
                    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-6 lg:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                        {myFollowing?.map((fol) => (
                            <div key={fol._id} className="cursor-pointer bg-white rounded-md overflow-hidden drop-shadow-md border">
                                <div className='w-full h-[100px] mb-1 md:h-[130px] lg:h-[130px] xl:h-[140px] overflow-hidden'>
                                    <img 
                                        src={fol.following?.avatarUrl || DefaultImg}
                                        alt={fol.follower}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='w-full flex flex-col space-y-1 px-1 pb-1 md:px-1.5 md:pb-1.5 lg:px-2 lg:pb-2'>
                                    <p className='text-xs font-medium overflow-hidden whitespace-nowrap text-ellipsis max-w-xs md:text-sm'>{fol.following.firstName} {fol.following?.middleName} {fol.following.lastName}</p>
                                    <button className='p-1 bg-slate-300 text-xs font-normal text-black rounded lg:text-sm'>Unfollow</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
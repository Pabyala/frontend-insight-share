import React from 'react'
import { Link } from 'react-router-dom'
import { useGetUserFollowersQuery } from '../../../features/users/usersApiSlice';
import DefaultImg from '../../../asset/DefaultImg.jpg';
import { useGetFollowersQuery } from '../../../features/FollowersFollowing/followersApiSlice';

export default function ProfileFollowers() {

    const { data: followersData, isLoading, isError } = useGetUserFollowersQuery();
    console.log("Your followers", followersData?.yourFollowers)

    const { data: getFollowers, error: errorGetFollowers, isLoading: isLoadingGetFollowers, refetch: refetchGetFollowers } = useGetFollowersQuery()
    
    if (isLoadingGetFollowers) {
        return <p>Loading followers...</p>;
    }

    if (errorGetFollowers) {
        return <p>Error loading followers.</p>;
    }

    if (getFollowers?.totalFollowers === 0) {
        return <p>No followers.</p>
    }

    const displayedFollowers = getFollowers?.allFollowers.slice(0, 9);

    return (
        <div className='bg-white rounded p-3 space-y-2'>
            <div className='px-1 flex justify-between'>
                <p className='text-base font-semibold'>Followers</p>
                <p className='text-base'>
                    <Link to='/' className='text-sm text-[#0866FF]'>See all followers</Link>
                </p>
            </div>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-6 lg:gap-3 lg:grid-cols-3">
                {/* {displayedFollowers?.map((followers) => (
                    <div key={followers._id} className="cursor-pointer">
                        <div className='w-full h-[112px] rounded mb-1 md:h-[140px] lg:h-[100px] xl:h-[130px]'>
                            <img 
                                src={followers?.avatarUrl || DefaultImg}
                                alt={followers.username}
                                className='w-full h-full object-cover rounded'
                            />
                        </div>
                        <div className='w-full flex flex-col space-y-1 px-1 pb-1 md:px-1.5 md:pb-1.5 lg:px-2 lg:pb-2'>
                            <p className='text-xs font-medium md:text-sm'>{followers.firstName} {followers?.middleName} {followers.lastName}</p>
                            <button className='p-1 bg-slate-300 text-xs font-normal text-black rounded lg:text-sm'>View</button>
                        </div>
                    </div>
                ))} */}
                {displayedFollowers?.map((fol) => (
                            <div key={fol._id} className="cursor-pointer bg-white rounded-md overflow-hidden drop-shadow-md border">
                                <div className='w-full h-[100px] mb-1 md:h-[130px] lg:h-[110px] xl:h-[140px] overflow-hidden'>
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
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    );
}

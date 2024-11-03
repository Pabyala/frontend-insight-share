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
                {displayedFollowers?.map((followers) => (
                    <div key={followers._id} className="cursor-pointer">
                        <div className='w-full h-[112px] rounded mb-1 md:h-[140px] lg:h-[100px] xl:h-[130px]'>
                            <img 
                                src={followers?.avatarUrl || DefaultImg}
                                alt={followers.username}
                                className='w-full h-full object-cover rounded'
                            />
                        </div>
                        <p className='text-xs font-medium md:text-sm'>{followers.firstName} {followers?.middleName} {followers.lastName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

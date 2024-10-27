import React from 'react'
import { Link } from 'react-router-dom'
import { followerRequest } from '../../../data/dummy-data';
import { useGetUserFollowersQuery } from '../../../features/users/usersApiSlice';
import DefaultImg from '../../../asset/DefaultImg.jpg';

export default function ProfileFollowers() {
    // const setFollowers = followerRequest.slice(0, 9);

    const { data: followersData, isLoading, isError } = useGetUserFollowersQuery();
    console.log("Your followers", followersData?.yourFollowers)
    
    if (isLoading) {
        return <p>Loading followers...</p>;
    }

    if (isError) {
        return <p>Error loading followers.</p>;
    }

    if (!followersData || followersData.yourFollowers.length === 0) {
        return null;
    }

    const displayedFollowers = followersData.yourFollowers.slice(0, 9);

    return (
        <div className='bg-white rounded p-3 space-y-2'>
            <div className='px-1 flex justify-between'>
                <p className='text-base font-semibold'>Followers</p>
                <p className='text-base'>
                    <Link to='/' className='text-sm text-[#0866FF]'>See all followers</Link>
                </p>
            </div>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-6 lg:gap-3 lg:grid-cols-3">
                {displayedFollowers.map((followers) => (
                    <div key={followers.follower._id} className="cursor-pointer">
                        <div className='w-full h-[112px] rounded mb-1 md:h-[140px] lg:h-[100px] xl:h-[130px]'>
                            <img 
                                src={followers.follower.avatarUrl === '' ? DefaultImg : followers.follower.avatarUrl}
                                alt={followers.follower.username}
                                className='w-full h-full object-cover rounded'
                            />
                        </div>
                        <p className='text-xs font-medium md:text-sm'>{followers.follower.firstName} {followers.follower.middleName} {followers.follower.lastName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

import React from 'react'
import { followerRequest } from '../../../data/dummy-data'
import { useGetFollowersQuery } from '../../../features/FollowersFollowing/followersApiSlice';
import DefaultImg from '../../../asset/DefaultImg.jpg';

interface ProfileListOfFollowersProps {
    currentUserId: string | undefined;
}

export default function ProfileListOfFollowers({ currentUserId }: ProfileListOfFollowersProps) {

    const { data: getFollowers, error: errorGetFollowers, isLoading: isLoadingGetFollowers, refetch: refetchGetFollowers } = useGetFollowersQuery(currentUserId)
    
    if (isLoadingGetFollowers) {
        return <p className='text-sm'>Loading followers...</p>;
    }

    if (errorGetFollowers) {
        return <p className='text-sm'>Error loading followers.</p>;
    }

    if (getFollowers?.totalFollowers === 0) {
        return <p className='text-sm'>No followers</p>
    }

    const displayedFollowers = getFollowers?.allFollowers.slice(0, 9);

    const setFollowers = getFollowers?.allFollowers.slice(0, 6);

    return (
        <div className='flex justify-center items-center w-ful p-0.5 lg:p-0'>
            <div className="relative flex items-center min-w-fit h-[45px] w-[189px] lg:left-[-3px]">
                {setFollowers?.map((fol, index) => (
                    <div 
                        key={fol._id}
                        className='absolute bg-white p-0.5 rounded-full'
                        style={{
                            left: index === 0 ? 0 : `${index * 30}px`,
                            zIndex: index === 0 ? 6 :  6 - index
                        }}
                    >
                        <div className='relative inline-flex cursor-pointer'>
                            <div className="cursor-pointer" >
                                <img
                                    src={fol.avatarUrl || DefaultImg}
                                    alt={fol.username}
                                    className="relative inline-block h-[33px] w-[33px] !rounded-full object-cover object-center"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

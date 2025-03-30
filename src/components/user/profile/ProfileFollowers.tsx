import { Link } from 'react-router-dom'
import DefaultImg from '../../../asset/DefaultImg.jpg';
import { useGetFollowersQuery } from '../../../features/FollowersFollowing/followersApiSlice';
import BeatLoading from '../../loading/BeatLoading';

interface ProfileFollowersProps {
    currentUserId: string | undefined;
}

export default function ProfileFollowers({ currentUserId }: ProfileFollowersProps) {

    const { data: getFollowers, error: errorGetFollowers, isLoading: isLoadingGetFollowers } = useGetFollowersQuery(currentUserId)
    
    if (isLoadingGetFollowers) {
        return <BeatLoading/>;
    }

    if (errorGetFollowers) {
        return <p className='text-sm'>Error loading followers. Please reload the page.</p>;
    }

    if (getFollowers?.totalFollowers === 0) {
        return <p className='text-sm bg-white p-3'>No followers</p>
    }

    const displayedFollowers = getFollowers?.allFollowers.slice(0, 9);

    return (
        <div className='bg-white rounded p-3 space-y-2'>
            <div className='px-1 flex justify-between'>
                <p className='text-sm font-semibold md:text-base'>Followers</p>
                <p className='text-sm'>
                    <Link to='/' className='text-sm text-[#0866FF]'>See all followers</Link>
                </p>
            </div>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-6 lg:gap-3 lg:grid-cols-3">
                {displayedFollowers?.map((fol) => (
                            <div key={fol._id} className="cursor-pointer bg-white rounded-md overflow-hidden drop-shadow-md border">
                                <div className='w-full h-[100px] mb-1 md:h-[110px] lg:h-[90px] xl:h-[140px] overflow-hidden'>
                                    <img 
                                        src={fol?.avatarUrl || DefaultImg}
                                        alt={fol.username}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='w-full flex flex-col space-y-1 px-1 pb-1 md:px-1.5 md:pb-1.5 lg:px-2 lg:pb-2'>
                                    <p className='text-xs font-medium overflow-hidden whitespace-nowrap text-ellipsis max-w-xs md:text-sm'>{fol.firstName} {fol?.middleName} {fol.lastName}</p>
                                    <Link
                                        to={`/profile/${fol.username}/${fol._id}`}
                                        className='p-1 bg-blue-500 text-xs font-normal text-white rounded md:text-xs hover:bg-blue-600 flex justify-center'
                                    >
                                        View
                                    </Link>
                                    
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    );
}

import Navbar from '../components/navbar/Navbar'
import ProfileHeader from '../components/user/profile/ProfileHeader'
import ProfileIntro from '../components/user/profile/ProfileIntro'
import Posts from '../components/post/Posts'
import { useGetUserQuery } from '../features/users/usersApiSlice'
import BdayPost from '../components/post/BdayPost'
import { useGetUserAllPostsQuery } from '../features/posts/postsApiSlice'
import BeatLoading from '../components/loading/BeatLoading'

export default function Profile() {

    const { data: userInfo, isLoading: isLoadingUserInfo } = useGetUserQuery();
    const { data: yourPosts, error: errorYourPosts, isLoading: isLoadingYourPosts, refetch: refetchYourPosts } = useGetUserAllPostsQuery();

    const posts = yourPosts ? yourPosts.dataPost : [];

    const myBirthday = userInfo?.dateOfBirth;
    const isTodayBirthday = () => {
        if (!myBirthday) return false;

        const today = new Date();
        const birthDate = new Date(myBirthday);
        
        return today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth();
    };

    return (
        <div className='flex flex-col pb-5'>
            <Navbar/>
            <div className='container mx-auto flex flex-col justify-between pt-[63px] lg:pt-[65px] xl:pt-[68px] relative overflow-hidden space-y-1.5 lg:space-y-3'>
                <ProfileHeader 
                    userInfo={userInfo}
                    isLoading={isLoadingUserInfo}
                />
                <div className='flex flex-col space-y-1.5 lg:space-y-0 lg:flex-row lg:justify-between'>
                    {!isLoadingUserInfo && (
                        <div className='lg:w-[42%]'>
                            <ProfileIntro 
                                userInfo={userInfo}
                            />
                        </div>
                    )}
                    <div className='lg:w-[56%]'>
                        {isTodayBirthday() && (
                            <BdayPost myName={userInfo?.firstName} />
                        )}
                        { isLoadingYourPosts ? 
                            <BeatLoading/> :
                            <Posts 
                                posts={posts} 
                                // isLoading={isLoadingYourPosts} 
                                error={errorYourPosts}
                                // savedPostIds={allSavedPostId}
                                // userId={userId}
                                refetch={refetchYourPosts}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

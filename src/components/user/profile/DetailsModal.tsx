import { useEffect, useState } from 'react'
import { MaterialSymbolsDelete, MdiCloseThick, MdiPen, MingcuteCheck2Fill } from '../../others/CustomIcons';
import { v4 as uuidv4 } from 'uuid';
import { UserDetails } from '../../../interface/user';
import { useGetUserQuery, useUpdateUserDetailsMutation } from '../../../features/users/usersApiSlice';
import BdayFormater from '../../helper/BdayFormater';
import { useGetFollowersQuery } from '../../../features/FollowersFollowing/followersApiSlice';
import { showToast } from '../../utils/ToastUtils';

interface DetailsPropsInterface {
    onClose: () => void;
    // followersData: Followers | undefined;
    // userInfo: UserInfo | undefined;
}

interface SocialLink {
    urlId: string;
    url: string;
}

export default function DetailsModal({ onClose }:DetailsPropsInterface) {

    const [updateUserDetails] = useUpdateUserDetailsMutation();
    const { data: userInfo, refetch: refetchUserInfo } = useGetUserQuery();
    const { data: followersData } = useGetFollowersQuery();
    
    const [userDetailsInfo, setUserDetailsInfo] = useState<UserDetails>({
        livesIn: '',
        locFrom: '',
        isFollowedShow: true,
        studyAt: '',
        companyName: '',
        position: '',
        isDateBirthShow: true,
        bio: '',
        socials: [],
    }); 
    const formattedDate = BdayFormater(userInfo?.dateOfBirth);
    const [mySocials, setMySocials] = useState<SocialLink[]>([]);
    const [newSocialUrl, setNewSocialUrl] = useState<string>('');
    const [editingSocial, setEditingSocial] = useState<string | null>(null);
    const [isUpdateLink, setIsUpdateLink]  = useState<boolean>(false)

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (userInfo) {
            setUserDetailsInfo({
                livesIn: userInfo.livesIn || '',
                locFrom: userInfo.locFrom || '',
                isFollowedShow: userInfo.isFollowedShow ?? true,
                studyAt: userInfo.studyAt || '',
                companyName: userInfo.workAt?.companyName || '',
                position: userInfo.workAt?.position || '',
                isDateBirthShow: userInfo.isDateBirthShow ?? true,
                bio: userInfo.bio || '',
                socials: userInfo.socials || [],
            });
            setMySocials(userInfo.socials || []);
        }
    }, [userInfo]);

    useEffect(() => {
        setMySocials(userDetailsInfo.socials);
    }, [userDetailsInfo.socials]);

    const addSocial = () => {
        let myuuid = uuidv4();
        if (newSocialUrl.trim() === '') return;

        if (editingSocial) {
            const updatedSocials = mySocials.map((social) =>
                social.urlId === editingSocial ? { ...social, url: newSocialUrl } : social
            );
            setMySocials(updatedSocials);
            setUserDetailsInfo(prev => ({ ...prev, socials: updatedSocials }));
            setEditingSocial(null);
        } else {
            const newSocials = [...mySocials, { urlId: myuuid, url: newSocialUrl }];
            setMySocials(newSocials);
            setUserDetailsInfo(prev => ({ ...prev, socials: newSocials }));
        }
        setNewSocialUrl('');
        setIsUpdateLink(false)
    };

    const removeSocial = (urlId: string) => {
        const newSocials = mySocials.filter((soc) => soc.urlId !== urlId);
        setMySocials(newSocials);
        setUserDetailsInfo(prev => ({
            ...prev,
            socials: newSocials,
        }));
    };

    const handleUpdate = (urlId: string) => {
        setIsUpdateLink(true)
        const updateSocials = mySocials.find(soc => soc.urlId === urlId);
        if (updateSocials) {
            setNewSocialUrl(updateSocials.url);
            setEditingSocial(urlId);
        }
    };

    const cancelUpdate = () => {
        setIsUpdateLink(false)
        setNewSocialUrl('')
        setEditingSocial(null)
    }

    const handleSaveDetails = async () => {
        try {
            const updatedUserDetails = {
                ...userDetailsInfo,
                socials: mySocials,
            };
            await updateUserDetails(updatedUserDetails).unwrap();
            refetchUserInfo();
            onClose()
        } catch (error) {
            showToast('Error saving data.', 'error')
        }
    }


    return (
        <div 
            className='fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50'
        >
            <div className='relative p-4 w-full max-w-2xl max-h-full'>
                <div className='relative bg-white rounded-lg shadow p-5 space-y-3 lg:p-6'>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <p className='text-base font-semibold text-center'>Update your details</p>
                        </div>
                        <div className='flex justify-end items-center'>
                            <button
                                type="button"
                                className="text-[22px] bg-gray-200 text-gray-500 border-0 hover:border-0 focus:outline-none bg-transparent hover:bg-transparent hover:outline-none hover:text-gray-600 ml-auto inline-flex items-center popup-close"
                                onClick={onClose}
                            >
                                <MdiCloseThick/>
                            </button>
                        </div>
                    </div>
                    <hr className="h-px bg-gray-200 border-0" />

                    <div className='w-full'>
                        <p className='text-sm font-medium mb-1'>Set your bio</p>
                        <textarea 
                            value={userDetailsInfo.bio}
                            onChange={(e) => {if(e.target.value.length <= 200){
                                setUserDetailsInfo((prev) => ({
                                    ...prev, 
                                    bio: e.target.value
                                }))
                            }}}
                            placeholder="Describe who you are"
                            className={`w-full p-2 border border-gray-300 focus:border-black focus:outline-none rounded text-sm text-center h-[45px] md:h-[50px] resize-none ${!userDetailsInfo.bio ? '' : 'font-normal'}`}
                        />
                    </div>

                    <div className='w-full'>
                        <p className='text-sm font-medium mb-1'>Current City</p>
                        <div className='w-full'>
                            <input 
                                type="text"
                                onChange={(e) => setUserDetailsInfo(prev => (
                                    { ...prev, livesIn: e.target.value }
                                ))}
                                value={userDetailsInfo.livesIn} 
                                placeholder='Enter city'
                                className={`w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm ${!userDetailsInfo.livesIn ? '' : 'font-normal'}`}
                            />
                        </div>
                    </div>

                    <div className='w-full'>
                        <p className='text-sm font-medium mb-1'>Home town</p>
                        <div className='w-full'>
                            <input 
                                type="text" 
                                onChange={(e) => setUserDetailsInfo(prev => (
                                    { ...prev, locFrom: e.target.value }
                                ))}
                                value={userDetailsInfo.locFrom} 
                                placeholder='Enter your home town'
                                className={`w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm ${!userDetailsInfo.locFrom ? '' : 'font-normal'}`}
                            />
                        </div>
                    </div>
                    
                    <div className='w-full'>
                        <div className='flex items-center text-center'>
                            <p className='text-sm font-medium mb-1'>
                                Followed by 
                                {userDetailsInfo.isFollowedShow && (
                                        <span className='text-sm text-red-500 font-normal'> (It will be shown on your profile.)</span>
                                )}
                            </p>
                        </div>
                        <div className='w-full'>
                            <div className='w-full flex flex-col'>
                                <label className="inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    value="" 
                                    className="sr-only peer" 
                                    onChange={(e) => setUserDetailsInfo(prev => (
                                        { ...prev, isFollowedShow: e.target.checked }
                                    ))}
                                    checked={userDetailsInfo.isFollowedShow} 
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-0 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <p className='ms-3 text-sm'> Followed by
                                    <span className='font-semibold text-sm'> {followersData?.totalFollowers} </span>people
                                </p>
                                </label>
                            </div>
                            
                        </div>
                    </div>

                    <div className='w-full'>
                        <p className='text-sm font-medium mb-1'>Study at </p>
                        <div className='w-full'>
                            <input 
                                type="text" 
                                onChange={(e) => setUserDetailsInfo(prev => (
                                    { ...prev, studyAt: e.target.value }
                                ))}
                                value={userDetailsInfo.studyAt}
                                placeholder='Enter school'
                                className={`w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm ${!userDetailsInfo.studyAt ? '' : 'font-normal'}`}
                            />
                        </div>
                    </div>

                    <div className='w-full'>
                        <p className='text-sm font-medium mb-1'>Work at </p>
                        <div className='w-full flex justify-between'>
                            <div className='w-[49%]'>
                                <input 
                                    type="text" 
                                    onChange={(e) => setUserDetailsInfo(prev => (
                                        { ...prev, companyName: e.target.value }
                                    ))}
                                    value={userDetailsInfo.companyName}
                                    placeholder='Enter company'
                                    className={`w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm ${!userDetailsInfo.companyName ? '' : 'font-normal'}`}
                                />
                            </div>
                            <div className='w-[49%]'>
                                <input 
                                    type="text" 
                                    onChange={(e) => setUserDetailsInfo(prev => (
                                        { ...prev, position: e.target.value }
                                    ))}
                                    value={userDetailsInfo.position}
                                    placeholder='Enter position'
                                    className={`w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm ${!userDetailsInfo.position ? '' : 'font-normal'}`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='w-full'>
                        <div className='flex items-center text-center'>
                            <p className='text-sm font-medium mb-1'>
                                Birthday
                                {userDetailsInfo.isDateBirthShow && (
                                        <span className='text-sm text-red-500 font-normal'> (It will be shown on your profile.)</span>
                                )}
                            </p>
                        </div>
                        <div className='w-full'>
                            <div className='w-full flex flex-col'>
                                <label className="inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    value="" 
                                    className="sr-only peer" 
                                    onChange={(e) => setUserDetailsInfo(prev => (
                                        { ...prev, isDateBirthShow: e.target.checked }
                                    ))}
                                    checked={userDetailsInfo.isDateBirthShow} 
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-0 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900">{formattedDate}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='w-full space-y-1'>
                        <p className='text-sm font-medium'>Your socials </p>
                        <div className='flex flex-col space-y-1'>
                            {mySocials.map((social, index) => (
                                <div key={index} className='flex justify-between items-center'>
                                    <div className='w-[75%]'>
                                        <a 
                                        href={social.url}
                                        className='w-full text-sm text-[#0866FF] '
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >{social.url}</a>
                                    </div>

                                    <div className='w-[20%] flex justify-between'>
                                        <button 
                                            onClick={() => handleUpdate(social.urlId)}
                                            className='w-[47%] flex justify-center p-1.5 text-white font-medium text-sm rounded bg-gray-200 hover:bg-gray-300'
                                        >
                                            <span className='text-[18px]'>
                                                <MdiPen/>
                                            </span>
                                        </button>
                                        <button 
                                            onClick={() => removeSocial(social.urlId)}
                                            className='w-[47%] flex justify-center p-1.5 text-white font-medium text-sm rounded bg-gray-200 hover:bg-gray-300'
                                        >
                                            <span className='text-[18px]'>
                                                <MaterialSymbolsDelete/>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='w-full flex justify-between'>
                            <input 
                                value={newSocialUrl}
                                onChange={(event) => setNewSocialUrl(event.target.value)}
                                type="text" 
                                placeholder='Enter your social link'
                                className='p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm w-[77%]'
                            />
                            {isUpdateLink ? (
                                <div className='w-[20%] flex justify-between'>
                                <button 
                                    onClick={cancelUpdate}
                                    className='w-[47%] flex justify-center p-1.5 text-black font-medium text-sm bg-gray-200 rounded  hover:bg-gray-300'
                                >
                                    <span className='text-[18px]'>
                                        <MdiCloseThick/>
                                    </span>
                                </button>
                                <button 
                                    onClick={addSocial}
                                    className='w-[47%] p-1.5 flex justify-center items-center text-black font-medium text-sm bg-blue-600 rounded  hover:bg-blue-700'
                                >
                                    <span className='text-[18px]'>
                                        <MingcuteCheck2Fill/>
                                    </span>
                                </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={addSocial}
                                    className='w-[20%] p-1.5 flex justify-center items-center text-center text-black font-medium text-sm bg-blue-600 rounded  hover:bg-blue-700'
                                >
                                    <span className='text-[18px]'>
                                        <MingcuteCheck2Fill/>
                                    </span>
                                </button>
                            )}
                            
                        </div>
                    </div>
                    <hr className="h-px bg-gray-200 border-0" />
                    <div className='w-full flex justify-center'>
                        <button 
                            onClick={handleSaveDetails}
                            className='w-full p-2 bg-gray-200 font-semibold hover:bg-gray-300'
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

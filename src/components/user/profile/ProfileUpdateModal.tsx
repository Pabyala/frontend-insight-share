import { ChangeEvent, useEffect, useState } from 'react'
import { MdiCloseThick } from '../../others/CustomIcons';
import { useGetUserQuery, useUploadBgPhotoMutation, useUploadProfilePhotoMutation } from '../../../features/users/usersApiSlice';
import DefaultImg from '../../../asset/DefaultImg.jpg'
import DefaultBg from '../../../asset/DefaultBg.png'
import { showToast } from '../../utils/ToastUtils';
import BeatLoading from '../../loading/BeatLoading';

interface ProfilePropsInterface {
    onClose: () => void;
}

export default function ProfileUpdateModal({onClose}: ProfilePropsInterface) {
    const { data: userInfo, refetch: refetchUserInfo  } = useGetUserQuery();
    const [uploadProfilePhoto, { isLoading: updateProfilePhotoLoading }] = useUploadProfilePhotoMutation();
    const [uploadBgPhoto, { isLoading: updateBgPhotoLoading }] = useUploadBgPhotoMutation();

    const initialProfileImageUrl = userInfo?.avatarUrl || DefaultImg;
    const initialBackgroundImageUrl = userInfo?.coverPhotoUrl || DefaultBg;

    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
    const [profilePreviewUrl, setProfilePreviewUrl] = useState<string>(initialProfileImageUrl);
    const [backgroundPreviewUrl, setBackgroundPreviewUrl] = useState<string>(initialBackgroundImageUrl);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false);
    const [isUpdatingBackground, setIsUpdatingBackground] = useState<boolean>(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    
    const handleUploadPhoto = (e: ChangeEvent<HTMLInputElement>, type: 'profile' | 'background') => {
        const file = e.target.files?.[0];
        if (!file) return; 

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (type === 'profile') {
                setProfileFile(file);
                setProfilePreviewUrl(reader.result as string);
                setIsUpdatingProfile(true);
                setIsUpdatingBackground(false);
            } else {
                setBackgroundFile(file);
                setBackgroundPreviewUrl(reader.result as string);
                setIsUpdatingBackground(true);
                setIsUpdatingProfile(false);
            }
        };
    };

    const handleCancel = (type: 'profile' | 'background') => {
        if (type === 'profile') {
            setProfilePreviewUrl(initialProfileImageUrl);
            setProfileFile(null);
            setIsUpdatingProfile(false);
            setIsUpdatingProfile(false);
        } else {
            setBackgroundPreviewUrl(initialBackgroundImageUrl);
            setBackgroundFile(null);
            setIsUpdatingBackground(false);
            setIsUpdatingBackground(false);
        }
    };

    const handleSave = async (type: 'profile' | 'background') => {
        try {
            if (type === 'profile' && profileFile) {
                await uploadProfilePhoto({image: profilePreviewUrl}).unwrap();
                refetchUserInfo();
                setIsUpdatingProfile(false);
                showToast("Updated successfully", 'success')
            } else if (type === 'background' && backgroundFile) {
                await uploadBgPhoto({image: backgroundPreviewUrl}).unwrap();
                refetchUserInfo();
                setIsUpdatingBackground(false);
                showToast("Updated successfully", 'success')
            }
        } catch (error) {
            showToast("Error updating image. Please try again.", 'error')
        }
    };
    
    return (
        <div 
            className='fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50'
        >
            <div className='relative p-4 w-full max-w-2xl max-h-full'>
                <div className='relative bg-white rounded-lg shadow p-5 space-y-3 lg:p-6'>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <p className='text-base font-semibold text-center'>Update your profile</p>
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
                    {/* Profile picture */}
                    <div className='flex flex-col w-full space-y-4'>
                        <div className='w-full flex justify-between'>
                            <p className='text-sm font-medium xl:text-base'>Profile picture</p>
                            <label htmlFor="photo-upload" className="text-sm font-medium text-blue-600 cursor-pointer xl:text-base">
                                Update
                            </label>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleUploadPhoto(e, 'profile')}
                                disabled={isUpdatingBackground}
                            />
                        </div>
                        {updateProfilePhotoLoading  ?  
                            (<div className='flex justify-center items-center w-[128px] h-[128px] lg:w-[168px] lg:h-[168px] mx-auto'>
                                    <BeatLoading/>
                            </div>)
                            : (<div className='w-[128px] h-[128px] rounded-full overflow-hidden border-4 border-gray-300 lg:w-[168px] lg:h-[168px] mx-auto'>
                                <img 
                                    src={profilePreviewUrl}
                                    alt="Profile"
                                    className='w-full h-full object-cover'
                                />
                            </div>)
                        }
                        {isUpdatingProfile && (
                            <div className='flex space-x-2 justify-center'>
                                <button 
                                    className='p-1.5 bg-gray-200 rounded text-sm hover:bg-gray-300' 
                                    onClick={() => handleCancel('profile')}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className={`py-1.5 px-3.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 ${updateProfilePhotoLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => handleSave('profile')}
                                    disabled={updateProfilePhotoLoading}
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Background photo */}
                    <div className='flex flex-col w-full space-y-4'>
                        <div className='w-full flex justify-between'>
                            <p className='text-sm font-medium xl:text-base'>Cover photo</p>
                            <label htmlFor="background-upload" className="text-sm font-medium text-blue-600 cursor-pointer xl:text-base">
                                Update
                            </label>
                            <input
                                id="background-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleUploadPhoto(e, 'background')}
                                disabled={isUpdatingProfile}
                            />
                        </div>
                        {updateBgPhotoLoading ? 
                            <div className='flex justify-center items-center h-[230px] lg:h-[280px] xl:h-[300px] lg:w-full mx-auto'>
                                <BeatLoading/>
                            </div> :
                            <div className='w-full h-[230px] overflow-hidden relative lg:h-[280px] xl:h-[300px] lg:w-full rounded border-[1px]'>
                                <img 
                                    src={backgroundPreviewUrl}
                                    alt="Background"
                                    className='w-full h-full object-cover rounded'
                                />
                            </div> 
                        }
                        {isUpdatingBackground && (
                            <div className='flex space-x-2 justify-center'>
                                <button 
                                    className='p-1.5 bg-gray-200 rounded text-sm hover:bg-gray-300' 
                                    onClick={() => handleCancel('background')}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className={`py-1.5 px-3.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 ${updateProfilePhotoLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => handleSave('background')}
                                    disabled={updateBgPhotoLoading}
                                > 
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

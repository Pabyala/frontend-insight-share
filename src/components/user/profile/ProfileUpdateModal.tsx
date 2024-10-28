import React, { ChangeEvent, useState } from 'react'
import { MdiCloseThick } from '../../others/CustomIcons';
import { useGetUserFollowersQuery, useGetUserQuery, useUpdateUserProfilePictureMutation, useUploadBgPhotoMutation, useUploadProfilePhotoMutation } from '../../../features/users/usersApiSlice';
import DefaultImg from '../../../asset/DefaultImg.jpg'
import DefaultBg from '../../../asset/DefaultBg.png'
import { UserInfo } from '../../../interface/user';

interface ProfilePropsInterface {
    onClose: () => void;
}

export default function ProfileUpdateModal({onClose}: ProfilePropsInterface) {
    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading, refetch: refetchUserInfo  } = useGetUserQuery();
    const { data: followersData, isLoading, isError } = useGetUserFollowersQuery();

    const [updateUserProfilePicture, { isLoading: isUpdating, error: updateError }] = useUpdateUserProfilePictureMutation();
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
                const response = await uploadProfilePhoto({image: profilePreviewUrl}).unwrap();
                console.log("Upload profile photo success:", response);
                refetchUserInfo();
                setIsUpdatingProfile(false);
                console.log("Profile picture updated successfully");
            } else if (type === 'background' && backgroundFile) {
                const response = await uploadBgPhoto({image: backgroundPreviewUrl}).unwrap();
                console.log("Upload background photo success:", response);
                refetchUserInfo();
                setIsUpdatingBackground(false);
                console.log("Background picture updated successfully");
            }
        } catch (error) {
            console.error("Error updating image:", error);
        }
    };
    
    

    return (
        <div 
            className='fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50'
        >
            <div className='relative p-4 w-full max-w-2xl max-h-full'>
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 p-5 space-y-3 lg:p-6'>
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
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
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
                        <div className='w-[128px] h-[128px] rounded-full overflow-hidden border-4 border-gray-300 lg:w-[168px] lg:h-[168px] mx-auto'>
                            <img 
                                // src='https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA' 
                                src={profilePreviewUrl}
                                // src={userInfo?.avatarUrl === '' ? DefaultImg : userInfo?.avatarUrl}
                                alt="Profile"
                                className='w-full h-full object-cover'
                            />
                        </div>
                        {isUpdatingProfile && (
                            <div className='flex space-x-2 justify-center'>
                                <button 
                                    className='p-1.5 bg-gray-200 rounded text-sm hover:bg-gray-300' 
                                    onClick={() => handleCancel('profile')}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className='py-1.5 px-3.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700'
                                    onClick={() => handleSave('profile')}
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
                            {/* <button className='text-base font-medium text-blue-600'>Update</button> */}
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
                        <div className='w-full h-[230px] overflow-hidden relative lg:h-[280px] xl:h-[300px] lg:w-full rounded border-[1px] dark:bg-gray-700'>
                            <img 
                                // src='https://0nepiece.netlify.app/static/media/strawhatpirates.eccf099b1766a064828c.jpg'
                                // src={userInfo?.coverPhotoUrl === '' ? DefaultBg : userInfo?.coverPhotoUrl}
                                src={backgroundPreviewUrl}
                                alt="Background"
                                className='w-full h-full object-cover rounded'
                            />
                        </div>
                        {isUpdatingBackground && (
                            <div className='flex space-x-2 justify-center'>
                                <button 
                                    className='p-1.5 bg-gray-200 rounded text-sm hover:bg-gray-300' 
                                    onClick={() => handleCancel('background')}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className='py-1.5 px-3.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700'
                                    onClick={() => handleSave('background')}
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

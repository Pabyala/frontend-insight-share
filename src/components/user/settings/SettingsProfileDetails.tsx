import React, { ChangeEvent, useEffect, useState } from 'react'
import { useGetUserQuery, useUpdateUsernameAndNameMutation, useUploadBgPhotoMutation, useUploadProfilePhotoMutation } from '../../../features/users/usersApiSlice';
import DefaultImg from '../../../asset/DefaultImg.jpg'
import DefaultBg from '../../../asset/DefaultBg.png'
import { UserProfileDataDisplay } from '../../../interface/user';
import ConfirmAlert from '../../alert/ConfirmAlert';

export default function SettingsProfileDetails() {

    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading, refetch: refetchUserInfo } = useGetUserQuery();
    const [updateUsernameAndName] = useUpdateUsernameAndNameMutation();
    const [uploadProfilePhoto, { isLoading: updateProfilePhotoLoading }] = useUploadProfilePhotoMutation();
    const [uploadBgPhoto, { isLoading: updateBgPhotoLoading }] = useUploadBgPhotoMutation();

    const [userProfileDetails, setUserProfileDetails] = useState<UserProfileDataDisplay>({
        username: '',
        firstName: '',
        middleName: '',
        lastName: '',
        avatarUrl: '',
        coverPhotoUrl: '',
    }); 
    const initialProfileImageUrl = userInfo?.avatarUrl || DefaultImg;
    const initialBackgroundImageUrl = userInfo?.coverPhotoUrl || DefaultBg;
    const [originalUserDetails, setOriginalUserDetails] = useState<UserProfileDataDisplay | null>(null);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
    const [profilePreviewUrl, setProfilePreviewUrl] = useState<string>(initialProfileImageUrl);
    const [backgroundPreviewUrl, setBackgroundPreviewUrl] = useState<string>(initialBackgroundImageUrl);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false);
    const [isUpdatingBackground, setIsUpdatingBackground] = useState<boolean>(false);
    const [showConfirmAlert, setShowConfirmAlert] = useState<boolean>(false);

    useEffect(() => {
        if (userInfo) {
            setUserProfileDetails((prev) => ({
                ...prev,
                username: userInfo.username || '',
                firstName: userInfo.firstName || '',
                middleName: userInfo.middleName || '',
                lastName: userInfo.lastName || '',
                avatarUrl: userInfo.avatarUrl || '',
                coverPhotoUrl: userInfo.coverPhotoUrl || '',
            }));
            //  for checking the original state
            setOriginalUserDetails({
                username: userInfo.username || '',
                firstName: userInfo.firstName || '',
                middleName: userInfo.middleName || '',
                lastName: userInfo.lastName || '',
                avatarUrl: userInfo.avatarUrl || '',
                coverPhotoUrl: userInfo.coverPhotoUrl || '',
            });
        }
    }, [userInfo]);

    // checking if the user details have changed to enable/disable Save button
    useEffect(() => {
        if (originalUserDetails) {
            setIsSaveDisabled(
                JSON.stringify(userProfileDetails) === JSON.stringify(originalUserDetails)
            );
        }
    }, [userProfileDetails, originalUserDetails]);


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

    const handleSaveUsernameAndName = async () => {
        if(!userProfileDetails.username || !userProfileDetails.firstName || !userProfileDetails.lastName) return alert("All fields are required.");
        
        try {
            await updateUsernameAndName({
                username: userProfileDetails.username,
                firstName: userProfileDetails.firstName,
                middleName: userProfileDetails.middleName,
                lastName: userProfileDetails.lastName,
            }).unwrap();
            refetchUserInfo();
        } catch (error) {
            console.log(error)
        }
        setShowConfirmAlert(false);
    }
    
    const handleCancelSave = () => {
        setShowConfirmAlert(false);
    };

    const revertToOriginalDetails = () => {
        if (originalUserDetails) {
            setUserProfileDetails(originalUserDetails);
        }
    };

        
    return (
        <>
            <div className='bg-white rounded lg:p-2'>
                <p className='p-2 text-sm font-semibold lg:text-base'>Profile Details</p>
                <hr className="h-px mx-2 bg-gray-200 border-0 dark:bg-gray-700" />
                <div className='space-y-1 p-2 lg:space-y-2'>

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
                                src={profilePreviewUrl}
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


                    <div className='w-full'>
                        <p className='text-sm font-medium mb-1'>Name</p>
                        <div className='w-full flex justify-between space-x-4   '>
                            <div className='w-full'>
                                <input 
                                    type="text" 
                                    value={userProfileDetails.firstName}
                                    onChange={(e) => setUserProfileDetails(prev => (
                                        { ...prev, firstName: e.target.value }
                                    ))}
                                    placeholder='Enter your first name'
                                    className='w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                                />
                            </div>
                            <div className='w-full'>
                                <input 
                                    type="text" 
                                    value={userProfileDetails.middleName}
                                    onChange={(e) => setUserProfileDetails(prev => (
                                        { ...prev, middleName: e.target.value }
                                    ))}
                                    placeholder='Enter your middle name'
                                    className='w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                                />
                            </div>
                            <div className='w-full'>
                                <input 
                                    type="text" 
                                    value={userProfileDetails.lastName}
                                    onChange={(e) => setUserProfileDetails(prev => (
                                        { ...prev, lastName: e.target.value }
                                    ))}
                                    placeholder='Enter your last name'
                                    className='w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='w-full'>
                        <p className='text-sm font-medium mb-1'>Username</p>
                        <div className='w-full'>
                            <input 
                                type="text"
                                value={userProfileDetails.username} 
                                onChange={(e) => setUserProfileDetails(prev => (
                                    { ...prev, username: e.target.value }
                                ))}
                                placeholder='Enter your username'
                                className='w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                            />
                        </div>
                    </div>

                    <div className='w-full flex space-x-4'>
                        <button 
                            onClick={() => setShowConfirmAlert(true)}
                            disabled={isSaveDisabled}
                            className={`w-full p-2 ${isSaveDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'} text-white rounded`}
                        >
                            Save Changes
                        </button>
                        <button 
                            onClick={revertToOriginalDetails}
                            disabled={isSaveDisabled}
                            className={`w-full p-1.5 ${isSaveDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500'} text-white rounded`}
                        >
                            Revert to Original
                        </button>
                    </div>

                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                </div>
            </div>
            {showConfirmAlert && (
                <ConfirmAlert
                    message='Are you sure you want to save the changes?'
                    onConfirm={handleSaveUsernameAndName}
                    onCancel={handleCancelSave}
                />
            )}
        </>
    )
}
import { useEffect, useState } from 'react'
import { MaterialSymbolsDelete, MdiCloseThick, MdiPen, MingcuteCheck2Fill } from '../../others/CustomIcons'
import { v4 as uuidv4 } from 'uuid';
import { useGetUserQuery, useUpdateUserPersonalDetailsSettingsMutation } from '../../../features/users/usersApiSlice';
import { UserDetails } from '../../../interface/user';
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";
import { dropdownValues, dropdownValuesStatus } from '../../../data/dropdown-values';
import ConfirmAlert from '../../alert/ConfirmAlert';
import { showToast } from '../../utils/ToastUtils';

interface SocialLink {
    urlId: string;
    url: string;
}

export default function SettingsPersonalDetails() {

    const { data: userInfo, refetch: refetchUserInfo } = useGetUserQuery();
    const [updateUserPersonalDetails] = useUpdateUserPersonalDetailsSettingsMutation();

    const [userDetailsInfo, setUserDetailsInfo] = useState<UserDetails>({
        bio: '',
        livesIn: '',
        locFrom: '',
        companyName: '',
        position: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        status: '',
        studyAt: '',
        socials: [],
    }); 
    const [mySocials, setMySocials] = useState<SocialLink[]>([]);
    const [newSocialUrl, setNewSocialUrl] = useState<string>('');
    const [editingSocial, setEditingSocial] = useState<string | null>(null);
    const [isUpdateLink, setIsUpdateLink]  = useState<boolean>(false)
    const [originalUserDetails, setOriginalUserDetails] = useState<UserDetails | null>(null);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isActiveGender, setIsActiveGender] = useState<boolean>(false)
    const [isActiveStatus, setIsActiveStatus] = useState<boolean>(false)
    const [showConfirmAlert, setShowConfirmAlert] = useState<boolean>(false);
    
    // setting initial user details and user socials once userInfo is loaded
    useEffect(() => {
        if (userInfo) {
            setUserDetailsInfo((prev) => ({
                ...prev,
                bio: userInfo.bio || '',
                livesIn: userInfo.livesIn || '',
                locFrom: userInfo.locFrom || '',
                companyName: userInfo.workAt?.companyName || '',
                position: userInfo.workAt?.position || '',
                dateOfBirth: userInfo.dateOfBirth || '',
                gender: userInfo.gender || '',
                phoneNumber: userInfo.phoneNumber || '',
                status: userInfo.userStatus || '',
                studyAt: userInfo.studyAt || '',
                socials: userInfo.socials || [],
            }));
            //  for checking the original state
            setOriginalUserDetails({
                bio: userInfo.bio || '',
                livesIn: userInfo.livesIn || '',
                locFrom: userInfo.locFrom || '',
                companyName: userInfo.workAt?.companyName || '',
                position: userInfo.workAt?.position || '',
                dateOfBirth: userInfo.dateOfBirth || '',
                gender: userInfo.gender || '',
                phoneNumber: userInfo.phoneNumber || '',
                status: userInfo.userStatus || '',
                studyAt: userInfo.studyAt || '',
                socials: userInfo.socials || [],
            });
        }
    }, [userInfo]);
    
    // checking if the user details have changed to enable/disable Save button
    useEffect(() => {
        if (originalUserDetails) {
            setIsSaveDisabled(
                JSON.stringify(userDetailsInfo) === JSON.stringify(originalUserDetails)
            );
        }
    }, [userDetailsInfo, originalUserDetails]);

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
                dateOfBirth: userDetailsInfo.dateOfBirth,
                socials: mySocials,
            };
            await updateUserPersonalDetails(updatedUserDetails).unwrap();
            refetchUserInfo();
        } catch (error) {
            showToast("Something went wrong. Please try again.", "error")
        }
        setShowConfirmAlert(false);
    }

    const handleCancelSave = () => {
        setShowConfirmAlert(false);
    };

    const revertToOriginalDetails = () => {
        if (originalUserDetails) {
            setUserDetailsInfo(originalUserDetails);
        }
    };

    const handleShowDropdownSelection = (type: string) => {
        if(type === 'gender') {
            setIsActiveGender(!isActiveGender)
            setIsActiveStatus(false)
        } else if(type === 'status') {
            setIsActiveStatus(!isActiveStatus)
            setIsActiveGender(false)
        } else {
            setIsActiveStatus(false)
            setIsActiveGender(false)
        }
    }

    const handleSelect = (value: string) => {
        setUserDetailsInfo((prev) => ({
            ...prev,
            gender: value,
        }));
        setIsActiveGender(false);
    };

    return (
        <>
            <div className='bg-white rounded lg:p-2'>
                <p className='p-2 text-sm font-semibold lg:text-base'>Personal Details</p>
                <hr className="h-px mx-2 bg-gray-200 border-0 dark:bg-gray-700" />
                <div className='space-y-1 p-2 lg:space-y-2'>
                    
                    <div className='w-full'>
                        <p className='text-sm font-medium mb-1'>Set your bio</p>
                        <textarea 
                            value={userDetailsInfo.bio}
                            onChange={(e) => { if(e.target.value.length <= 200) {
                                setUserDetailsInfo((prev) => ({
                                    ...prev, 
                                    bio: e.target.value
                                }))
                            }}}
                            placeholder="Describe who you are"
                            className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none rounded text-sm text-center h-[45px] md:h-[50px] resize-none"
                        />
                    </div>

                    <div className='w-full'>
                        <p className='text-sm font-medium mb-1'>Current City</p>
                        <div className='w-full'>
                            <input 
                                type="text"
                                value={userDetailsInfo.livesIn} 
                                onChange={(e) => setUserDetailsInfo(prev => (
                                    { ...prev, livesIn: e.target.value }
                                ))}
                                placeholder='Enter your city'
                                className='w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                            />
                        </div>
                    </div>

                    <div className='w-full'>
                        <p className='text-sm font-medium mb-1'>Home town</p>
                        <div className='w-full'>
                            <input 
                                type="text" 
                                value={userDetailsInfo.locFrom} 
                                onChange={(e) => setUserDetailsInfo(prev => (
                                    { ...prev, locFrom: e.target.value }
                                ))}
                                placeholder='Enter your home town'
                                className='w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                            />
                        </div>
                    </div>

                    <div className='w-full'>
                        <p className='text-sm font-medium mb-1'>Study at</p>
                        <div className='w-full'>
                            <input 
                                type="text" 
                                value={userDetailsInfo.studyAt} 
                                onChange={(e) => setUserDetailsInfo(prev => (
                                    { ...prev, studyAt: e.target.value }
                                ))}
                                placeholder='Enter your school'
                                className='w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                            />
                        </div>
                    </div>

                    <div className='w-full'>
                        <p className='text-sm font-medium mb-1'>Work at </p>
                        <div className='w-full flex justify-between space-x-4   '>
                            <div className='w-full'>
                                <input 
                                    type="text" 
                                    value={userDetailsInfo.companyName}
                                    onChange={(e) => setUserDetailsInfo(prev => (
                                        { ...prev, companyName: e.target.value }
                                    ))}
                                    placeholder='Enter company'
                                    className='w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                                />
                            </div>
                            <div className='w-full'>
                                <input 
                                    type="text" 
                                    value={userDetailsInfo.position}
                                    onChange={(e) => setUserDetailsInfo(prev => (
                                        { ...prev, position: e.target.value }
                                    ))}
                                    placeholder='Enter position'
                                    className='w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex space-x-4'>
                        <div  className='w-full'>
                            <p className='text-sm font-medium mb-1'>Birthday</p>
                            <div className='flex flex-col space-y-1'>
                                <input 
                                    className='w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                                    type="date" 
                                    placeholder='Date'
                                    onChange={(e) => setUserDetailsInfo(prev => (
                                        { ...prev, dateOfBirth: e.target.value }
                                    ))}
                                    value={userDetailsInfo.dateOfBirth}
                                    name=""
                                    id=""
                                />
                            </div>
                        </div>

                        <div  className='w-full'>
                            <p className='text-sm font-medium mb-1'>Gender</p>
                            <div className='flex flex-col space-y-1 relative'>
                                <div 
                                    className='w-full flex justify-between p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                                    onClick={() => handleShowDropdownSelection("gender")}
                                >
                                        <span>{userDetailsInfo.gender || 'Select Gender'}</span>
                                        <span className='flex items-center justify-center'>
                                            {isActiveGender ?  <BiSolidDownArrow /> : <BiSolidUpArrow />}
                                        </span>
                                </div>
                                {isActiveGender && (
                                    <div className="w-full border border-gray-300 rounded bg-white max-h-40 overflow-auto absolute top-[110%] left-0 z-50">
                                        {dropdownValues.map((value, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleSelect(value)}
                                                className="px-2 py-1.5 cursor-pointer hover:bg-gray-200 text-sm"
                                            >
                                                {value}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    

                    <div className='flex space-x-4'>
                        <div  className='w-full'>
                            <p className='text-sm font-medium mb-1'>Phone Number</p>
                            <div className='flex flex-col space-y-1'>
                                <input 
                                    type="number"
                                    value={userDetailsInfo.phoneNumber} 
                                    onChange={(e) => { if(e.target.value.length <= 11) {
                                        setUserDetailsInfo((prev) => ({
                                            ...prev, 
                                            phoneNumber: e.target.value
                                        }))
                                    }}}
                                    placeholder='Enter phone number'
                                    className='w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                                    style={{
                                        appearance: 'none',
                                        MozAppearance: 'textfield',
                                        WebkitAppearance: 'none',
                                    }}
                                />
                            </div>
                        </div>

                        <div  className='w-full'>
                            <p className='text-sm font-medium mb-1'>Status</p>
                            <div className='flex flex-col space-y-1 relative'>
                                <div 
                                    className='w-full flex justify-between p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                                    onClick={() => handleShowDropdownSelection("status")}
                                >
                                        <span>{userDetailsInfo.status || 'Select Status'}</span>
                                        <span className='flex items-center justify-center'>
                                            {isActiveStatus ?  <BiSolidDownArrow /> : <BiSolidUpArrow />}
                                        </span>
                                </div>
                                {isActiveStatus && (
                                    <div className="w-full border border-gray-300 rounded bg-white max-h-40 overflow-auto absolute top-[110%] left-0 z-50">
                                        {dropdownValuesStatus.map((value, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleSelect(value)}
                                                className="px-2 py-1.5 cursor-pointer hover:bg-gray-200 text-sm"
                                            >
                                                {value}
                                            </div>
                                        ))}
                                    </div>
                                )}
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

                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />

                    <div className='w-full flex space-x-4'>
                        <button 
                            onClick={() => setShowConfirmAlert(true)}
                            disabled={isSaveDisabled}
                            className={`w-full p-1.5 ${isSaveDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'} text-white rounded`}
                        >
                            Save changes
                        </button>
                        <button 
                            onClick={revertToOriginalDetails}
                            disabled={isSaveDisabled}
                            className={`w-full p-1.5 ${isSaveDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500'} text-white rounded`}
                        >
                            Revert to Original
                        </button>
                    </div>
                </div>
            </div>
            {showConfirmAlert && (
                <ConfirmAlert
                    message='Are you sure you want to save the changes?'
                    onConfirm={handleSaveDetails}
                    onCancel={handleCancelSave}
                />
            )}
        </>
    )
}
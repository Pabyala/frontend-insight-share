import React, { useState } from 'react'
import { BxsUpArrow, FeArrowRight } from '../../others/CustomIcons'

export default function SettingsProfileDetails() {

    const [activeElement, setActiveElement] = useState<string | null>(null);
    const [isBtnDisable, setIsBtnDisable] = useState<boolean>(true);

    const toggleAccordion = (section: string) => {
        setActiveElement((prevSection) => (prevSection === section ? null : section));
    };

    return (
        <div className='bg-white rounded lg:p-2'>
            <p className='p-2 text-sm font-medium lg:text-base'>Profile Details</p>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <div className='space-y-1 p-2 lg:space-y-2'>
                {/* Name(Firstname, Middlename, Lastname) */}
                <div
                    onClick={() => toggleAccordion('name')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'name' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'name' ? 'font-medium' : ''}`}>Name</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'name' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2 overflow-hidden transition-all duration-500 ease-in-out ${activeElement === 'name' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            {/* <label htmlFor="" className='text-sm'>
                                First Name
                            </label> */}
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="text" 
                                placeholder='First Name'
                                name="" 
                                id=""
                            />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            {/* <label htmlFor="" className='text-sm'>
                                Middle Name
                            </label> */}
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="text" 
                                placeholder='Middle Name'
                                name="" 
                                id=""
                            />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            {/* <label htmlFor="" className='text-sm'>
                                Last Name
                            </label> */}
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="text" 
                                placeholder='Last Name'
                                name="" 
                                id=""
                            />
                        </div>
                        
                        <button
                            className='text-sm p-1.5 mt-2.5 text-white font-normal rounded bg-blue-600'
                            // disabled={true}
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* Username */}
                <div
                    onClick={() => toggleAccordion('username')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'username' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'username' ? 'font-medium' : ''}`}>Username</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'username' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2 overflow-hidden transition-all duration-500 ease-in-out ${activeElement === 'username' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="text" 
                                placeholder='Username'
                                name="" 
                                id=""
                            />
                        </div>
                        <button
                            className='text-sm p-1.5 mt-2.5 text-white font-normal rounded bg-blue-600'
                            disabled={true}
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* Profile picture */}
                <div
                    onClick={() => toggleAccordion('profile-picture')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'profile-picture' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className='lg:text-base'>Profile picture</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'profile-picture' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`space-y-2 py-2 overflow-hidden rounded-b-lg transition-all duration-500 ease-in-out lg:space-y-2.5 bg-gray-200 p-2 ${activeElement === 'profile-picture' ? 'h-fit' : 'max-h-0 hidden'}`}
                >
                    <div className='w-[128px] h-[128px] rounded-full overflow-hidden border-4 border-white lg:w-[168px] lg:h-[168px] mx-auto'>
                        <img 
                            src='https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA' 
                            // src={profilePreviewUrl}
                            // src={userInfo?.avatarUrl === '' ? DefaultImg : userInfo?.avatarUrl}
                            alt="Profile"
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        {/* <p className='text-sm font-medium xl:text-base'>Profile picture</p> */}
                        <button className='w-full py-1 px-2 bg-blue-600 flex items-center justify-center rounded'>
                            <label htmlFor="background-upload" className="text-sm font-normal text-white cursor-pointer xl:text-base">
                                Update
                            </label>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                // onChange={(e) => handleUploadPhoto(e, 'profile')}
                                // disabled={isUpdatingBackground}
                            />
                        </button>
                    </div>
                </div>

                {/* Background photo */}
                <div
                    onClick={() => toggleAccordion('background-photo')}
                    className={`p-2 text-sm rounded bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'profile-picture' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className='lg:text-base'>Background photo</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'background-photo' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`space-y-2 py-2 rounded-b-lg overflow-hidden transition-all duration-500 ease-in-out lg:space-y-2.5 bg-gray-200 p-2 ${activeElement === 'background-photo' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className='w-full h-[230px] overflow-hidden relative lg:h-[280px] xl:h-[300px] lg:w-full rounded border-[1px] dark:bg-gray-700'>
                        <img 
                            src='https://0nepiece.netlify.app/static/media/strawhatpirates.eccf099b1766a064828c.jpg'
                            // src={userInfo?.coverPhotoUrl === '' ? DefaultBg : userInfo?.coverPhotoUrl}
                            // src={backgroundPreviewUrl}
                            alt="Background"
                            className='w-full h-full object-cover rounded'
                        />
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <button className='w-full py-1 px-2 bg-blue-600 flex items-center justify-center rounded'>
                            <label htmlFor="background-upload" className="text-sm font-normal text-white cursor-pointer xl:text-base">
                                Update
                            </label>
                            <input
                                id="background-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                // onChange={(e) => handleUploadPhoto(e, 'background')}
                                // disabled={isUpdatingProfile}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

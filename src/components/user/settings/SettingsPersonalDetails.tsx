import React, { useState } from 'react'
import { FeArrowRight, MaterialSymbolsDelete, MdiPen, MingcuteCheck2Fill } from '../../others/CustomIcons'
import CustomDatePicker from '../../others/CustomDatePicker';

export default function SettingsPersonalDetails() {

    const [activeElement, setActiveElement] = useState<string | null>(null);

    const toggleAccordion = (section: string) => {
        setActiveElement((prevSection) => (prevSection === section ? null : section));
    };

    const handleDateChange = (date: string) => {
        console.log(date)
    };

    return (
        <div className='bg-white rounded lg:p-2'>
            <p className='p-2 text-sm font-medium lg:text-base'>Personal Details</p>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <div className='space-y-1 p-2 lg:space-y-2'>
                
                {/* Bio */}
                <div
                    onClick={() => toggleAccordion('bio')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'bio' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'bio' ? 'font-medium' : ''}`}>Bio</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'bio' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2 overflow-hidden transition-all duration-500 ease-in-out ${activeElement === 'bio' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="text" 
                                placeholder='Bio'
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

                {/* LiveIn */}
                <div
                    onClick={() => toggleAccordion('lives-in')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'lives-in' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'lives-in' ? 'font-medium' : ''}`}>Lives in</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'lives-in' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2 overflow-hidden transition-all duration-500 ease-in-out ${activeElement === 'lives-in' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="text" 
                                placeholder='Lives in'
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

                {/* From */}
                <div
                    onClick={() => toggleAccordion('from')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'from' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'from' ? 'font-medium' : ''}`}>From</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'from' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2 overflow-hidden transition-all duration-500 ease-in-out ${activeElement === 'from' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="text" 
                                placeholder='From'
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

                {/* Study at */}
                <div
                    onClick={() => toggleAccordion('study-at')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'study-at' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'study-at' ? 'font-medium' : ''}`}>Study</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'study-at' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2 overflow-hidden transition-all duration-500 ease-in-out ${activeElement === 'study-at' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="text" 
                                placeholder='Study'
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

                {/* Work at */}
                <div
                    onClick={() => toggleAccordion('work-at')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'work-at' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'work-at' ? 'font-medium' : ''}`}>Work</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'work-at' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2 overflow-hidden transition-all duration-500 ease-in-out ${activeElement === 'work-at' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="text" 
                                placeholder='Company'
                                name="" 
                                id=""
                            />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="text" 
                                placeholder='Position'
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

                {/* Birthday */}
                <div
                    onClick={() => toggleAccordion('my-bday')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'my-bday' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'my-bday' ? 'font-medium' : ''}`}>Birthday</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'my-bday' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2  transition-all duration-500 ease-in-out ${activeElement === 'my-bday' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="date" 
                                placeholder='Company'
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


                {/* Date started */}
                <div
                    onClick={() => toggleAccordion('date-started')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'date-started' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'date-started' ? 'font-medium' : ''}`}>Date joined</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'date-started' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2  transition-all duration-500 ease-in-out ${activeElement === 'date-started' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="date" 
                                placeholder='Date join'
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

                {/* Gender */}
                <div
                    onClick={() => toggleAccordion('gender')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'gender' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'gender' ? 'font-medium' : ''}`}>Gender</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'gender' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2  transition-all duration-500 ease-in-out ${activeElement === 'gender' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="text" 
                                placeholder='Gender'
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

                {/* Phone number */}
                <div
                    onClick={() => toggleAccordion('number')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'number' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'number' ? 'font-medium' : ''}`}>Phone Number</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'number' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2  transition-all duration-500 ease-in-out ${activeElement === 'number' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="number" 
                                placeholder='Number'
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

                {/* User status */}
                <div
                    onClick={() => toggleAccordion('status')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'status' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'status' ? 'font-medium' : ''}`}>Status</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'status' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2  transition-all duration-500 ease-in-out ${activeElement === 'status' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5">
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="text" 
                                placeholder='Status'
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


                {/* My socials */}
                <div
                    onClick={() => toggleAccordion('my-socials')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'my-socials' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'my-socials' ? 'font-medium' : ''}`}>My socials</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'my-socials' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2  transition-all duration-500 ease-in-out ${activeElement === 'my-socials' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            <div className='w-full flex flex-col justify-between items-center space-y-1'>
                                    <div className='flex w-full justify-between'>
                                        <div className='w-[75%]'>
                                            <a 
                                            href='https://marfportfolio.netlify.app'
                                            className='w-full text-sm text-[#0866FF] '
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            >https://marfportfolio.netlify.app</a>
                                        </div>
                                        <div className='w-[20%] flex justify-between'>
                                            <button 
                                                // onClick={() => handleUpdate(social.urlId)}
                                                className='w-[47%] flex justify-center p-1.5 text-white font-medium text-sm rounded bg-gray-200 hover:bg-gray-300'
                                            >
                                                <span className='text-[18px]'>
                                                    <MdiPen/>
                                                </span>
                                            </button>
                                            <button 
                                                // onClick={() => removeSocial(social.urlId)}
                                                className='w-[47%] flex justify-center p-1.5 text-white font-medium text-sm rounded bg-gray-200 hover:bg-gray-300'
                                            >
                                                <span className='text-[18px]'>
                                                    <MaterialSymbolsDelete/>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex w-full justify-between'>
                                        <div className='w-[75%]'>
                                            <a 
                                            href='https://github.com/Pabyala'
                                            className='w-full text-sm text-[#0866FF] '
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            >https://github.com/Pabyala</a>
                                        </div>

                                        <div className='w-[20%] flex justify-between'>
                                            <button 
                                                // onClick={() => handleUpdate(social.urlId)}
                                                className='w-[47%] flex justify-center p-1.5 text-white font-medium text-sm rounded bg-gray-200 hover:bg-gray-300'
                                            >
                                                <span className='text-[18px]'>
                                                    <MdiPen/>
                                                </span>
                                            </button>
                                            <button 
                                                // onClick={() => removeSocial(social.urlId)}
                                                className='w-[47%] flex justify-center p-1.5 text-white font-medium text-sm rounded bg-gray-200 hover:bg-gray-300'
                                            >
                                                <span className='text-[18px]'>
                                                    <MaterialSymbolsDelete/>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='w-full flex justify-between'>
                                        <input 
                                            // value={newSocialUrl}
                                            // onChange={(event) => setNewSocialUrl(event.target.value)}
                                            type="text" 
                                            placeholder='Enter your social'
                                            className='text-sm py-1.5 px-2 font-light focus:outline-none rounded w-[77%]'
                                        />
                                        <button 
                                            // onClick={addSocial}
                                            className='w-[20%] p-1.5 flex justify-center items-center text-center text-black font-medium text-sm bg-blue-600 rounded  hover:bg-blue-700'
                                        >
                                            <span className='text-[18px]'>
                                                <MingcuteCheck2Fill/>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                        </div>
                        <button
                            className='text-sm p-1.5 mt-2.5 text-white font-normal rounded bg-blue-600'
                            disabled={true}
                        >
                            Save
                        </button>
                    </div>
                </div>

                
            </div>
        </div>
    )
}
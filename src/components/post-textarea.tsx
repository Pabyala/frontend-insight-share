import { Avatar } from "@mui/material";
import React from "react";
import { SolarCloseSquareBoldDuotone } from "./custom-icons";

interface closePostTextArea {
    onClose: () => void
}

export default function PostTextArea({ onClose }: closePostTextArea) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10">
            <div className="relative w-full mx-5 bg-white rounded-lg shadow px-5 flex md:w-3/5 lg:w-1/3">
                {/* <button
                    type="button"
                    className="absolute text-3xl top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg  ml-auto inline-flex items-center popup-close"
                    onClick={onClose}
                >
                    <SolarCloseSquareBoldDuotone />
                </button> */}

                <div className="flex flex-col w-full">
                    <div className="py-5 space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="text-center">
                                <p className="text-base font-bold leading-5 text-slate-900">
                                Create post
                                </p>
                            </div>
                            <div className="flex justify-end items-center">
                                <button
                                    type="button"
                                    className="text-3xl bg-gray-100 text-gray-400 bg-transparent hover:bg-gray-200 hover: rounded-lg  ml-auto inline-flex items-center popup-close"
                                    onClick={onClose}
                                >
                                    <SolarCloseSquareBoldDuotone />
                                </button>
                            </div>
                        </div>
                        <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
                        <div className="flex space-x-4 mb-3">
                            <Avatar
                                sx={{ width: 40, height: 40 }}
                                alt="Remy Sharp"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            />
                            <div className='flex items-center font-semibold  '>
                                <span className='text-sm'>Eleomar F. Fajutnao</span>
                            </div>
                        </div>
                        <div>
                            <textarea 
                                name="" 
                                id=""
                                className="w-full text-base p-2 rounded-md bg-customGray border outline-none resize-none max-h-32 overflow-y-auto min-h-28"
                                placeholder="What's on your mind?"
                            >

                            </textarea>
                        </div>
                        <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
                        <div>
                            <button className="bg-gray-100 w-full p-2 text-sm font-semibold rounded text-slate-500 hover:bg-gray-200">
                                Post
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

import { Avatar } from "@mui/material";
import React from "react";
import { SolarCloseSquareBoldDuotone } from "./custom-icons";

interface closePostTextArea {
    onClose: () => void
}

export default function PostTextArea({ onClose }: closePostTextArea) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10">
            <div className="relative mx-5 bg-white rounded-lg shadow px-10 flex">
                <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center popup-close"
                    onClick={onClose}
                >
                    <SolarCloseSquareBoldDuotone />
                </button>

                <div className="flex flex-col">
                    <div className="py-7">
                        <div className="text-center">
                            <p className="text-base font-bold leading-5 text-slate-900">
                            Create post
                            </p>
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
                                className="w-full text-xs p-2 rounded-md bg-gray-100 border outline-none resize-none max-h-32 overflow-y-auto"
                                placeholder="What's on your mind?"
                            >

                            </textarea>
                        </div>
                    </div>
                    <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
                    <button>Post</button>
                </div>
            </div>
        </div>
    );
}

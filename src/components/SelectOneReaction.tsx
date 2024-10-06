import React from 'react'
import { AntDesignDislikeFilled, NotoOrangeHeart, TwemojiFire, TwemojiRaisingHands } from './custom-icons'

export default function SelectOneReaction() {
  return (
    <div className="flex items-center space-x-0.5 bg-white w-fit p-1 rounded-full border border-gray-200">
        <div className='cursor-pointer'>
            <div className="bg-slate-400 p-1 rounded-full border-white border-2 hover:scale-150 transition-transform duration-200 ease-in-out">
                <span className="flex items-center">
                    <TwemojiFire />
                </span>
            </div>
        </div>
        <div className='cursor-pointer'>
            <div className="bg-slate-400 p-1 rounded-full border-white border-2 hover:scale-150 transition-transform duration-200 ease-in-out">
                <span className="flex items-center hover:text-base">
                    <TwemojiRaisingHands />
                </span>
            </div>
        </div>
        <div className='cursor-pointer'>
            <div className="bg-slate-400 p-1 rounded-full border-white border-2 hover:scale-150 transition-transform duration-200 ease-in-out">
                <span className="flex items-center">
                    <AntDesignDislikeFilled />
                </span>
            </div>
        </div>
        <div className='cursor-pointer'>
            <div className="bg-slate-400 p-1 rounded-full border-white border-2 hover:scale-150 transition-transform duration-200 ease-in-out">
                <span className="flex items-center">
                    <NotoOrangeHeart />
                </span>
            </div>
        </div>
  </div>
  )
}
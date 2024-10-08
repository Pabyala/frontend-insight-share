import React from 'react'

export default function Sponsored() {
    return (
        <div className=''>
            <p className='text-base font-semibold mb-1'>Sponsored</p>
                <div className='flex flex-col space-y-3'>
                    <div className='flex bg-white rounded-lg overflow-hidden'>
                        <div className='w-2/5 flex'>
                            <img 
                                className='h-auto max-w-full'
                                src="https://fastly.picsum.photos/id/151/256/256.jpg?hmac=5JznTCRG06RAwbuME5_NM9HUIGhg9zyUOiN0kADCSrU" 
                                alt="" 
                            />
                        </div>
                        <div className='w-3/5 p-2 flex flex-col justify-center'>
                            <p className='text-sm font-semibold'>Get extra 30% off. Birthday Sale!</p>
                            <a href="https://www.lipsum.com/" className='text-xs text-slate-500'>lipson</a>
                        </div>
                    </div>
                    <div className='flex bg-white rounded-lg overflow-hidden'>
                        <div className='w-2/5 flex'>
                            <img 
                                className='h-auto max-w-full'
                                src="https://fastly.picsum.photos/id/675/256/256.jpg?hmac=AW5Mgcr1tK21m-ozr3rWm6dVt1N5R4Uh4__qynMEsg4" 
                                alt="" 
                            />
                        </div>
                        <div className='w-3/5 p-2 flex flex-col justify-center'>
                            <p className='text-sm font-semibold'>Learn Full Stack Developer</p>
                            <a href="https://www.lipsum.com/" className='text-xs text-slate-500'>lipson</a>
                        </div>
                    </div>
                </div>
        </div>
    )
}

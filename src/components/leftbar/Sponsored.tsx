import { Link } from "react-router-dom"

export default function Sponsored() {
    return (
        <div className=''>
            <p className='text-sm font-semibold mb-1.5 lg:text-base'>Sponsored</p>
                <div className='flex flex-col space-y-3'>
                    <Link to='/' role="link"  className='flex bg-white rounded-lg overflow-hidden'>
                        <div className='w-2/5 flex'>
                            <img 
                                className='h-auto max-w-full'
                                src="https://fastly.picsum.photos/id/151/256/256.jpg?hmac=5JznTCRG06RAwbuME5_NM9HUIGhg9zyUOiN0kADCSrU" 
                                alt="" 
                            />
                        </div>
                        <div className='w-3/5 p-2 flex flex-col justify-center'>
                            <p className='text-sm font-semibold'>Looking for sponsored</p>
                            <p className='text-xs text-slate-500'>LF</p>
                        </div>
                    </Link>
                    <Link to='/' role="link" className='flex bg-white rounded-lg overflow-hidden'>
                        <div className='w-2/5 flex'>
                            <img 
                                className='h-auto max-w-full'
                                src="https://fastly.picsum.photos/id/675/256/256.jpg?hmac=AW5Mgcr1tK21m-ozr3rWm6dVt1N5R4Uh4__qynMEsg4" 
                                alt="" 
                            />
                        </div>
                        <div className='w-3/5 p-2 flex flex-col justify-center'>
                            <p className='text-sm font-semibold'>Looking for sponsored</p>
                            <p className='text-xs text-slate-500'>LF</p>
                        </div>
                    </Link>
                </div>
        </div>
    )
}

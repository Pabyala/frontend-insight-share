import React from 'react'
import CreatePost from './CreatePost'
import Posts from './Posts'

export default function Timeline() {
    return (
        <div className='flex w-full flex-col lg:w-[55%] xl:w-[45%]'>
            <CreatePost/>
            <Posts/>
        </div>
    )
}

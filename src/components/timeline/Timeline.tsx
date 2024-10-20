import React from 'react'
import CreatePost from '../post/CreatePost'
import Posts from '../post/Posts'

export default function Timeline() {
    return (
        <div className='flex w-full flex-col lg:w-[55%] xl:w-[45%]'>
            <CreatePost/>
            <Posts/>
        </div>
    )
}

import React from 'react'
import MainContainer from '../components/timeline/MainContainer'
import Navbar from '../components/navbar/Navbar'

export default function Home() {
  return (
    <div className='flex flex-col pb-5'>
      <Navbar/>
      <MainContainer/>
    </div>
  )
}

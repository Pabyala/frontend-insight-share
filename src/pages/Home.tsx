import React, { useEffect } from 'react'
import MainContainer from '../components/timeline/MainContainer'
import Navbar from '../components/navbar/Navbar'
import { io } from 'socket.io-client';

// const socket = io('http://localhost:8000', { reconnection: true });


export default function Home() {

  // useEffect(() => {
  //       console.log('SOCKET IO', socket)

  //       return () => {
  //         socket.disconnect(); // Cleanup on unmount
  //     };
  // }, [])

  return (
    <div className='flex flex-col pb-5'>
      <Navbar/>
      <MainContainer/>
    </div>
  )
}

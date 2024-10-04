import React from 'react'
import LeftContainer from './left-container'
import CenterContainer from './center-container'
import RightContainer from './right-container'

export default function MainContainer() {
  return (
    <div className='container'>
      <div className='flex justify-between px-3'>
        <LeftContainer />
        <CenterContainer />
        <RightContainer />
      </div>
    </div>
  )
}

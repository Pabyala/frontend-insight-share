import React from 'react'
import Sponsored from './Sponsored'
import SuggestedFollowing from './SuggestedFollowing'

export default function RightContainer() {
  return (
    <div className='hidden w-3/12 space-y-3 h-screen xl:block'>
      <Sponsored/>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <SuggestedFollowing/>
    </div>
  )
}

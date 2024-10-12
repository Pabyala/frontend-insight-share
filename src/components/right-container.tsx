import React from 'react'
import Sponsored from './Sponsored'
import SuggestedFollowing from './SuggestedFollowing'

export default function RightContainer() {
  return (
    <div className='hidden w-3/12 xl:block overflow-hidden bg-slate-500'>
    <div className="fixed space-y-2 h-full "
      style={{zIndex: '1'}}>
      <Sponsored/>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <SuggestedFollowing/>
    </div>
    </div>
  )
}

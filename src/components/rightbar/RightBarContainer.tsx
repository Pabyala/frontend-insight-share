import Sponsored from '../leftbar/Sponsored'
import SuggestedFollowing from './SuggestedFollowing'

export default function RightContainer() {
  return (
    <div className='hidden w-3/12 xl:block overflow-hidden bg-slate-500'>
      <div className="fixed flex flex-col space-y-2 h-full overflow-hidden" style={{ zIndex: 1 }}>
        <Sponsored />
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="flex-1 overflow-y-auto"> {/* Makes SuggestedFollowing scrollable */}
          <SuggestedFollowing />
        </div>
      </div>
    </div>
  )
}
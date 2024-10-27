export default function BdayPost({myName}: { myName: string | undefined }) {

    if (!myName) {
        return <div>Name not available</div>;
    }

    return (
        <div className='flex flex-col pb-3 space-y-2 lg:space-y-3'>
            <div className='bg-lightWhite p-3 rounded md:p-4 lg:p-5'>
                <div className='flex'>
                    <p className='text-base'>
                        🎉  Happy Birthday, {myName}! 🎂 Today is your special day—celebrate it to the fullest!
                    </p>
                </div>
            </div>
        </div>
    )
}
import { useEffect } from 'react'
import { useGetUserTodayBirthdayQuery } from '../../features/birthday/birthdayApiSlice';
import { StreamlineEmojisWrappedGift2 } from '../others/CustomIcons';
import BeatLoading from '../loading/BeatLoading';

interface BirthdayListModalProps {
    setShowBdayListModal: (value: boolean) => void;
}

export default function BirthdayListModal({ setShowBdayListModal }: BirthdayListModalProps) {
    
    const { data: todaysBirthday, error: errorTodaysBirthday, isLoading: isLoadingTodaysBirthday } = useGetUserTodayBirthdayQuery();

    let content;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    
    if (isLoadingTodaysBirthday){
        content = <BeatLoading/> ;
    } else if (errorTodaysBirthday) {
        content = <p>Error loading birthdays. Please reload the page.</p>;
    } else if (!todaysBirthday || todaysBirthday.countBirthday === 0) {
        content = <p>No birthdays today.</p>;
    } else {
        content = (
            <div className='flex flex-col space-y-2'>
                {todaysBirthday?.birthdaysToday.map((bday) => (
                    <div className='flex items-center space-x-2' key={bday._id}>
                        <div className='flex items-center'>
                            <p className="text-base">
                                <span className="font-semibold">{bday.firstName} {bday.middleName ? bday.middleName + ' ' : ''}{bday.lastName}</span>
                                birthday is today.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <span className="text-3xl">
                                <StreamlineEmojisWrappedGift2 />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50'>
            <div className='relative p-4 w-full max-w-lg max-h-full'>
                <div className='relative bg-white rounded-lg shadow p-5 space-y-3 lg:p-6'>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <p className='text-base font-semibold text-center'>Followings' Birthday's</p>
                        </div>
                        <div className='flex justify-end items-center'>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={() => setShowBdayListModal(false)}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr className="h-px bg-gray-200 border-0" />
                    <div className='flex flex-col space-y-2'>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}
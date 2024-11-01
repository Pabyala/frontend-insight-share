import React from 'react'
import { StreamlineEmojisWrappedGift2 } from '../others/CustomIcons'
import { toDaysBday } from '../../data/todays-bday-list'
import { useGetUserTodayBirthdayQuery } from '../../features/birthday/birthdayApiSlice';

export default function TodaysBdayList() {

    const { data: todaysBirthday, error: errorTodaysBirthday, isLoading: isLoadingTodaysBirthday } = useGetUserTodayBirthdayQuery();

    if (isLoadingTodaysBirthday) return <div>Loading posts...</div>;
    if (errorTodaysBirthday) return <div>Error loading posts</div>;
    if (!todaysBirthday || todaysBirthday.countBirthday === 0) return <div>No posts available</div>;

    return (
        <div className="bg-white p-1 rounded">
            <p className="text-sm font-semibold mb-1 lg:text-base">Birthday</p>
            {todaysBirthday?.birthdaysToday.map((bday) => (
                <div key={bday._id} className="flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                    <div className="flex">
                        <span className="text-3xl">
                            <StreamlineEmojisWrappedGift2 />
                        </span>
                    </div>
                    <div>
                        <p className="text-sm">
                            <span className="font-semibold">{bday.firstName} {bday.middleName ? bday.middleName + ' ' : ''}{bday.lastName}</span>'s
                            birthday is today.
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

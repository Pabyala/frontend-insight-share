import React, { useState } from 'react'
import Datepicker from "react-tailwindcss-datepicker";
import './Style.css'

export default function CustomDatePicker() {

    const [date, setDate] = useState({
        startDate: null,  // Single date selection will use startDate
        endDate: null     // Will remain null as useRange is false
    });

    const handleChange = (newValue: any) => {
        setDate(newValue);  // newValue will be an object with startDate and endDate
    };

    return (
        <div className='w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-customGray focus:bg-customGray'>
            <Datepicker
                useRange={false}
                asSingle={true}
                value={date}  // The value must be an object, not a string
                onChange={handleChange}
                inputClassName={'custom-datepicker relative transition-all duration-300 py-2 pl-2 pr-14 w-full rounded tracking-wide font-light text-sm font-medium placeholder-gray-400 bg-white focus:ring-customGray focus:bg-customGray focus:border-transparent focus:outline-none'}
            />
        </div>
    );
}

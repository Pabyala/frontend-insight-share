import React from 'react'

export default function BdayFormater( bday: string | undefined) {

    if (!bday) {
        return 'Date not available';
    }

    const date = new Date(bday)
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = date.toLocaleDateString('en-US', options)

    return formattedDate
}

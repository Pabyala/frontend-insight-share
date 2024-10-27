import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice'

export default function Prefetch() {

    // useEffect(() => {
    //     console.log('subscribing')
    //     const user = store.dispatch(usersApiSlice.endpoints.getUser.initiate())

    //     return () => {
    //         console.log('unsubscribing')
    //         user.unsubscribe()
    //     }
    // }, [])

    // return <Outlet />
}

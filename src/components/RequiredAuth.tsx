import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import { Navigate, Outlet, replace, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export default function RequiredAuth() {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    // const decoded = token ? jwtDecode(token) : undefined
    // console.log("Decoded token", decoded)

    return (
        token ? <Outlet/> : <Navigate to={'/login'} state={{from: location}} replace />
    )
}
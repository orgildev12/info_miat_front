import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../layouts/Header'

const HeaderRoute = () => {
    return <div className='min-h-screen'>
        <Header />
        <Outlet />
    </div>;
}

export default HeaderRoute

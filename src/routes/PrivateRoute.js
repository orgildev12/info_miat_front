import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer';

const PrivateRoute = () => {
    const handleMouseMove = (event) => {
        localStorage.setItem('sessionTimer', new Date());
    };

    return <div className='bg-bg_pattern min-h-screen' onMouseMove={handleMouseMove}>
        <Header />
        <Outlet />
        <Footer />
    </div>;
}

export default PrivateRoute

import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from '../layouts/error/NotFound'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/Home'
import Schedule from '../pages/Schedule'
import Airplanes from '../pages/Airplanes'
import Bonus from '../pages/Bonus'
import Cargo from '../pages/Cargo'
import Videos from '../pages/Videos'
import Experience from '../pages/Experience'
// import Destinations from '../pages/Destinations'
const Destinations = React.lazy(() => import('../pages/Destinations'));
const Vrtour = React.lazy(() => import('../pages/Vrtour/Vrtour'));
const Vrtour2 = React.lazy(() => import('../pages/Vrtour/Vrtour2'));

const loadingComp = <div className="k-loading-mask" style={{ zIndex: 100000 }}>
    <span className="k-loading-text">Loading</span>
    <div className="k-loading-image"></div>
    <div className="k-loading-color"></div>
</div>

export default function CoreRoutes() {
    return (
        <BrowserRouter>
            <Suspense fallback={loadingComp}>
                <Routes>
                    <Route exact path='/' element={<PrivateRoute />}>
                        <Route exact path='/' element={<Home />} />
                        <Route path='/destinations' element={<Destinations />} />
                        <Route path='/airplanes' element={<Airplanes />} />
                        <Route path='/contact' element={<Destinations />} />
                        <Route path='/schedule' element={<Schedule />} />
                        <Route path='/bonus' element={<Bonus />} />
                        <Route path='/cargo' element={<Cargo />} />
                        <Route path='/videos' element={<Videos />} />
                        <Route path='/experience' element={<Experience />} />
                        <Route path='/vrtour' element={<Vrtour />} />
                        <Route path='/vrtour2' element={<Vrtour2 />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

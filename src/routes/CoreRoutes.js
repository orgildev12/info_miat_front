import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from '../layouts/error/NotFound'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/Home'
import Schedule from '../pages/Schedule'
import Airplanes from '../pages/Airplanes'
// import Destinations from '../pages/Destinations'
const Destinations = React.lazy(() => import('../pages/Destinations'));
const Vrtour = React.lazy(() => import('../pages/Vrtour'));

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
                        <Route path='/vrtour' element={<Vrtour />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

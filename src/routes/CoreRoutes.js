import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from '../layouts/error/NotFound'
import PrivateRoute from './PrivateRoute'
import AboutUs from '../pages/AboutUs'
import Schedule from '../pages/Schedule'
import Bonus from '../pages/Bonus'
import Cargo from '../pages/Cargo'
import Experience from '../pages/Experience'
import HeaderRoute from './HeaderRoute'
// import Destinations from '../pages/Destinations'
const Destinations = React.lazy(() => import('../pages/Destinations'));

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
                    <Route exact element={<PrivateRoute />}>
                        <Route path='/timetable' element={<Schedule />} />
                        <Route path='/bonus' element={<Bonus />} />
                        <Route path='/cargo' element={<Cargo />} />
                        <Route path='/experience' element={<Experience />} />
                        {/* <Route path='/vrtour' element={<Vrtour />} />
                        <Route path='/vrtour2' element={<Vrtour2 />} /> */}
                        <Route path='/about-us' element={<AboutUs />} />
                    </Route>
                    <Route exact path='/' element={<HeaderRoute />}>
                        <Route exact path='/' element={<Destinations />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from '../layouts/error/NotFound'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/Home'
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
                    <Route exact path='/' element={<PrivateRoute />}>
                        <Route exact path='/' element={<Home />} />
                        <Route path='/destinations' element={<Destinations />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

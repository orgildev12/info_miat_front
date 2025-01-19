import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from '../layouts/error/NotFound'
import PrivateRoute from './PrivateRoute'
// import Home from '../pages/Home'
import InformationDetail from '../pages/InformationDetail'
import Tuluulugch from '../pages/Tuluulugch'
import ListV2 from '../pages/ListV2'
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
                    <Route exact path='/' element={<ListV2 />} />
                    <Route exact path='/' element={<PrivateRoute />}>
                        <Route path="/menu/:id" element={<InformationDetail />} />
                        <Route path="/menu/:parentid/taniltsuulga" element={<Tuluulugch type={1} />} />
                        <Route path="/menu/:parentid/ajliin-alba" element={<Tuluulugch type={2} />} />
                    </Route>
                    <Route path="/v2" element={<ListV2 />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

import React, { useEffect, useState } from 'react'

const products = [
    {
        id: 1,
        name: 'EI-CXV / Боинг 737-800',
        imageSrc: '/image/airplanes/plane-1/plane1.jpg',
    },
    {
        id: 2,
        name: 'JU1088 / Боинг 737-800',
        imageSrc: '/image/airplanes/plane-2/plane2.jpg',
    },
    {
        id: 3,
        name: 'JU1015 / Боинг 737-800',
        imageSrc: '/image/airplanes/plane-3/plane3.jpg',
    },
    {
        id: 4,
        name: 'EI-MNG / Боинг 737-MAX8',
        imageSrc: '/image/airplanes/plane-4/plane4.jpg',
    },
    {
        id: 5,
        name: 'JU1021 / Боинг 767-300ER',
        imageSrc: '/image/airplanes/plane-5/plane5.jpg',
    },
    {
        id: 6,
        name: 'JU1109 / Боинг 757-222 Cargo',
        imageSrc: '/image/airplanes/plane-6/plane6.jpg',
    },
]

const Airplanes = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

    return (
        <div className="min-h-screen w-full mx-0 bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                    {products.map((product) => (
                        <div key={product.id} className="group relative rounded-lg">
                            <div className="relative hover:shadow-lg">
                                <img
                                    alt={product.name}
                                    src={product.imageSrc}
                                    className="transform aspect-[4/3] w-full rounded-lg bg-gray-100 object-cover group-hover:scale-105"
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 flex items-end p-4 opacity-100 group-hover:opacity-100"
                                >
                                    <div className="w-full rounded-md bg-white/50 px-4 py-2 text-center group-hover:bg-white/60 text-sm font-medium text-white-900 group-hover:backdrop-blur backdrop-filter">
                                        {product.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Airplanes
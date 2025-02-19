import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

const products = [
    {
        id: 7,
        name: 'Boeing 787-9',
        imageSrc: '/background-image/livery/1.webp',
        imageDetail: '/image/airplanes/plane-7/detail.png',
    },
    {
        id: 1,
        name: 'EI-CXV / Boeing 737-800',
        imageSrc: '/image/airplanes/plane-1/plane1.jpg',
        imageDetail: '/image/airplanes/plane-1/ce1cc0ed96c5b39d95bb3f500fb8ae14.jpg',
    },
    {
        id: 2,
        name: 'JU1088 / Boeing 737-800',
        imageSrc: '/image/airplanes/plane-2/plane2.jpg',
        imageDetail: '/image/airplanes/plane-2/0b815c4c4bec5fceee64ce8aa32c8bf0.jpg',
    },
    {
        id: 3,
        name: 'JU1015 / Boeing 737-800',
        imageSrc: '/image/airplanes/plane-3/plane3.jpg',
        imageDetail: '/image/airplanes/plane-3/4a41a048773c35e79fd1ae099224401e.jpg',
    },
    {
        id: 4,
        name: 'EI-MNG / Boeing 737-MAX8',
        imageSrc: '/image/airplanes/plane-4/plane4.jpg',
        imageDetail: '/image/airplanes/plane-4/29cd7f57cab47d3acb101f3d021e869f.jpg',
    },
    {
        id: 5,
        name: 'JU1021 / Boeing 767-300ER',
        imageSrc: '/image/airplanes/plane-5/plane5.jpg',
        imageDetail: '/image/airplanes/plane-5/7d2d313bf023c58a8a3ae77677777837.jpg',
    },
    {
        id: 6,
        name: 'JU1109 / Boeing 757-222 Cargo',
        imageSrc: '/image/airplanes/plane-6/plane6.jpg',
        imageDetail: '/image/airplanes/plane-6/a24833f8f70495bc448dd8ab2d2da981.jpg',
    },
]

const Airplanes = ({ className }) => {
    const [open, setOpen] = useState(false)
    const [choosed, setChoosed] = useState({})
    const { t } = useTranslation()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

    return (
        <div className={`min-h-screen w-full mx-0 ${className}`}>
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 lg:pt-12 lg:max-w-7xl lg:px-8">
                <div className="overflow-hidden">
                    <div className="mx-auto px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl gap-x-7 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                            <div className="relative w-full lg:max-w-md lg:shrink-0 xl:max-w-md">
                                <h1 className="text-white text-5xl font-semibold tracking-tight text-justify sm:text-7xl w-full">
                                    Boeing 787-9
                                </h1>
                                <img src="/image/airplanes/plane-7/plane7.png" alt="" className='w-full'/>
                                <p className="mt-8 text-justify text-lg font-medium text-white sm:max-w-md sm:text-xl/8 lg:max-w-none">
                                    {t('boeing787desc')}
                                </p>
                            </div>
                            <div className="mt-4 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                <div className="ml-auto w-56 flex-none space-y-8 pt-16 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                    <div className="relative">
                                        <img
                                            alt=""
                                            src="/image/main/F03A0538 copy.jpg"
                                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                </div>
                                <div className="mr-auto w-56 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-16">
                                    <div className="relative">
                                        <img
                                            alt=""
                                            src="/image/main/F03A2014 copy.jpg"
                                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                    <div className="relative">
                                        <img
                                            alt=""
                                            src="/image/main/MIAT005.jpg"
                                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-white text-2xl font-semibold'>
                    {t('airplanes')}
                </div>
                <hr />
                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                    {products.map((product) => (
                        <div
                            key={product.id} className="group relative rounded-lg"
                            onClick={() => {
                                setOpen(true)
                                setChoosed(product)
                            }}
                        >
                            <div className="relative hover:shadow-lg group-hover:cursor-pointer">
                                <img
                                    alt={product.name}
                                    src={product.imageSrc}
                                    className="transition-all aspect-[4/3] w-full rounded-lg bg-gray-100 object-cover group-hover:scale-105"
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
            <Dialog open={open} onClose={setOpen} className="relative z-30">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                        <Dialog.Panel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div>
                                <img src={choosed.imageDetail} alt="" />
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default Airplanes
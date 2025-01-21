import React from "react";
// import { useNavigate } from "react-router-dom";
import { Carousel } from "../components/features/Carousel";
import { useTranslation } from "react-i18next";

let slides = [
    // {
    //     img: "/background-image/riah/Picture1.jpg",
    //     title: ""
    // },
    {
        img: "/background-image/livery/1.webp",
        title: ""
    },
    {
        img: "/background-image/livery/2.webp",
        title: ""
    },
    {
        img: "/background-image/livery/3.webp",
        title: ""
    },
    {
        img: "/background-image/livery/4.webp",
        title: ""
    }
];

const Home = () => {
    // const navigate = useNavigate();
    const { t } = useTranslation()

    return (
        <div className="h-full min-h-screen">
            <Carousel slides={slides} />
            {/* Hero section */}
            <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
                <div
                    aria-hidden="true"
                    className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
                />
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                        {/* <h1 class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">We’re changing the way people connect</h1> */}
                        <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">
                            {t('bluesky')}
                        </h1>
                        <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                            <p className="text-pretty text-lg font-medium text-gray-500 sm:text-xl/8 text-justify">
                                {t('airlinehistory')}
                            </p>
                        </div>
                        <img
                            alt=""
                            src="/image/main/miat-7.jpg"
                            className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                        />
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
            </div>

            {/* Logo cloud */}
            <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                    <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t('priority')}
                    </h2>
                    <p className="mx-auto mt-6 max-w-3xl text-lg/8 text-gray-300">
                        {t('routemap')}
                    </p>
                    <div className="mx-auto mt-20 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:max-w-4xl lg:grid-cols-5">
                        <img
                            alt="Cathay_Pacific"
                            src="/logos/airlines/Cathay_Pacific-Logo.wine.png"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="Japan-Airlines"
                            src="/logos/airlines/Japan-Airlines-Logo.png"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="miat"
                            src="/logos/main-logo/logo_w.png"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="korean-air"
                            src="/logos/airlines/korean-air.png"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                        />
                        <img
                            alt="Turkish_Airlines_logo"
                            src="/logos/airlines/Turkish_Airlines_logo.png"
                            width={158}
                            height={48}
                            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                        />
                    </div>
                    <div aria-hidden="true" className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl">
                        <div
                            style={{
                                clipPath:
                                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                            }}
                            className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                        />
                    </div>
                </div>
            </div>

            {/* Content section */}
            <div className="mt-32 overflow-hidden sm:mt-40">
                <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
                        <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                MIAT Mongolian Airlines
                            </h2>
                            <p className="mt-6 text-xl/8 text-gray-600 text-justify">
                                {t('collaborates')}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                            <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                                <img
                                    alt=""
                                    src="/image/main/miat-1.jpg"
                                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                />
                            </div>
                            <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                                <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                                    <img
                                        alt=""
                                        src="/image/main/miat-11.jpg"
                                        className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                                    />
                                </div>
                                <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                                    <img
                                        alt=""
                                        src="/image/main/miat-8.jpg"
                                        className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                                    />
                                </div>
                                <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                                    <img
                                        alt=""
                                        src="/image/main/miat-4.jpg"
                                        className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

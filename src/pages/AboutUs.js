import React from "react";
// import { useNavigate } from "react-router-dom";
import { Carousel } from "../components/features/Carousel";
import { useTranslation } from "react-i18next";
import Airplanes from "./Airplanes";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

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
        img: "/background-image/livery/7.jpg",
        title: ""
    },
    {
        img: "/background-image/livery/2.webp",
        title: ""
    },
    {
        img: "/background-image/livery/8.jpg",
        title: ""
    },
    {
        img: "/background-image/livery/3.webp",
        title: ""
    },
    // {
    //     img: "/background-image/livery/4.webp",
    //     title: ""
    // }
];

const planes = [
    {
        image: "/logos/airlines/Cathay_Pacific-Logo.wine.png",
        name: "Cathay_Pacific",
    },
    {
        image: "/logos/airlines/Japan-Airlines-Logo.png",
        name: "Japan-Airlines",
    },
    {
        image: "/logos/main-logo/logo_w.png",
        name: "miat",
    },
    {
        image: "/logos/airlines/korean-air.png",
        name: "korean-air",
    },
    {
        image: "/logos/airlines/Turkish_Airlines_logo.png",
        name: "Turkish_Airlines_logo",
    },
    {
        image: "/logos/airlines/Cathay_Pacific-Logo.wine.png",
        name: "Cathay_Pacific",
    },
    {
        image: "/logos/airlines/Japan-Airlines-Logo.png",
        name: "Japan-Airlines",
    },
    {
        image: "/logos/airlines/korean-air.png",
        name: "korean-air",
    },
    {
        image: "/logos/airlines/airchina.png",
        name: "airchina",
    },
]

const Home = () => {
    // const navigate = useNavigate();
    const { t } = useTranslation()

    return (
        <div>
            <div className="h-full min-h-screen">
                <div className="sticky top-0 left-0 w-full">
                    <Carousel slides={slides} />
                </div>
                {/* Hero section */}
                <div className={classNames(
                    "relative isolate overflow-hidden pt-4 z-20",
                    "bg-background1 bg-login_pattern bg-cover rounded-[4rem]"
                )}>
                    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-12 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                            {/* <h1 class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">We’re changing the way people connect</h1> */}
                            <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:col-span-2 xl:col-auto">
                                {t('bluesky')}
                            </h1>
                            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                                <p className="text-pretty text-lg font-medium text-black sm:text-xl/8 text-justify">
                                    {t('airlinehistory')}
                                </p>
                            </div>
                            <img
                                alt=""
                                src="/image/main/miat-7.jpg"
                                className="mt-2 aspect-[6/4] w-full max-w-lg rounded-2xl object-cover sm:mt-4 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-5"
                            />
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
                </div>

                {/* Logo cloud */}
                <div className="mx-auto bg-gray-900 -mt-[4rem] pt-4 relative">
                    <div className="relative isolate overflow-hidden px-6 py-24 text-justify sm:px-16">
                        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">
                            {t('priority')}
                        </h2>
                        <p className="mx-auto mt-6 max-w-3xl text-lg/8 text-gray-300">
                            {t('routemap')}
                        </p>
                        <div className="flex mask-gradient pb-10">
                            <div className={classNames(
                                "mx-auto mt-20 items-center gap-x-20",
                                "scroll reverse w-full flex"
                            )}>
                                {
                                    planes.map((item, index) => {
                                        return <img
                                            alt={item.name}
                                            src={item.image}
                                            width={158}
                                            height={48}
                                            key={index}
                                            className={
                                                classNames(item.className,
                                                    'opacity-30 hover:opacity-100 cursor-pointer w-[158px] transition-opacity duration-300',
                                                    'object-contain h-[48px]'
                                                )
                                            }
                                        />
                                    })
                                }
                                {
                                    planes.map((item, index) => {
                                        return <img
                                            alt={item.name}
                                            src={item.image}
                                            width={158}
                                            height={48}
                                            key={index}
                                            className={
                                                classNames(item.className,
                                                    'opacity-30 hover:opacity-100 cursor-pointer w-[158px] transition-opacity duration-300',
                                                    'object-contain h-[48px]'
                                                )
                                            }
                                        />
                                    })
                                }
                            </div>
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
                <div className="-mt-[4rem] py-8 overflow-hidden sm:py-16 bg-background1 bg-cover rounded-[4rem] z-10 relative">
                    <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
                            <div className="flex justify-center flex-wrap gap-4">
                                <div className="order-first w-64 lg:w-auto flex sm:items-end">
                                    <img
                                        alt=""
                                        src="/image/main/miat-11.jpg"
                                        className="aspect-[5/4] sm:w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover w-full"
                                    />
                                </div>
                                <div className="w-96 lg:w-auto">
                                    <img
                                        alt=""
                                        src="/image/main/miat-8.jpg"
                                        className="aspect-[7/5] sm:w-[30rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover w-full"
                                    />
                                </div>
                                <div className="w-auto">
                                    <img
                                        alt=""
                                        src="/image/main/miat-4.jpg"
                                        className="aspect-[5/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Airplanes section */}
            <Airplanes className={"relative -mt-[4rem] bg-background-dark bg-cover"} />
        </div>
    );
};

export default Home;

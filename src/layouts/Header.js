import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from "react-i18next";
import { Dialog, Menu } from '@headlessui/react'
import { ChangeLanguage } from "../components/language/ChangeLanguage/ChangeLanguage";

const navigation = [
    // {
    //     name: 'destinations', href: '/',
    //     subdropdown: [
    //         {
    //             name: 'routes',
    //             href: '/routes'
    //         },
    //         {
    //             name: 'connected',
    //             href: '/'
    //         },
    //         {
    //             name: 'domestic',
    //             href: '/domestic'
    //         },
    //     ]
    // },
    { name: 'destinations', href: '/destinations' },
    // { name: 'airplanes', href: '/airplanes' },
    { name: 'timetable', href: '/timetable' },
    { name: 'bonus', href: '/bonus' },
    { name: 'cargo', href: '/cargo' },
    // { name: 'videos', href: '/videos' },
    // { name: 'experience', href: '/experience' },
    { name: 'vrtour', href: '/vrtour' },
    { name: 'our', href: '/about-us' },
    // { name: 'contact', href: '/contact' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const location = useLocation()
    const { t } = useTranslation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


    return (
        <div className="fixed top-2 z-50 left-1/2 transform -translate-x-1/2 translate-y-0 w-full">
            <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-black/50 backdrop-blur-md rounded-full">
                <div className="relative flex min-h-[4rem] items-center justify-between">
                    <div className="flex flex-1 items-center justify-between sm:items-stretch">
                        <div className="flex shrink-0 items-center">
                            <Link
                                to={"/"}
                            >
                                <img
                                    alt="MIAT"
                                    src="/logos/main-logo/logo_w.png"
                                    className="h-8 w-auto"
                                />
                            </Link>
                        </div>

                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-2 flex-wrap text-center">
                                {navigation.map((item) => (
                                    item.subdropdown ?
                                        <Menu as="div" className="relative ml-3" key={item.name}>
                                            <div>
                                                <Menu.Button className={classNames(
                                                    (item.href === location.pathname) ? 'bg-black/40 text-white' : 'hover:bg-black/40 text-white',
                                                    'rounded-md px-2 py-2 text-sm font-medium',
                                                )}>
                                                    <span className="absolute -inset-1.5" />
                                                    {t(item.name)}
                                                </Menu.Button>
                                            </div>
                                            <Menu.Items
                                                transition={"true"}
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                            >
                                                {item.subdropdown.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        <Link
                                                            to={item.href}
                                                            className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            {t(item.name)}
                                                        </Link>
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Menu>
                                        : <Link
                                            key={item.name}
                                            to={item.href}
                                            aria-current={(item.href === location.pathname) ? 'page' : undefined}
                                            className={classNames(
                                                (item.href === location.pathname) ? 'bg-black/40 text-white' : 'hover:bg-black/40 text-white',
                                                'rounded-md px-2 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {t(item.name)}
                                        </Link>
                                ))}
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <ChangeLanguage />
                        </div>

                    </div>
                    <div className="sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                </div>
            </div>



            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-primary-500 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to={'/'} className="flex">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-[40px] w-auto"
                                src="/logos/main-logo/logo_w.png"
                                alt="MIAT"
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-1 px-2 pb-3 pt-4">
                                <div className="flex justify-end">
                                <ChangeLanguage />
                                </div>
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        aria-current={(item.href === location.pathname) ? 'page' : undefined}
                                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                        className={classNames(
                                            (item.href === location.pathname) ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-primary-500 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium',
                                        )}
                                    >
                                        {t(item.name)}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};

export default Header;

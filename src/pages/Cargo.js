import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const features = [
    {
        name: 'dangerousgoods',
        description: 'dangerousgoodsdesc',
        logo: '/logos/some/hazardous-material.png',
    },
    {
        name: 'humanRemain',
        description: 'humanRemaindesc',
        logo: '/logos/some/ossuary.png'
    },
    {
        name: 'value',
        description: 'valuedesc',
        logo: '/logos/some/value.png',
    },
    {
        name: 'medical',
        description: 'medicaldesc',
        logo: '/logos/some/medicine.png'
    },
    {
        name: 'fresh',
        description: 'freshdesc',
        logo: '/logos/some/fruit.png'
    },
    {
        name: 'pets',
        description: 'petsdesc',
        logo: '/logos/some/animal-care.png'
    },
    {
        name: 'heavy',
        description: 'heavydesc',
        logo: '/logos/some/heavy.png'
    },
]

const Cargo = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

    return (
        <div className='py-20'>
            <div className='bg-background1 fixed bg-cover h-full w-full top-0 left-0 -z-10'></div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 my-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <div className="col-span-2">
                        <p className="my-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                            MIAT Cargo
                        </p>
                        <img src="/image/airplanes/plane-6/heavy-plane.png" alt="MIAT Cargo" />

                        <div className='grid grid-cols-2 space-x-2 mt-8'>
                            <img src="/image/airplanes/plane-6/heavy-plane1.png" alt="MIAT Cargo" className='transition-all hover:scale-110' />
                            <img src="/image/airplanes/plane-6/heavy-plane2.png" alt="MIAT Cargo" className='transition-all hover:scale-110' />
                        </div>
                    </div>
                    <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-4 text-base/7 text-gray-600 sm:grid-cols-2 lg:gap-y-6">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-9 flex">
                                <div className='mr-3'>
                                    <img alt={feature.name} src={feature.logo} className="absolute left-0 top-1 w-8 h-8 text-indigo-500" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        {t(feature.name)}
                                    </div>
                                    <dd className="mt-2 leading-6">{t(feature.description)}</dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default Cargo
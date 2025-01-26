import React, { useEffect } from 'react'

import { CheckIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'react-i18next'

const features = [
    { name: 'dangerousgoods', description: 'dangerousgoodsdesc', },
    { name: 'humanRemain', description: 'humanRemaindesc' },
    { name: 'value', description: 'valuedesc', },
    { name: 'medical', description: 'medicaldesc' },
    { name: 'fresh', description: 'freshdesc' },
    { name: 'pets', description: 'petsdesc' },
    { name: 'heavy', description: 'heavydesc' },
]

const Cargo = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

    return (
        <div className='py-8 sm:py-16'>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <div className="col-span-2">
                        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                            MIAT Cargo
                        </p>
                        <img src="/image/airplanes/plane-6/heavy-plane.png" alt="MIAT Cargo" />
                    </div>
                    <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-4 text-base/7 text-gray-600 sm:grid-cols-2 lg:gap-y-6">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-9">
                                <dt className="font-semibold text-gray-900">
                                    <CheckIcon aria-hidden="true" className="absolute left-0 top-1 w-5 h-5 text-indigo-500" />
                                    {t(feature.name)}
                                </dt>
                                <dd className="mt-2">{t(feature.description)}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default Cargo
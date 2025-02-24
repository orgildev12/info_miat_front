import { Fragment, useEffect } from 'react'
import { CheckIcon, MinusIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'react-i18next'

const tiers = [
    {
        name: 'Blue', id: 'tier-starter',
        image: '/image/main/Blue.jpg',
        href: '#', mostPopular: false
    },
    {
        name: 'Silver', id: 'tier-growth',
        image: '/image/main/silver.jpg',
        href: '#', mostPopular: false
    },
    {
        name: 'Gold', id: 'tier-Gold',
        image: '/image/main/golden.jpg',
        href: '#', mostPopular: true
    },
    {
        name: 'Platinum', id: 'tier-Platinum',
        image: '/image/main/Platinium.jpg',
        href: '#', mostPopular: false
    },
]
const sections = [
    {
        name: 'reservation',
        features: [
            {
                name: 'prioritylist',
                tiers: {
                    Blue: '-',
                    Silver: 'high',
                    Gold: 'higher',
                    Platinum: 'highest',
                }
            },
            {
                name: 'fee_waivers',
                tiers: {
                    Blue: '-',
                    Silver: '-',
                    Gold: '-',
                    Platinum: '√',
                }
            }
        ],
    },
    {
        name: 'airport',
        features: [
            {
                name: 'lounge_access',
                tiers: {
                    Blue: '2500 mile',
                    Silver: '2500 mile',
                    Gold: 'free',
                    Platinum: 'free',
                }
            },
            {
                name: 'counter',
                tiers: {
                    Blue: '-',
                    Silver: '√',
                    Gold: '√',
                    Platinum: '√',
                }
            },
            {
                name: 'preferred',
                tiers: {
                    Blue: '-',
                    Silver: '√',
                    Gold: '√',
                    Platinum: '√',
                }
            },
            {
                name: 'convenience',
                tiers: {
                    Blue: '-',
                    Silver: '√',
                    Gold: '√',
                    Platinum: '√',
                }
            },
            {
                name: 'baggagetag',
                tiers: {
                    Blue: '-',
                    Silver: '√',
                    Gold: '√',
                    Platinum: '√',
                }
            },
            {
                name: 'free_upgrade',
                tiers: {
                    Blue: '-',
                    Silver: 'high',
                    Gold: 'higher',
                    Platinum: 'highest',
                }
            },
            {
                name: 'priority_standby',
                tiers: {
                    Blue: '-',
                    Silver: 'high',
                    Gold: 'higher',
                    Platinum: 'highest',
                }
            },
            {
                name: 'no_bumping',
                tiers: {
                    Blue: '-',
                    Silver: '√',
                    Gold: '√',
                    Platinum: '√',
                }
            },
            {
                name: 'priority_arrangement',
                tiers: {
                    Blue: '-',
                    Silver: '-',
                    Gold: '√',
                    Platinum: '√',
                }
            },
            {
                name: 'additional_bagga',
                tiers: {
                    Blue: '-',
                    Silver: '-',
                    Gold: '-',
                    Platinum: '+1 piece',
                }
            },
        ],
    }
]

const tiers2 = [
    { level: "Junior", bgColor: "", requirements: "Children aged 2-12 years", conditions: "-", additionalMiles: "-", bonusMiles: "-", validPeriod: "-" },
    { level: "Blue", bgColor: "bg-blue-500", requirements: "12 years of age or older", conditions: "-", additionalMiles: "-", bonusMiles: "300 miles by online registration", validPeriod: "-" },
    { level: "Silver", bgColor: "bg-gray-400", requirements: "Members who have accumulated 40,000 miles", conditions: "Have to accumulate a minimum of 5,000 miles within one year", additionalMiles: "25%", bonusMiles: "2500 miles if upgraded", validPeriod: "24 months. If the tier requirements are fulfilled, the validity will be extended for another 24 months" },
    { level: "Gold", bgColor: "bg-yellow-400", requirements: "Members who have accumulated 70,000 miles during the Silver tier. Miles start from 0 every time a tier upgrade or downgrade", conditions: "Have to accumulate a minimum of 10,000 miles within one year", additionalMiles: "50%", bonusMiles: "5000 miles if upgraded", validPeriod: "24 months. If the tier requirements are fulfilled, the validity will be extended for another 24 months" },
    { level: "Platinum", bgColor: "bg-gray-600", requirements: "Members who have accumulated 70,000 miles during the Gold tier. Miles start from 0 every time a tier upgrade or downgrade", conditions: "Have to accumulate a minimum of 15,000 miles within one year", additionalMiles: "75%", bonusMiles: "7500 miles if upgraded", validPeriod: "24 months. If the tier requirements are fulfilled, the validity will be extended for another 24 months" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const incentives = [
    {
        name: 'Award ticket',
        imageSrc: '/logos/some/ticket-flight.png',
    },
    {
        name: 'Excess baggage',
        imageSrc: '/logos/some/travel-luggage.png',
    },
    {
        name: 'Upgrade ticket',
        imageSrc: '/logos/some/boarding-pass.png',
    },
    {
        name: 'Blue Sky lounge',
        imageSrc: '/logos/some/lounge.png',
    },
    {
        name: 'Preferred seatings',
        imageSrc: '/logos/some/first-class.png',
    },
]

export default function Bonus() {
    const { t } = useTranslation()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

    return (
        <div className="pb-12 pt-20 sm:py-20 mb-8">
            <div className='bg-loyalty fixed bg-cover h-full w-full top-0 left-0 -z-10'>

            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 bg-white/30 backdrop-blur-md py-7 rounded-[4rem]">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
                        {t('loyaltyprogram')}
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-3xl text-pretty text-justify text-base font-medium text-gray-800 sm:text-lg">
                    {t('loyaltyprogramdesc')}
                </p>
                <div className='mx-auto max-w-sm'>
                    <img src="/logos/main-logo/blue_sky.png" alt="" className='w-full' />
                </div>
                <div className="mx-auto max-w-7xl sm:px-2 lg:px-4 mt-2">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 px-4 lg:max-w-none lg:grid-cols-5 md:grid-cols-3">
                        {incentives.map((incentive) => (
                            <div key={incentive.name} className="rounded-lg text-center sm:flex sm:text-left lg:block lg:text-center bg-white/30 backdrop-blur-md py-4">
                                <div className="sm:shrink-0">
                                    <div className="flow-root">
                                        <img alt="" src={incentive.imageSrc} className="mx-auto w-10" />
                                    </div>
                                </div>
                                <div className="mt-3 sm:ml-3 sm:mt-0 lg:ml-0 lg:mt-3">
                                    <h3 className="text-sm font-medium text-gray-700">{incentive.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="mx-auto mt-6 max-w-4xl text-pretty text-justify text-sm font-medium text-gray-700">
                    {t('registering_blue')}
                </p>

                {/* xs to lg */}
                <div className="mx-auto mt-4 max-w-md space-y-4 sm:mt-12 lg:hidden">
                    {tiers.map((tier) => (
                        <section
                            key={tier.id}
                            className={classNames(
                                tier.mostPopular ? 'rounded-xl bg-gray-400/5 ring-1 ring-inset ring-gray-200' : '',
                                'p-8',
                            )}
                        >
                            <h3 id={tier.id} className="text-sm/6 font-semibold text-black">
                                {t(tier.name)}
                            </h3>
                            <p className="mt-2 flex items-baseline gap-x-1 text-black">
                                <img src={tier.image} alt={tier.name} />
                            </p>
                            <ul className="mt-10 space-y-4 text-sm/6 text-black">
                                {sections.map((section) => (
                                    <li key={section.name}>
                                        <ul className="space-y-4">
                                            {section.features.map((feature) =>
                                                feature.tiers[tier.name] ? (
                                                    <li key={feature.name} className="flex gap-x-3">
                                                        <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
                                                        <span>
                                                            {t(feature.name)}{' '}
                                                            {typeof feature.tiers[tier.name] === 'string' ? (
                                                                <span className="text-sm/6 text-gray-800">({feature.tiers[tier.name]})</span>
                                                            ) : null}
                                                        </span>
                                                    </li>
                                                ) : null,
                                            )}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>

                {/* lg+ */}
                <div className="isolate mt-10 hidden lg:block">
                    <div className="relative -mx-8">
                        {tiers.map((tier) => tier.mostPopular) ? (
                            <div className="absolute inset-x-4 inset-y-0 -z-10 flex">
                                <div
                                    style={{ marginLeft: `${(tiers.findIndex((tier) => tier.mostPopular) + 2) * 16.6}%` }}
                                    aria-hidden="true"
                                    className="flex w-1/6 px-2"
                                >
                                    <div className="w-full rounded-t-xl border-x border-t border-gray-900/10 bg-gray-400/5" />
                                </div>
                            </div>
                        ) : null}
                        <table className="w-full table-fixed border-separate border-spacing-x-4 text-left">
                            <caption className="sr-only">Pricing plan comparison</caption>
                            <colgroup>
                                <col className="w-2/6" />
                                <col className="w-1/6" />
                                <col className="w-1/6" />
                                <col className="w-1/6" />
                                <col className="w-1/6" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <td />
                                    {tiers.map((tier) => (
                                        <th key={tier.id} scope="col" className="px-3 pt-3">
                                            <img src={tier.image} alt={tier.name} className='w-2/3 rounded mx-auto' />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <span className="sr-only">Price</span>
                                    </th>
                                    {tiers.map((tier) => (
                                        <td key={tier.id} className="px-6 pt-1 text-center">
                                            <div className="text-sm/7 font-semibold text-black">{t(tier.name)}</div>
                                        </td>
                                    ))}
                                </tr>
                                {sections.map((section, sectionIdx) => (
                                    <Fragment key={section.name}>
                                        <tr>
                                            <th
                                                scope="colgroup"
                                                colSpan={5}
                                                className={classNames(
                                                    'py-2 text-sm/5 font-semibold text-black',
                                                )}
                                            >
                                                {t(section.name)}
                                                <div className="absolute inset-x-8 mt-2 h-px bg-gray-900/10" />
                                            </th>
                                        </tr>
                                        {section.features.map((feature) => (
                                            <tr key={feature.name}>
                                                <th scope="row" className="py-1 text-sm/6 font-normal text-black pl-4 leading-tight">
                                                    {t(feature.name)}
                                                    <div className="absolute inset-x-8 mt-1 h-px bg-gray-900/5" />
                                                </th>
                                                {tiers.map((tier) => (
                                                    <td key={tier.id} className="px-3 py-1">
                                                        {typeof feature.tiers[tier.name] === 'string' ? (
                                                            <div className="text-center text-sm/6 text-gray-800">{feature.tiers[tier.name]}</div>
                                                        ) : (
                                                            <>
                                                                {feature.tiers[tier.name] === true ? (
                                                                    <CheckIcon aria-hidden="true" className="mx-auto w-5 h-5 text-indigo-600" />
                                                                ) : (
                                                                    <MinusIcon aria-hidden="true" className="mx-auto w-5 h-5 text-gray-400" />
                                                                )}
                                                            </>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-8'>
                        <table className="w-full table-fixed rounded">
                            <thead>
                                <tr>
                                    <th width="150"></th>
                                    <th>{t("Requirements")}</th>
                                    <th>{t("Conditions")}</th>
                                    <th width="150">{t("Additional miles")}</th>
                                    <th width="100">{t("Bonus miles")}</th>
                                    <th>{t("Valid period")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tiers2.map((tier, index) => (
                                    <tr key={index} className={`text-justify text-sm/6 font-normal`}>
                                        <td className={`${tier.bgColor} p-2 leading-tight font-bold`}>{t(tier.level)}</td>
                                        <td className="p-2 leading-tight">{t(tier.requirements)}</td>
                                        <td className="p-2 leading-tight">{t(tier.conditions)}</td>
                                        <td className="p-2 leading-tight text-center">{t(tier.additionalMiles)}</td>
                                        <td className="p-2 leading-tight">{t(tier.bonusMiles)}</td>
                                        <td className="p-2 leading-tight">{t(tier.validPeriod)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

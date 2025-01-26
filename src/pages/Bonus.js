import { Fragment } from 'react'
import { CheckIcon, MinusIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'react-i18next'

const tiers = [
    { name: 'Blue', id: 'tier-starter', href: '#', priceMonthly: '$19', mostPopular: false },
    { name: 'Silver', id: 'tier-growth', href: '#', priceMonthly: '$49', mostPopular: true },
    { name: 'Gold', id: 'tier-Gold', href: '#', priceMonthly: '$99', mostPopular: false },
    { name: 'Platinum', id: 'tier-Platinum', href: '#', priceMonthly: '$99', mostPopular: false },
]
const sections = [
    {
        name: 'Features',
        features: [
            {
                name: 'Edge content delivery', tiers: {
                    Blue: true,
                    Silver: true,
                    Gold: true,
                    Platinum: true,
                }
            },
            {
                name: 'Custom domains', tiers: {

                    Blue: '1', Silver: '3',
                    Gold: 'Unlimited',
                    Platinum: 'Unlimited',
                }
            },
            {
                name: 'Team members', tiers: {

                    Blue: '3', Silver: '20',
                    Gold: 'Unlimited',
                    Platinum: 'Unlimited',
                }
            },
            {
                name: 'Single sign-on (SSO)', tiers: {

                    Blue: false, Silver: false,
                    Gold: true,
                    Platinum: true,
                }
            },
        ],
    },
    {
        name: 'Reporting',
        features: [
            {
                name: 'Advanced analytics', tiers: {

                    Blue: true, Silver: true,
                    Gold: true
                }
            },
            {
                name: 'Basic reports', tiers: {

                    Blue: false, Silver: true,
                    Gold: true
                }
            },
            {
                name: 'Professional reports', tiers: {

                    Blue: false, Silver: false,
                    Gold: true
                }
            },
            {
                name: 'Custom report builder', tiers: {

                    Blue: false, Silver: false,
                    Gold: true
                }
            },
        ],
    },
    {
        name: 'Support',
        features: [
            {
                name: '24/7 online support', tiers: {

                    Blue: true, Silver: true,
                    Gold: true
                }
            },
            {
                name: 'Quarterly workshops', tiers: {

                    Blue: false, Silver: true,
                    Gold: true
                }
            },
            {
                name: 'Priority phone support', tiers: {

                    Blue: false, Silver: false,
                    Gold: true
                }
            },
            {
                name: '1:1 onboarding tour', tiers: {

                    Blue: false, Silver: false,
                    Gold: true
                }
            },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Bonus() {
    const { t } = useTranslation()

    return (
        <div className="bg-white py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        {t('loyaltyprogram')}
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-3xl text-pretty text-center text-base font-medium text-gray-600 sm:text-lg">
                    {t('loyaltyprogramdesc')}
                </p>

                {/* xs to lg */}
                <div className="mx-auto mt-8 max-w-md space-y-8 sm:mt-12 lg:hidden">
                    {tiers.map((tier) => (
                        <section
                            key={tier.id}
                            className={classNames(
                                tier.mostPopular ? 'rounded-xl bg-gray-400/5 ring-1 ring-inset ring-gray-200' : '',
                                'p-8',
                            )}
                        >
                            <h3 id={tier.id} className="text-sm/6 font-semibold text-gray-900">
                                {tier.name}
                            </h3>
                            <p className="mt-2 flex items-baseline gap-x-1 text-gray-900">
                                <span className="text-4xl font-semibold">{tier.priceMonthly}</span>
                                <span className="text-sm font-semibold">/month</span>
                            </p>
                            <a
                                href={tier.href}
                                aria-describedby={tier.id}
                                className={classNames(
                                    tier.mostPopular
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                                        : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                                    'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                                )}
                            >
                                Buy plan
                            </a>
                            <ul className="mt-10 space-y-4 text-sm/6 text-gray-900">
                                {sections.map((section) => (
                                    <li key={section.name}>
                                        <ul className="space-y-4">
                                            {section.features.map((feature) =>
                                                feature.tiers[tier.name] ? (
                                                    <li key={feature.name} className="flex gap-x-3">
                                                        <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
                                                        <span>
                                                            {feature.name}{' '}
                                                            {typeof feature.tiers[tier.name] === 'string' ? (
                                                                <span className="text-sm/6 text-gray-500">({feature.tiers[tier.name]})</span>
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
                <div className="isolate mt-20 hidden lg:block">
                    <div className="relative -mx-8">
                        {tiers.some((tier) => tier.mostPopular) ? (
                            <div className="absolute inset-x-4 inset-y-0 -z-10 flex">
                                <div
                                    style={{ marginLeft: `${(tiers.findIndex((tier) => tier.mostPopular) + 1) * 20}%` }}
                                    aria-hidden="true"
                                    className="flex w-1/5 px-4"
                                >
                                    <div className="w-full rounded-t-xl border-x border-t border-gray-900/10 bg-gray-400/5" />
                                </div>
                            </div>
                        ) : null}
                        <table className="w-full table-fixed border-separate border-spacing-x-8 text-left">
                            <caption className="sr-only">Pricing plan comparison</caption>
                            <colgroup>
                                <col className="w-1/5" />
                                <col className="w-1/5" />
                                <col className="w-1/5" />
                                <col className="w-1/5" />
                                <col className="w-1/5" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <td />
                                    {tiers.map((tier) => (
                                        <th key={tier.id} scope="col" className="px-6 pt-6 xl:px-8 xl:pt-8">
                                            <div className="text-sm/7 font-semibold text-gray-900">{tier.name}</div>
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
                                        <td key={tier.id} className="px-6 pt-2 xl:px-8">
                                            <div className="flex items-baseline gap-x-1 text-gray-900">
                                                <span className="text-4xl font-semibold">{tier.priceMonthly}</span>
                                                <span className="text-sm/6 font-semibold">/month</span>
                                            </div>
                                            <a
                                                href={tier.href}
                                                className={classNames(
                                                    tier.mostPopular
                                                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                                                        : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                                                    'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                                                )}
                                            >
                                                Buy plan
                                            </a>
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
                                                    sectionIdx === 0 ? 'pt-8' : 'pt-16',
                                                    'pb-4 text-sm/6 font-semibold text-gray-900',
                                                )}
                                            >
                                                {section.name}
                                                <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/10" />
                                            </th>
                                        </tr>
                                        {section.features.map((feature) => (
                                            <tr key={feature.name}>
                                                <th scope="row" className="py-4 text-sm/6 font-normal text-gray-900">
                                                    {feature.name}
                                                    <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/5" />
                                                </th>
                                                {tiers.map((tier) => (
                                                    <td key={tier.id} className="px-6 py-4 xl:px-8">
                                                        {typeof feature.tiers[tier.name] === 'string' ? (
                                                            <div className="text-center text-sm/6 text-gray-500">{feature.tiers[tier.name]}</div>
                                                        ) : (
                                                            <>
                                                                {feature.tiers[tier.name] === true ? (
                                                                    <CheckIcon aria-hidden="true" className="mx-auto w-5 h-5 text-indigo-600" />
                                                                ) : (
                                                                    <MinusIcon aria-hidden="true" className="mx-auto w-5 h-5 text-gray-400" />
                                                                )}

                                                                <span className="sr-only">
                                                                    {feature.tiers[tier.name] === true ? 'Included' : 'Not included'} in {tier.name}
                                                                </span>
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
                </div>
            </div>
        </div>
    )
}

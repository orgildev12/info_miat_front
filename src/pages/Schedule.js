import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const countryschedules = {
    country: [
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    ],
    country2: [],
    country3: [],
    country4: [],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Schedule = () => {

    const [schedules, setSchedules] = useState([])
    const [countries, setCountries] = useState([])
    const [selectedtab, setSelectedTab] = useState()
    const { t } = useTranslation();

    useEffect(() => {
        if (countries.length > 0 && !selectedtab) {
            setSelectedTab(countries[0])
        }
        if (selectedtab) {
            setSchedules(countryschedules[selectedtab])
        }
    }, [countries, selectedtab])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const tmpcountry = [];
        for (const key in countryschedules) {
            if (Object.prototype.hasOwnProperty.call(countryschedules, key)) {
                tmpcountry.push(key);
            }
        }
        setCountries(tmpcountry)
    }, [])

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-16">
            <div className='flex border-b border-b-primary-500'>
                {countries.map((item) => {
                    return <button className={
                        classNames(
                            'transition duration-500 border border-primary-500 px-4 py-2 -mb-px rounded-t-md',
                            selectedtab === item ? 'border-b-white hover:text-primary-500'
                                : 'bg-primary-500 text-white hover:bg-primary-700 hover:border-white'
                        )}
                        onClick={() => {
                            setSelectedTab(item)
                        }}
                        key={item}
                    >
                        {t(item)}
                    </button>
                })}
            </div>
            <div className='overflow-x-auto mt-6'>
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th scope="col" className="py-2 pl-2 pr-3 text-left text-sm font-semibold text-gray-900">
                                Аяллын дугаар
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                                Өдөр
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                                Нисэх цаг
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                                Буух цаг
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                                Үйлчлэх хугацаа
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {schedules.map((person, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-zinc-200' : ''}>
                                <td className="whitespace-nowrap py-2 pl-2 pr-3 text-sm font-medium">
                                    {person.name}
                                </td>
                                <td className="whitespace-nowrap py-2 px-3 text-sm">{person.title}</td>
                                <td className="whitespace-nowrap py-2 px-3 text-sm">{person.email}</td>
                                <td className="whitespace-nowrap py-2 px-3 text-sm">{person.role}</td>
                                <td className="whitespace-nowrap py-2 px-3 text-sm">{person.role}</td>
                            </tr>
                        ))}
                        {schedules.length === 0 && <tr className={'bg-zinc-200 text-center'}>
                            <td colSpan={5} className='py-2 px-3 text-sm'>{t('empty')}</td>
                        </tr>}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Schedule
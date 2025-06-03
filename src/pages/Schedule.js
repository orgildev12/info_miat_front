import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CarouselSimple } from '../components/features/CarouselSimple';
import { useLoading } from '../components/features';

const days = {
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
    7: 'sunday',
};

const flightstype = [
    'international',
    'domestic'
]

const photos = {
    international: [
        { img: '/image/international/Bangkok_360x150.png' },
        { img: '/image/international/Beijing_360x150.png' },
        { img: '/image/international/Busan_360x150.png' },
        { img: '/image/international/business_class.png' },
        { img: '/image/international/Frankfurt_360x150.png' },
        { img: '/image/international/Guangzhou_360x150.png' },
        { img: '/image/international/Ho_Chi_Minh_360x150.png' },
        { img: '/image/international/Hongkong_360x150.png' },
        { img: '/image/international/Istanbul_360x150.png' },
        { img: '/image/international/Osaka_360x150.png' },
        { img: '/image/international/Phuket_360x150.png' },
        { img: '/image/international/Seoul_360x150.png' },
        { img: '/image/international/Tokyo_360x150.png' },
    ],
    domestic: [
        { img: "/image/main/AdobeStock_227948748.jpg" },
        { img: "/image/main/MG_9388KhermenTsavUmnugovi.jpg" },
        { img: "/image/main/OtgontengerZavhan.jpg" },
        { img: "/image/main/AltanHuhiiHovd.jpg" },
        { img: "/image/main/photo_2024-02-14_15-53-24.jpg" },
        { img: "/image/main/IMG_4013TurgenMountainsUvs.jpg" },
        { img: "/image/main/DJI_0077.jpg" },
        { img: "/image/main/BagaturgeniiuulsBayanUlgii.jpg" },
    ]
}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Schedule = () => {

    const [schedules, setSchedules] = useState({
        to: [],
        from: []
    })
    const [countries, setCountries] = useState([])
    const [countryschedules, setCountryschedules] = useState({})
    const [mongoliaschedules, setMongoliaschedules] = useState({})
    const [selectedtab, setSelectedTab] = useState()
    const [selectedtabmain, setSelectedTabmain] = useState('international')
    const { t } = useTranslation();
    const { showLoading } = useLoading()

    useEffect(() => {
        if (countries.length > 0 && !selectedtab) {
            setSelectedTab(countries[0])
        }
        if (selectedtab) {
            if (selectedtabmain === 'international') {
                setSchedules(countryschedules[selectedtab])
            } else {
                setSchedules(mongoliaschedules[selectedtab])
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countries, selectedtab])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const tmpcountry = [];
        setSelectedTab(null)
        if (selectedtabmain === 'international') {
            for (const key in countryschedules) {
                if (Object.prototype.hasOwnProperty.call(countryschedules, key)) {
                    tmpcountry.push(key);
                }
            }
        } else {
            for (const key in mongoliaschedules) {
                if (Object.prototype.hasOwnProperty.call(mongoliaschedules, key)) {
                    tmpcountry.push(key);
                }
            }
        }
        setCountries(tmpcountry)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedtabmain, countryschedules])

    useEffect(() => {
        showLoading(true)
        fetch(`/json-data/international-timetable.json?ts=${Date.now()}`, {
            cache: "no-store"
        })
            .then(response => response.json())
            .then(data => {
                setCountryschedules(data);
            })
            .catch(error => console.error("JSON ачаалж чадсангүй:", error))
            .finally(() => {
                showLoading(false);
            });

        fetch(`/json-data/mn-timetable.json?ts=${Date.now()}`, {
            cache: "no-store"
        })
            .then(response => response.json())
            .then(data => {
                setMongoliaschedules(data);
            })
            .catch(error => console.error("JSON ачаалж чадсангүй:", error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const ScheduleTable = ({ data, direction }) => {
        return <table className="min-w-full divide-y divide-gray-300">
            <thead>
                <tr className='bg-white/50'>
                    <th scope="col" className="py-2 pl-2 pr-3 text-sm font-semibold text-left text-gray-900 sm:w-40">
                        {t('flightno')}
                    </th>
                    <th scope="col" className="px-3 py-2 text-sm font-semibold text-left text-gray-900 sm:w-48">
                        {t('direction')}
                    </th>
                    <th scope="col" className="px-3 py-2 text-sm font-semibold text-left text-gray-900">
                        {t('frequency')}
                    </th>
                    <th scope="col" className="w-32 px-3 py-2 text-sm font-semibold text-left text-gray-900">
                        {t('departure')}
                    </th>
                    <th scope="col" className="w-32 px-3 py-2 text-sm font-semibold text-left text-gray-900">
                        {t('arrival')}
                    </th>
                    <th scope="col" className="w-24 px-3 py-2 text-sm font-semibold text-left text-gray-900">
                        {t('stop')}
                    </th>
                    <th scope="col" className="px-3 py-2 text-sm font-semibold text-left text-gray-900 w-80">
                        {t('effectivedate')}
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {data.map((schedule, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-zinc-200/50' : 'bg-white/50'}>
                        <td className="flex py-2 pl-2 pr-3 text-sm font-medium whitespace-nowrap">
                            {schedule.perspective && <span className="relative flex w-2 h-2 pt-1 mr-1 hover:cursor-pointer" title={t('perspective')}>
                                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary-400"></span>
                                <span className="relative inline-flex w-2 h-2 rounded-full bg-primary-500"></span>
                            </span>}
                            {schedule.flightno}
                        </td>
                        <td className="px-3 py-2 text-sm whitespace-nowrap">
                            {schedule.direction}
                        </td>
                        <td className="px-3 py-2 text-sm whitespace-nowrap">
                            {
                                schedule.frequency.map((day, index) => {
                                    if (index) {
                                        day = `, ${t(days[day])}`;
                                    } else {
                                        day = t(days[day]);
                                    }
                                    return day
                                })
                            }
                        </td>
                        <td className="px-3 py-2 text-sm whitespace-nowrap">{schedule.departure}</td>
                        <td className="px-3 py-2 text-sm whitespace-nowrap">{schedule.arrival}</td>
                        <td className="px-3 py-2 text-sm whitespace-nowrap">{schedule.stop ?? '0'}</td>
                        <td className="px-3 py-2 text-sm whitespace-nowrap">{schedule.effectivedate}</td>
                    </tr>
                ))}
                {data.length === 0 && <tr className={'bg-zinc-200 text-center'}>
                    <td colSpan={7} className='px-3 py-2 text-sm'>{t('empty')}</td>
                </tr>}
            </tbody>
        </table>
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 pb-16 pt-8 my-16 min-h-[80vh]">
            <div className="max-w-4xl mx-auto mb-4 text-center sm:mb-8">
                <p className="mt-2 text-2xl font-semibold tracking-tight text-black uppercase text-balance sm:text-5xl">
                    {t('summer_flight')}
                </p>
            </div>
            <div className='fixed top-0 left-0 w-full h-full bg-cover bg-background1 -z-10'></div>

            <div className='flex border-b border-b-primary-500'>
                {flightstype.map((item) => {
                    return <button className={
                        classNames(
                            'transition duration-500 border border-primary-500 px-4 py-2 -mb-px rounded-t-md',
                            selectedtabmain === item ? 'border-b-white hover:text-primary-500'
                                : 'bg-primary-500 text-white hover:bg-primary-700 hover:border-white'
                        )}
                        onClick={() => {
                            setSelectedTabmain(item)
                        }}
                        key={item}
                    >
                        {t(item)}
                    </button>
                })}
            </div>
            <div className='mt-2'>
                <CarouselSimple slides={photos[selectedtabmain]} />
            </div>


            <div className='p-3'>
                <div className='flex flex-wrap border-b border-b-primary-500'>
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

                <div className='mt-6 text-xl font-bold'>
                    {t('ulaanbaatar')} - {t(selectedtab)}
                </div>
                <div className='overflow-x-auto sm:mt-6'>
                    <ScheduleTable data={schedules.to} direction="to" />
                </div>
                <div className='mt-6 text-xl font-bold'>
                    {t(selectedtab)} - {t('ulaanbaatar')}
                </div>
                <div className='overflow-x-auto sm:mt-6'>
                    <ScheduleTable data={schedules.from} />
                </div>
                <div className="p-0 mt-3 text-sm font-bold text-gray-700">{t('local_time')} <br />
                    (+1) : {t('next_day')} <br />
                    {t('schedule_change_notice')}
                </div>
                <div className='flex mt-1 text-sm font-bold text-gray-700'>
                    <span className="relative flex w-2 h-2 pt-1 mr-2">
                        <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary-400"></span>
                        <span className="relative inline-flex w-2 h-2 rounded-full bg-primary-500"></span>
                    </span>
                    - {t('additionalFlight')}
                </div>
            </div>
        </div>
    )
}

export default Schedule
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

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

const mongoliaschedules = {
    "hovd": {
        "to": [
            {
                "flightno": "OM031",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "06:50",
                "arrival": "08:00",
                "effectivedate": "2025.04.01 - 2025.10.24"
            },
            {
                "flightno": "OM031",
                "flight": "CRJ700 JU-1700",
                "frequency": [7],
                "departure": "11:45",
                "arrival": "12:55",
                "effectivedate": "2025.03.30 - 2025.05.25"
            },
            {
                "flightno": "OM031",
                "flight": "CRJ700 JU-1700",
                "frequency": [7],
                "departure": "06:50",
                "arrival": "08:00",
                "effectivedate": "2025.06.01 - 2025.08.31"
            },
            {
                "flightno": "OM031",
                "flight": "CRJ700 JU-1700",
                "frequency": [7],
                "departure": "11:45",
                "arrival": "12:55",
                "effectivedate": "2025.09.07 - 2025.10.19"
            }
        ],
        "from": [
            {
                "flightno": "OM032",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "08:40",
                "arrival": "11:35",
                "effectivedate": "2025.04.01 - 2025.10.24"
            },
            {
                "flightno": "OM032",
                "flight": "CRJ700 JU-1700",
                "frequency": [7],
                "departure": "13:35",
                "arrival": "16:30",
                "effectivedate": "2025.03.30 - 2025.05.25"
            },
            {
                "flightno": "OM032",
                "flight": "CRJ700 JU-1700",
                "frequency": [7],
                "departure": "08:40",
                "arrival": "11:35",
                "effectivedate": "2025.06.01 - 2025.08.31"
            },
            {
                "flightno": "OM032",
                "flight": "CRJ700 JU-1700",
                "frequency": [7],
                "departure": "13:35",
                "arrival": "16:30",
                "effectivedate": "2025.09.07 - 2025.10.19"
            }
        ]
    },
    "altai": {
        "to": [
            {
                "flightno": "OM041",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "13:30",
                "arrival": "15:10",
                "effectivedate": "2025.06.02 - 2025.08.28"
            }
        ],
        "from": [
            {
                "flightno": "OM042",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "15:50",
                "arrival": "17:15",
                "effectivedate": "2025.06.02 - 2025.08.28"
            }
        ]
    },
    "ulaangom": {
        "to": [
            {
                "flightno": "OM051",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "12:45",
                "arrival": "13:55",
                "effectivedate": "2025.06.03 - 2025.08.29"
            },
            {
                "flightno": "OM051",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "12:50",
                "arrival": "13:55",
                "effectivedate": "2025.04.01 - 2025.05.30"
            },
            {
                "flightno": "OM051",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "12:50",
                "arrival": "13:55",
                "effectivedate": "2025.09.02 - 2025.10.24"
            }
        ],
        "from": [
            {
                "flightno": "OM052",
                "departure": "14:30",
                "arrival": "17:20"
            }
        ]
    },
    "Uliastai": {
        "to": [
            {
                "flightno": "OM061",
                "frequency": [1, 4],
                "departure": "18:25",
                "arrival": "20:00",
                "effectivedate": "2025.06.02 - 2025.08.28"
            },
            {
                "flightno": "OM061",
                "frequency": [1, 4],
                "departure": "13:35",
                "arrival": "15:00",
                "effectivedate": "2025.03.31 - 2025.05.29"
            },
            {
                "flightno": "OM061",
                "frequency": [1, 4],
                "departure": "13:35",
                "arrival": "15:00",
                "effectivedate": "2025.09.01 - 2025.10.23"
            }
        ],
        "from": [
            {
                "flightno": "OM062",
                "departure": "20:40",
                "arrival": "22:05"
            }
        ]
    },
    "Ulgii": {
        "to": [
            {
                "flightno": "OM067",
                "frequency": [3, 6],
                "departure": "07:25",
                "arrival": "08:40",
                "effectivedate": "2025.04.02 - 2025.10.25"
            },
            {
                "flightno": "OM067",
                "frequency": [1],
                "departure": "07:25",
                "arrival": "08:40",
                "effectivedate": "2025.06.02 - 2025.10.20"
            }
        ],
        "from": [
            {
                "flightno": "OM068",
                "departure": "09:20",
                "arrival": "12:20"
            }
        ]
    },
    "Murun": {
        "to": [
            {
                "flightno": "OM081",
                "frequency": [2, 6],
                "departure": "18:30",
                "arrival": "19:45",
                "effectivedate": "2025.06.03 - 2025.08.30"
            },
            {
                "flightno": "OM081",
                "frequency": [4],
                "departure": "09:25",
                "arrival": "10:35",
                "effectivedate": "2025.06.05 - 2025.08.28"
            }
        ],
        "from": [
            {
                "flightno": "OM082",
                "departure": "20:25",
                "arrival": "21:30"
            },
            {
                "flightno": "OM082",
                "departure": "11:15",
                "arrival": "12:20"
            }
        ]
    },
    "Dalanzadgad": {
        "to": [
            {
                "flightno": "OM091",
                "frequency": [3],
                "departure": "13:35",
                "arrival": "14:35",
                "effectivedate": "2025.04.02 - 2025.10.22"
            },
            {
                "flightno": "OM091",
                "frequency": [7],
                "departure": "07:50",
                "arrival": "08:50",
                "effectivedate": "2025.03.30 - 2025.05.25"
            },
            {
                "flightno": "OM091",
                "frequency": [7],
                "departure": "13:35",
                "arrival": "14:35",
                "effectivedate": "2025.06.01 - 2025.08.31"
            },
            {
                "flightno": "OM091",
                "frequency": [7],
                "departure": "07:50",
                "arrival": "08:50",
                "effectivedate": "2025.09.07 - 2025.10.19"
            },
            {
                "flightno": "OM091",
                "frequency": [5],
                "departure": "18:30",
                "arrival": "19:30",
                "effectivedate": "2025.06.06 - 2025.08.29"
            },
            {
                "flightno": "OM091",
                "frequency": [6],
                "departure": "13:35",
                "arrival": "14:35",
                "effectivedate": "2025.06.07 - 2025.08.30"
            }
        ],
        "from": [
            {
                "flightno": "OM092",
                "departure": "15:15",
                "arrival": "16:20"
            },
            {
                "flightno": "OM092",
                "departure": "09:30",
                "arrival": "10:35"
            },
            {
                "flightno": "OM092",
                "departure": "20:10",
                "arrival": "21:15"
            }
        ]
    }
}


const countryschedules = {
    frankfurt: {
        to: [
            {
                flightno: "OM137",
                frequency: [1, 3, 6],
                departure: "10:10",
                arrival: "12:50",
                effectivedate: "2025.03.31 - 2025.10.25"
            },
            {
                flightno: "OM137",
                frequency: [5, 7],
                departure: "10:10",
                arrival: "12:50",
                effectivedate: "2025.06.01 - 2025.09.28"
            },
            {
                flightno: "OM137",
                frequency: [2],
                departure: "10:10",
                arrival: "12:50",
                effectivedate: "2025.07.01 - 2025.09.16"
            },
            {
                flightno: "OM137",
                frequency: [4],
                departure: "10:10",
                arrival: "12:50",
                effectivedate: "2025.06.26 - 2025.09.18"
            }
        ],
        from: [
            {
                flightno: "OM138",
                frequency: [1, 3, 6],
                departure: "14:20",
                arrival: "05:10 (+1)",
                effectivedate: "2025.03.31 - 2025.10.25"
            },
            {
                flightno: "OM138",
                frequency: [5, 7],
                departure: "14:20",
                arrival: "05:10 (+1)",
                effectivedate: "2025.06.01 - 2025.09.28"
            },
            {
                flightno: "OM138",
                frequency: [2],
                departure: "14:20",
                arrival: "05:10 (+1)",
                effectivedate: "2025.07.01 - 2025.09.16"
            },
            {
                flightno: "OM138",
                frequency: [4],
                departure: "14:20",
                arrival: "05:10 (+1)",
                effectivedate: "2025.06.26 - 2025.09.18"
            }
        ]
    },
    istanbul: {
        to: [
            {
                flightno: "OM161",
                frequency: [2, 4, 7],
                departure: "07:55",
                arrival: "12:25",
                effectivedate: "2025.03.30 - 2025.10.23"
            },
            {
                flightno: "OM161",
                frequency: [1],
                departure: "07:55",
                arrival: "12:25",
                effectivedate: "2025.06.23 - 2025.08.25"
            }
        ],
        from: [
            {
                flightno: "OM162",
                frequency: [2, 4, 7],
                departure: "14:10",
                arrival: "03:30 (+1)",
                effectivedate: "2025.03.30 - 2025.10.23"
            },
            {
                flightno: "OM162",
                frequency: [1],
                departure: "14:20",
                arrival: "03:40 (+1)",
                effectivedate: "2025.06.23 - 2025.08.25"
            }
        ]
    },
    beijing: {
        to: [
            {
                flightno: "OM223",
                frequency: [1, 3, 6],
                departure: "06:10",
                arrival: "08:25",
                effectivedate: "2025.03.31 - 2025.10.25"
            },
            {
                flightno: "OM223",
                frequency: [2, 4, 5, 7],
                departure: "18:00",
                arrival: "20:10",
                effectivedate: "2025.03.30 - 2025.10.24"
            },
            {
                flightno: "OM227",
                frequency: [1],
                departure: "22:30",
                arrival: "00:40 (+1)",
                effectivedate: "2025.06.02 - 2025.09.29"
            },
            {
                flightno: "OM227",
                frequency: [3],
                departure: "22:50",
                arrival: "01:00 (+1)",
                effectivedate: "2025.05.07 - 2025.10.22"
            },
            {
                flightno: "OM227",
                frequency: [6],
                departure: "23:00",
                arrival: "01:10 (+1)",
                effectivedate: "2025.06.07 - 2025.10.18"
            }
        ],
        from: [
            {
                flightno: "OM224",
                frequency: [1, 3, 6],
                departure: "09:30",
                arrival: "12:00",
                effectivedate: "2025.03.31 - 2025.10.25"
            },
            {
                flightno: "OM224",
                frequency: [2, 4, 5, 7],
                departure: "21:10",
                arrival: "23:40",
                effectivedate: "2025.03.30 - 2025.10.24"
            },
            {
                flightno: "OM228",
                frequency: [2],
                departure: "01:40",
                arrival: "04:10",
                effectivedate: "2025.06.02 - 2025.09.30"
            },
            {
                flightno: "OM228",
                frequency: [4],
                departure: "02:00",
                arrival: "04:35",
                effectivedate: "2025.05.08 - 2025.10.23"
            },
            {
                flightno: "OM228",
                frequency: [7],
                departure: "02:00",
                arrival: "04:35",
                effectivedate: "2025.06.08 - 2025.10.19"
            }
        ]
    },
    guangzhou: {
        to: [
            {
                flightno: "OM235",
                frequency: [4, 7],
                departure: "21:05",
                arrival: "01:05 (+1)",
                effectivedate: "2025.04.06 - 2025.10.23"
            }
        ],
        from: [
            {
                flightno: "OM236",
                frequency: [1, 5],
                departure: "02:05",
                arrival: "06:15",
                effectivedate: "2025.04.07 - 2025.10.24"
            }
        ]
    }
};


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Schedule = () => {

    const [schedules, setSchedules] = useState({
        to: [],
        from: []
    })
    const [countries, setCountries] = useState([])
    const [selectedtab, setSelectedTab] = useState()
    const [selectedtabmain, setSelectedTabmain] = useState('international')
    const { t } = useTranslation();

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
        console.log(tmpcountry);
        setCountries(tmpcountry)

    }, [selectedtabmain])

    const ScheduleTable = ({ data }) => {
        return <table className="min-w-full divide-y divide-gray-300">
            <thead>
                <tr className='bg-white/50'>
                    <th scope="col" className="py-2 pl-2 pr-3 text-left text-sm font-semibold text-gray-900 w-20">
                        {t('flightno')}
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                        {t('frequency')}
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900 w-24">
                        {t('departure')}
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900 w-24">
                        {t('arrival')}
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900 w-80">
                        {t('effectivedate')}
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {data.map((schedule, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-zinc-200/50' : 'bg-white/50'}>
                        <td className="whitespace-nowrap py-2 pl-2 pr-3 text-sm font-medium">
                            {schedule.flightno}
                        </td>
                        <td className="whitespace-nowrap py-2 px-3 text-sm">
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
                        <td className="whitespace-nowrap py-2 px-3 text-sm">{schedule.departure}</td>
                        <td className="whitespace-nowrap py-2 px-3 text-sm">{schedule.arrival}</td>
                        <td className="whitespace-nowrap py-2 px-3 text-sm">{schedule.effectivedate}</td>
                    </tr>
                ))}
                {data.length === 0 && <tr className={'bg-zinc-200 text-center'}>
                    <td colSpan={5} className='py-2 px-3 text-sm'>{t('empty')}</td>
                </tr>}
            </tbody>
        </table>
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-16 my-16 min-h-[80vh]">
            <div className='bg-background1 fixed bg-cover h-full w-full top-0 left-0 -z-10'></div>

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

            <div className='p-3'>
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

                <div className='mt-6 text-xl font-bold'>
                    {t('ulaanbaatar')} - {t(selectedtab)}
                </div>
                <div className='overflow-x-auto mt-6'>
                    <ScheduleTable data={schedules.to} />
                </div>
                <div className='mt-6 text-xl font-bold'>
                    {t(selectedtab)} - {t('ulaanbaatar')}
                </div>
                <div className='overflow-x-auto mt-6'>
                    <ScheduleTable data={schedules.from} />
                    <div className="p-0 mt-3 text-sm font-bold text-gray-700">{t('local_time')} <br />
                        (+1) : {t('next_day')} <br />
                        {t('schedule_change_notice')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Schedule
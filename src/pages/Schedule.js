import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CarouselSimple } from '../components/features/CarouselSimple';

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

const mongoliaschedules = {
    "khovd": {
        "to": [
            {
                "flightno": "OM031",
                direction: "UBN-HVD",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "06:50",
                "arrival": "08:00",
                "effectivedate": "2025.04.01 - 2025.10.24"
            },
            {
                "flightno": "OM031",
                direction: "UBN-HVD",
                "flight": "CRJ700 JU-1700",
                "frequency": [7],
                "departure": "11:45",
                "arrival": "12:55",
                "effectivedate": "2025.03.30 - 2025.05.25"
            },
            {
                "flightno": "OM031",
                direction: "UBN-HVD",
                "flight": "CRJ700 JU-1700",
                "frequency": [7],
                "departure": "06:50",
                "arrival": "08:00",
                "effectivedate": "2025.06.01 - 2025.08.31"
            },
            {
                "flightno": "OM031",
                direction: "UBN-HVD",
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
                direction: "HVD-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "08:40",
                "arrival": "11:35",
                "effectivedate": "2025.04.01 - 2025.10.24"
            },
            {
                "flightno": "OM032",
                direction: "HVD-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [7],
                "departure": "13:35",
                "arrival": "16:30",
                "effectivedate": "2025.03.30 - 2025.05.25"
            },
            {
                "flightno": "OM032",
                direction: "HVD-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [7],
                "departure": "08:40",
                "arrival": "11:35",
                "effectivedate": "2025.06.01 - 2025.08.31"
            },
            {
                "flightno": "OM032",
                direction: "HVD-UBN",
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
                direction: "UBN-LTI",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "13:30",
                "arrival": "15:10",
                "effectivedate": "2025.06.02 - 2025.08.28"
            },
            {
                "flightno": "OM061",
                direction: "UBN-LTI",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "13:35",
                "arrival": "16:20",
                "stop": 1,
                "effectivedate": "2025.03.31 - 2025.05.29"
            },
            {
                "flightno": "OM061",
                direction: "UBN-LTI",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "13:35",
                "arrival": "16:20",
                "stop": 1,
                "effectivedate": "2025.09.01 - 2025.10.23"
            }
        ],
        "from": [
            {
                "flightno": "OM042",
                direction: "LTI-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "15:50",
                "arrival": "17:15",
                "effectivedate": "2025.06.02 - 2025.08.28"
            },
            {
                "flightno": "OM062",
                direction: "LTI-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "17:30",
                "arrival": "18:55",
                "effectivedate": "2025.03.31 - 2025.05.29"
            },
            {
                "flightno": "OM062",
                direction: "LTI-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "17:30",
                "arrival": "18:55",
                "effectivedate": "2025.09.01 - 2025.10.23"
            }
        ]
    },
    "ulaangom": {
        "to": [
            {
                "flightno": "OM051",
                direction: "UBN-ULO",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "12:45 ",
                "arrival": "13:55",
                "effectivedate": "2025.06.03 - 2025.08.29"
            },
            {
                "flightno": "OM051",
                direction: "UBN-ULO",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "12:50",
                "arrival": "13:55",
                "effectivedate": "2025.04.01 - 2025.05.30"
            },
            {
                "flightno": "OM051",
                direction: "UBN-ULO",
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
                direction: "ULO-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "14:30",
                "arrival": "17:20",
                "effectivedate": "2025.06.03 - 2025.08.29"
            },
            {
                "flightno": "OM051",
                direction: "ULO-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "14:35",
                "arrival": "18:40",
                "stop": 1,
                "effectivedate": "2025.04.01 - 2025.05.30"
            },
            {
                "flightno": "OM051",
                direction: "ULO-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "14:35",
                "arrival": "18:40",
                "stop": 1,
                "effectivedate": "2025.09.02 - 2025.10.24"
            }
        ]
    },
    "uliastai": {
        "to": [
            {
                "flightno": "OM061",
                direction: "UBN-ULZ",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "18:25",
                "arrival": "20:00",
                "effectivedate": "2025.06.02 - 2025.08.28"
            },
            {
                "flightno": "OM061",
                direction: "UBN-ULZ",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "13:35",
                "arrival": "15:00",
                "effectivedate": "2025.03.31 - 2025.05.29"
            },
            {
                "flightno": "OM061",
                direction: "UBN-ULZ",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "13:35",
                "arrival": "15:00",
                "effectivedate": "2025.09.01 - 2025.10.23"
            }
        ],
        "from": [
            {
                "flightno": "OM062",
                direction: "ULZ-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "20:40",
                "arrival": "22:05",
                "effectivedate": "2025.06.02 - 2025.08.28"
            },
            {
                "flightno": "OM061",
                direction: "ULZ-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "15:40",
                "arrival": "18:55",
                "stop": 1,
                "effectivedate": "2025.03.31 - 2025.05.29"
            },
            {
                "flightno": "OM061",
                direction: "ULZ-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [1, 4],
                "departure": "15:40",
                "arrival": "18:55",
                "stop": 1,
                "effectivedate": "2025.09.01 - 2025.10.23"
            }
        ]
    },
    "ulgii": {
        "to": [
            {
                "flightno": "OM067",
                direction: "UBN-ULG",
                "flight": "CRJ700 JU-1700",
                "frequency": [3, 6],
                "departure": "07:25",
                "arrival": "08:40",
                "effectivedate": "2025.04.02 - 2025.10.25"
            },
            {
                "flightno": "OM067",
                direction: "UBN-ULG",
                "flight": "CRJ700 JU-1700",
                "frequency": [1],
                "departure": "07:25",
                "arrival": "08:40",
                "effectivedate": "2025.06.02 - 2025.10.20"
            }
        ],
        "from": [
            {
                "flightno": "OM068",
                direction: "ULG-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [3, 6],
                "departure": "09:20",
                "arrival": "12:20",
                "effectivedate": "2025.04.02 - 2025.10.25"
            },
            {
                "flightno": "OM068",
                direction: "ULG-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [1],
                "departure": "09:20",
                "arrival": "12:20",
                "effectivedate": "2025.06.02 - 2025.10.20"
            }
        ]
    },
    "murun": {
        "to": [
            {
                "flightno": "OM081",
                direction: "UBN-MXV",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 6],
                "departure": "18:30",
                "arrival": "19:45",
                "effectivedate": "2025.06.03 - 2025.08.30"
            },
            {
                "flightno": "OM081",
                direction: "UBN-MXV",
                "flight": "CRJ700 JU-1700",
                "frequency": [4],
                "departure": "09:25",
                "arrival": "10:35",
                "effectivedate": "2025.06.05 - 2025.08.28"
            },
            {
                "flightno": "OM051",
                direction: "UBN-MXV",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "12:50",
                "arrival": "16:45",
                "stop": 1,
                "effectivedate": "2025.04.01 - 2025.05.30"
            },
            {
                "flightno": "OM051",
                direction: "UBN-MXV",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "12:50",
                "arrival": "16:45",
                "stop": 1,
                "effectivedate": "2025.09.02 - 2025.10.24"
            }
        ],
        "from": [
            {
                "flightno": "OM082",
                direction: "MXV-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 6],
                "departure": "20:25",
                "arrival": "21:30",
                "effectivedate": "2025.06.03 - 2025.08.30"
            },
            {
                "flightno": "OM082",
                direction: "MXV-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [4],
                "departure": "11:15",
                "arrival": "12:20",
                "effectivedate": "2025.06.05 - 2025.08.28"
            },
            {
                "flightno": "OM052",
                direction: "MXV-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "17:30",
                "arrival": "18:40",
                "effectivedate": "2025.04.01 - 2025.05.30"
            },
            {
                "flightno": "OM052",
                direction: "MXV-UBN",
                "flight": "CRJ700 JU-1700",
                "frequency": [2, 5],
                "departure": "17:30",
                "arrival": "18:40",
                "effectivedate": "2025.09.02 - 2025.10.24"
            }
        ]
    },
}


const countryschedules = {
    frankfurt: {
        to: [
            {
                flightno: "OM137",
                direction: "UBN-FRA",
                frequency: [1, 3, 6],
                departure: "10:10",
                arrival: "12:50",
                effectivedate: "2025.03.31 - 2025.10.25"
            },
            {
                flightno: "OM137",
                direction: "UBN-FRA",
                frequency: [5, 7],
                departure: "10:10",
                arrival: "12:50",
                effectivedate: "2025.06.01 - 2025.09.28"
            },
            {
                flightno: "OM137",
                direction: "UBN-FRA",
                frequency: [2],
                departure: "10:10",
                arrival: "12:50",
                effectivedate: "2025.07.01 - 2025.09.16",
                perspective: true
            },
            {
                flightno: "OM137",
                direction: "UBN-FRA",
                frequency: [4],
                departure: "10:10",
                arrival: "12:50",
                effectivedate: "2025.06.26 - 2025.09.18",
                perspective: true
            }
        ],
        from: [
            {
                flightno: "OM138",
                direction: "FRA-UBN",
                frequency: [1, 3, 6],
                departure: "14:20",
                arrival: "05:10 (+1)",
                effectivedate: "2025.03.31 - 2025.10.25"
            },
            {
                flightno: "OM138",
                direction: "FRA-UBN",
                frequency: [5, 7],
                departure: "14:20",
                arrival: "05:10 (+1)",
                effectivedate: "2025.06.01 - 2025.09.28"
            },
            {
                flightno: "OM138",
                direction: "FRA-UBN",
                frequency: [2],
                departure: "14:20",
                arrival: "05:10 (+1)",
                effectivedate: "2025.07.01 - 2025.09.16",
                perspective: true
            },
            {
                flightno: "OM138",
                direction: "FRA-UBN",
                frequency: [4],
                departure: "14:20",
                arrival: "05:10 (+1)",
                effectivedate: "2025.06.26 - 2025.09.18",
                perspective: true
            }
        ]
    },
    istanbul: {
        short: "IST",
        to: [
            {
                flightno: "OM161",
                direction: "UBN-IST",
                frequency: [2, 4, 7],
                departure: "07:55",
                arrival: "12:25",
                effectivedate: "2025.03.30 - 2025.10.23"
            },
            {
                flightno: "OM161",
                direction: "UBN-IST",
                frequency: [1],
                departure: "07:55",
                arrival: "12:25",
                effectivedate: "2025.06.23 - 2025.08.25"
            }
        ],
        from: [
            {
                flightno: "OM162",
                direction: "IST-UBN",
                frequency: [2, 4, 7],
                departure: "14:10",
                arrival: "03:30 (+1)",
                effectivedate: "2025.03.30 - 2025.10.23"
            },
            {
                flightno: "OM162",
                direction: "IST-UBN",
                frequency: [1],
                departure: "14:20",
                arrival: "03:40 (+1)",
                effectivedate: "2025.06.23 - 2025.08.25"
            }
        ]
    },
    beijing: {
        short: "PEK",
        to: [
            {
                flightno: "OM223",
                direction: "UBN-PEK",
                frequency: [1, 3, 6],
                departure: "06:10",
                arrival: "08:25",
                effectivedate: "2025.03.31 - 2025.10.25"
            },
            {
                flightno: "OM223",
                direction: "UBN-PEK",
                frequency: [2, 4, 5, 7],
                departure: "18:00",
                arrival: "20:10",
                effectivedate: "2025.03.30 - 2025.10.24"
            },
            {
                flightno: "OM227",
                direction: "UBN-PEK",
                frequency: [1],
                departure: "22:30",
                arrival: "00:40 (+1)",
                effectivedate: "2025.06.02 - 2025.09.29"
            },
            {
                flightno: "OM227",
                direction: "UBN-PEK",
                frequency: [3],
                departure: "22:50",
                arrival: "01:00 (+1)",
                effectivedate: "2025.05.07 - 2025.10.22"
            },
            {
                flightno: "OM227",
                direction: "UBN-PEK",
                frequency: [6],
                departure: "23:00",
                arrival: "01:10 (+1)",
                effectivedate: "2025.06.07 - 2025.10.18"
            }
        ],
        from: [
            {
                flightno: "OM224",
                direction: "PEK-UBN",
                frequency: [1, 3, 6],
                departure: "09:30",
                arrival: "12:00",
                effectivedate: "2025.03.31 - 2025.10.25"
            },
            {
                flightno: "OM224",
                direction: "PEK-UBN",
                frequency: [2, 4, 5, 7],
                departure: "21:10",
                arrival: "23:40",
                effectivedate: "2025.03.30 - 2025.10.24"
            },
            {
                flightno: "OM228",
                direction: "PEK-UBN",
                frequency: [2],
                departure: "01:40",
                arrival: "04:10",
                effectivedate: "2025.06.02 - 2025.09.30"
            },
            {
                flightno: "OM228",
                direction: "PEK-UBN",
                frequency: [4],
                departure: "02:00",
                arrival: "04:35",
                effectivedate: "2025.05.08 - 2025.10.23"
            },
            {
                flightno: "OM228",
                direction: "PEK-UBN",
                frequency: [7],
                departure: "02:00",
                arrival: "04:35",
                effectivedate: "2025.06.08 - 2025.10.19"
            }
        ]
    },
    guangzhou: {
        short: "CAN",
        to: [
            {
                flightno: "OM235",
                direction: "UBN-CAN",
                frequency: [4, 7],
                departure: "21:05",
                arrival: "01:05 (+1)",
                effectivedate: "2025.04.06 - 2025.10.23"
            }
        ],
        from: [
            {
                flightno: "OM236",
                direction: "CAN-UBN",
                frequency: [1, 5],
                departure: "02:05",
                arrival: "06:15",
                effectivedate: "2025.04.07 - 2025.10.24"
            }
        ]
    },
    hongkong: {
        to: [
            {
                flightno: "OM2971",
                direction: "UBN-HKG",
                frequency: [1],
                departure: "12:55",
                arrival: "17:30",
                effectivedate: "2025.04.14"
            },
            {
                flightno: "OM2971",
                direction: "UBN-HKG",
                frequency: [1],
                departure: "12:55",
                arrival: "17:30",
                effectivedate: "2025.05.05 - 2025.10.20"
            },
            {
                flightno: "OM297",
                direction: "UBN-HKG",
                frequency: [2],
                departure: "06:20",
                arrival: "10:55",
                effectivedate: "2025.04.01 - 2025.04.08"
            },
            {
                flightno: "OM297",
                direction: "UBN-HKG",
                frequency: [2],
                departure: "06:20",
                arrival: "10:55",
                effectivedate: "2025.04.22 - 2025.10.21"
            },
            {
                flightno: "OM297",
                direction: "UBN-HKG",
                frequency: [4, 5, 7],
                departure: "06:20",
                arrival: "10:55",
                effectivedate: "2025.03.30 - 2025.10.24"
            },
            {
                flightno: "OM297",
                direction: "UBN-HKG",
                frequency: [3, 6],
                departure: "12:55",
                arrival: "17:30",
                effectivedate: "2025.04.02 - 2025.10.25"
            },
            {
                flightno: "OM2971",
                direction: "UBN-HKG",
                frequency: [2, 5],
                departure: "12:55",
                arrival: "17:30",
                effectivedate: "2025.07.01 - 2025.08.29"
            }
        ],
        from: [
            {
                flightno: "OM2972",
                direction: "HKG-UBN",
                frequency: [1],
                departure: "18:30",
                arrival: "23:10",
                effectivedate: "2025.04.14"
            },
            {
                flightno: "OM2972",
                direction: "HKG-UBN",
                frequency: [1],
                departure: "18:30",
                arrival: "23:10",
                effectivedate: "2025.05.05 - 2025.10.20"
            },
            {
                flightno: "OM298",
                direction: "HKG-UBN",
                frequency: [2],
                departure: "12:05",
                arrival: "16:45",
                effectivedate: "2025.04.01 - 2025.04.08"
            },
            {
                flightno: "OM298",
                direction: "HKG-UBN",
                frequency: [2],
                departure: "12:05",
                arrival: "16:45",
                effectivedate: "2025.04.22 - 2025.10.21"
            },
            {
                flightno: "OM298",
                direction: "HKG-UBN",
                frequency: [4, 5, 7],
                departure: "12:05",
                arrival: "16:45",
                effectivedate: "2025.03.30 - 2025.10.24"
            },
            {
                flightno: "OM298",
                direction: "HKG-UBN",
                frequency: [3, 6],
                departure: "18:30",
                arrival: "23:10",
                effectivedate: "2025.04.02 - 2025.10.25"
            },
            {
                flightno: "OM2972",
                direction: "HKG-UBN",
                frequency: [2, 5],
                departure: "19:20",
                arrival: "23:10",
                effectivedate: "2025.07.01 - 2025.08.29"
            }
        ]
    },
    seoul: {
        to: [
            {
                flightno: "OM301",
                direction: "UBN-ICN",
                frequency: [1, 2, 3, 4, 5, 6, 7],
                departure: "08:40",
                arrival: "12:50",
                effectivedate: "2025.03.30 - 2025.10.25"
            },
            {
                flightno: "OM307",
                direction: "UBN-ICN",
                frequency: [2, 5, 6, 7],
                departure: "18:15",
                arrival: "22:25",
                effectivedate: "2025.03.30 - 2025.10.25"
            },
            {
                flightno: "OM307",
                direction: "UBN-ICN",
                frequency: [1, 3, 4],
                departure: "18:15",
                arrival: "22:25",
                effectivedate: "2025.05.01 - 2025.10.23"
            },
            {
                flightno: "OM309",
                direction: "UBN-ICN",
                frequency: [1, 2, 3, 4, 5, 6, 7],
                departure: "20:30",
                arrival: "00:40(+1)",
                effectivedate: "2025.06.01 - 2025.09.30"
            },
            {
                flightno: "OM303",
                direction: "UBN-ICN",
                frequency: [3, 5],
                departure: "10:45",
                arrival: "14:55",
                effectivedate: "2025.06.27 - 2025.09.26",
                perspective: true
            }
        ],
        from: [
            {
                flightno: "OM302",
                direction: "ICN-UBN",
                frequency: [1, 2, 3, 4, 5, 6, 7],
                departure: "14:20",
                arrival: "17:00",
                effectivedate: "2025.03.30 - 2025.10.25"
            },
            {
                flightno: "OM308",
                direction: "ICN-UBN",
                frequency: [1, 3, 6, 7],
                departure: "00:05",
                arrival: "02:45",
                effectivedate: "2025.03.31 - 2025.10.26"
            },
            {
                flightno: "OM308",
                direction: "ICN-UBN",
                frequency: [2, 4, 5],
                departure: "00:05",
                arrival: "02:45",
                effectivedate: "2025.05.02 - 2025.10.24"
            },
            {
                flightno: "OM310",
                direction: "ICN-UBN",
                frequency: [1, 2, 3, 4, 5, 6, 7],
                departure: "01:50",
                arrival: "04:30",
                effectivedate: "2025.06.02 - 2025.10.01"
            },
            {
                flightno: "OM304",
                direction: "ICN-UBN",
                frequency: [3, 5],
                departure: "16:05",
                arrival: "18:45",
                effectivedate: "2025.06.27 - 2025.09.26",
                perspective: true
            }
        ]
    },
    busan: {
        to: [
            {
                flightno: "OM311",
                direction: "UBN-PUS",
                frequency: [4, 7],
                departure: "07:30",
                arrival: "12:05",
                effectivedate: "2025.03.30 - 2025.10.23"
            },
            {
                flightno: "OM311",
                direction: "UBN-PUS",
                frequency: [6],
                departure: "11:00",
                arrival: "15:35",
                effectivedate: "2025.06.28 - 2025.09.06"
            },
            {
                flightno: "OM311",
                direction: "UBN-PUS",
                frequency: [2],
                departure: "07:30",
                arrival: "12:05",
                effectivedate: "2025.07.01 - 2025.08.26"
            }
        ],
        from: [
            {
                flightno: "OM312",
                direction: "PUS-UBN",
                frequency: [4, 7],
                departure: "13:05",
                arrival: "16:10",
                effectivedate: "2025.03.30 - 2025.10.23"
            },
            {
                flightno: "OM312",
                direction: "PUS-UBN",
                frequency: [6],
                departure: "17:00",
                arrival: "20:05",
                effectivedate: "2025.06.28 - 2025.09.06"
            },
            {
                flightno: "OM312",
                direction: "PUS-UBN",
                frequency: [2],
                departure: "13:05",
                arrival: "16:10",
                effectivedate: "2025.07.01 - 2025.08.26"
            }
        ]
    },
    tokyo: {
        to: [
            {
                flightno: "OM501",
                direction: "UBN-NRT",
                frequency: [1, 2, 3, 4, 5, 6, 7],
                departure: "07:45",
                arrival: "13:40",
                effectivedate: "2025.03.30 - 2025.10.25"
            },
            {
                flightno: "OM503",
                direction: "UBN-NRT",
                frequency: [3, 6],
                departure: "07:00",
                arrival: "12:55",
                effectivedate: "2025.07.02 - 2025.08.30"
            }
        ],
        from: [
            {
                flightno: "OM502",
                direction: "NRT-UBN",
                frequency: [1, 2, 3, 4, 5, 6, 7],
                departure: "14:40",
                arrival: "19:15",
                effectivedate: "2025.03.30 - 2025.10.25"
            },
            {
                flightno: "OM504",
                direction: "NRT-UBN",
                frequency: [3, 6],
                departure: "13:55",
                arrival: "18:30",
                effectivedate: "2025.07.02 - 2025.08.30"
            }
        ]
    },
    osaka: {
        "to": [
            {
                "flightno": "OM505",
                "direction": "UBN-KIX",
                "frequency": [3, 6],
                "departure": "13:00",
                "arrival": "18:00",
                "effectivedate": "2025.06.04 - 2025.09.27"
            }
        ],
        "from": [
            {
                "flightno": "OM506",
                "direction": "KIX-UBN",
                "frequency": [3, 6],
                "departure": "19:00",
                "arrival": "22:40",
                "effectivedate": "2025.06.04 - 2025.09.27"
            }
        ]
    },
    shanghai: {
        "to": [
            {
                "flightno": "OM265",
                "direction": "UBN-PVG",
                "frequency": [3, 6],
                "departure": "20:40",
                "arrival": "00:10(+1)",
                "effectivedate": "2025.07.02 - 2025.08.30"
            },
        ],
        "from": [
            {
                "flightno": "OM266",
                "direction": "PVG-UBN",
                "frequency": [4, 7],
                "departure": "01:10",
                "arrival": "05:00",
                "effectivedate": "2025.07.03 - 2025.08.31"
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
        setCountries(tmpcountry)

    }, [selectedtabmain])

    const ScheduleTable = ({ data, direction }) => {
        return <table className="min-w-full divide-y divide-gray-300">
            <thead>
                <tr className='bg-white/50'>
                    <th scope="col" className="py-2 pl-2 pr-3 text-left text-sm font-semibold text-gray-900 sm:w-40">
                        {t('flightno')}
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900 sm:w-48">
                        {t('direction')}
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                        {t('frequency')}
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900 w-32">
                        {t('departure')}
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900 w-32">
                        {t('arrival')}
                    </th>
                    {selectedtabmain !== 'international' && <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900 w-24">
                        {t('stop')}
                    </th>}
                    <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900 w-80">
                        {t('effectivedate')}
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {data.map((schedule, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-zinc-200/50' : 'bg-white/50'}>
                        <td className="whitespace-nowrap py-2 pl-2 pr-3 text-sm font-medium flex">
                            {schedule.perspective && <span class="relative flex w-2 h-2 hover:cursor-pointer mr-1 pt-1" title={t('perspective')}>
                                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                                <span class="relative inline-flex w-2 h-2 rounded-full bg-primary-500"></span>
                            </span>}
                            {schedule.flightno}
                        </td>
                        <td className="whitespace-nowrap py-2 px-3 text-sm">
                            {schedule.direction}
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
                        {selectedtabmain !== 'international' &&
                            <td className="whitespace-nowrap py-2 px-3 text-sm">{schedule.stop ?? '0'}</td>
                        }
                        <td className="whitespace-nowrap py-2 px-3 text-sm">{schedule.effectivedate}</td>
                    </tr>
                ))}
                {data.length === 0 && <tr className={'bg-zinc-200 text-center'}>
                    <td colSpan={6} className='py-2 px-3 text-sm'>{t('empty')}</td>
                </tr>}
            </tbody>
        </table>
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 pb-16 pt-8 my-16 min-h-[80vh]">
            <div className="mx-auto max-w-4xl text-center mb-4 sm:mb-8">
                <p className="mt-2 text-balance text-2xl font-semibold tracking-tight text-black sm:text-5xl uppercase">
                    {t('summer_flight')}
                </p>
            </div>
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
            <div className='mt-2'>
                <CarouselSimple slides={photos[selectedtabmain]} />
            </div>


            <div className='p-3'>
                <div className='flex border-b border-b-primary-500 flex-wrap'>
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
                <div className='mt-1 text-sm font-bold text-gray-700 flex'>
                    <span class="relative flex w-2 h-2 mr-2 pt-1">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                        <span class="relative inline-flex w-2 h-2 rounded-full bg-primary-500"></span>
                    </span>
                    - {t('additionalFlight')}
                </div>
            </div>
        </div>
    )
}

export default Schedule
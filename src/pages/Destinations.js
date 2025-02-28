import { useEffect, useLayoutEffect, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import mongoliaGeoJSON from './mn.json';
import am5geodataWorldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useTranslation } from 'react-i18next';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { useIsPhone } from '../service/CoreFunctions';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Destinations = () => {
    const { t } = useTranslation();
    const cities = [
        {
            id: "ulaanbaatar",
            title: t('ulaanbaatar'),
            country: 'mongolia',
            image: "/image/main/AdobeStock_227948748.jpg",
            geometry: { type: "Point", coordinates: [106.917, 47.9186] },
            perspectives: [
                "singapore",
                "australia",
                "usa",
            ]
        },
        {
            id: "frankfurt",
            title: t('frankfurt'),
            country: 'germany',
            distance: '7,010 km',
            duration: "8 hours, 45 minutes",
            distanceto: '6,941 km',
            durationto: "7 hours, 34 minutes",
            image: "/image/main/vertical-view-roemerberg-frankfurt-germany.jpg",
            geometry: { type: "Point", coordinates: [8.6821, 50.1109] }
        },
        {
            id: "hongkong",
            title: t('hongkong'),
            country: 'china',
            distance: '3,350 km',
            duration: "4 hours, 10 minutes",
            distanceto: "3,167 km",
            durationto: "4 hours, 1 minute",
            image: "/image/main/hong-kong-skyline-with-boats.jpg",
            geometry: { type: "Point", coordinates: [114.2, 22.4] },
            destinations: [
                'delhi',
                'mumbai',
                'ho_chi_minh',
                'singapore',
                'perth',
                'melbourne',
                'sydney',
                'brisbane',
                'san_francisco',
                'los_angeles',
                'chicago',
                'washington',
                'new_york',
                'boston',
            ]
        },
        {
            id: "tokyo",
            title: t('tokyo'),
            country: 'japan',
            distance: '3,869 km',
            duration: "4 hours, 22 minutes",
            distanceto: "3,635 km",
            durationto: "4 hours, 45 minutes",
            image: "/image/main/AdobeStock_268173642.jpg",
            geometry: { type: "Point", coordinates: [139.6917, 35.6895] },
            destinations: [
                'sapporo'
            ]
        },
        {
            id: "seoul",
            title: t('seoul'),
            country: 'south_korea',
            distance: '2,304 km',
            duration: "2 hours, 45 minutes",
            distanceto: "2,276 km",
            durationto: "3 hours, 10 minutes",
            image: "/image/main/seoul-tower-with-gyeongbokgung-roof-red-autumn-maple-leaves-namsan-mountain-south-korea.jpg",
            geometry: { type: "Point", coordinates: [126.9779, 37.5665] }
        },
        {
            id: "ho_chi_minh",
            title: t('ho_chi_minh'),
            country: 'vietnam',
            distance: '4,563 km',
            duration: "5 hours, 30 minutes",
            distanceto: "4,595 km",
            durationto: "5 hours, 16 minutes",
            image: "/image/main/54455949-city-18144-167c85df43f.jpg",
            geometry: { type: "Point", coordinates: [106.6297, 10.8231] }
        },
        {
            id: "istanbul",
            title: t('istanbul'),
            country: 'turkey',
            distance: '6,702 km',
            duration: "8 hours, 32 minutes",
            distanceto: "6,700 km",
            durationto: "7 hours, 30 minutes",
            image: "/image/main/AdobeStock_304983855.jpg",
            geometry: { type: "Point", coordinates: [28.90, 41.0582] },
            destinations: [
                'amsterdam',
                'brussels',
                'vienna',
                'warsaw',
                'zurich',
                'barcelona',
                'rome',
                'chicago',
            ]
        },
        {
            id: "busan",
            title: t('busan'),
            country: 'south_korea',
            distance: '2,593 km',
            duration: "3 hours, 1 minute",
            distanceto: "2,630 km",
            durationto: "3 hours, 35 minutes",
            image: "/image/main/AdobeStock_306120806.jpg",
            geometry: { type: "Point", coordinates: [129.0756, 35.1796] }
        },
        {
            id: "bangkok",
            title: t('bangkok'),
            country: 'thailand',
            distance: '4,117 km',
            duration: "5 hours, 0 minute",
            distanceto: "4,232 km",
            durationto: "4 hours, 51 minutes",
            image: "/image/main/AdobeStock_105446989.jpg",
            geometry: { type: "Point", coordinates: [100.5018, 13.7563] }
        },
        {
            id: "beijing",
            title: t('beijing'),
            country: 'china',
            distance: '1,383 km',
            duration: "1 hour, 50 minutes",
            distanceto: "1,287 km",
            durationto: "1 hour, 55 minutes",
            image: "/image/main/AdobeStock_38307012.jpg",
            geometry: { type: "Point", coordinates: [116.4074, 39.9042] }
        },
        {
            id: "osaka",
            title: t('osaka'),
            country: 'japan',
            distance: '3,221 km',
            duration: "3 hours, 50 minutes",
            distanceto: "3,119 km",
            durationto: "4 hour, 30 minutes",
            image: "/image/main/osaka-castle-cherry-blossom-spring-sakura-seasons-osaka-japan.jpg",
            geometry: { type: "Point", coordinates: [135.5022, 34.6937] }
        },
        {
            id: "phuket",
            title: t('phuket'),
            country: 'thailand',
            distance: '4,847 km',
            duration: "6 hours, 2 minutes",
            distanceto: "4,915 km",
            durationto: "5 hours, 37 minutes",
            image: "/image/main/beautiful-girl-sitting-rock-james-bond-island-phang-nga-thailand.jpg",
            geometry: { type: "Point", coordinates: [98.3381, 7.8804] }
        },
        {
            id: "guangzhou",
            title: t('guangzhou'),
            country: 'china',
            distance: '2,965 km',
            duration: "3 hours, 45 minutes",
            distanceto: "2,908 km",
            durationto: "3 hours, 48 minutes",
            image: "/image/main/AdobeStock_67203423.jpg",
            geometry: { type: "Point", coordinates: [113.2644, 23.1291] }
        }
    ];
    const [choosedCountry, setChoosedCountry] = useState({});
    const [shownavigate, setShowNavigate] = useState(true);
    const [showDirection, setShowDirection] = useState(true);
    const [point1, setpoint1] = useState(null);
    const [point3data, setpoint3data] = useState(cities[0]);
    const [point3, setpoint3] = useState(null);
    const isphone = useIsPhone()
    const colors = {
        G: am5.color("#2652fb"),
        O: am5.color(0xFFA500),
        N: am5.color(0xFF1493)
    }

    const citiesMn = [
        {
            id: "ulaanbaatar",
            title: "",
            country: "Mongolia",
            distance: "N/A",
            duration: "N/A",
            image: "/image/main/AdobeStock_227948748.jpg",
            geometry: { type: "Point", coordinates: [106.917, 47.9186] }
        },
        {
            id: "dalanzadgad",
            title: t('dalanzadgad'),
            country: "Mongolia",
            to: {
                distance: "533 km",
                duration: "49 minutes",
            },
            from: {
                distance: "578 km",
                duration: "49 minutes",
            },
            image: "/image/main/MG_9388KhermenTsavUmnugovi.jpg",
            geometry: { type: "Point", coordinates: [104.416, 43.5708] }
        },
        {
            id: "uliastai",
            title: t('uliastai'),
            country: "Mongolia",
            to: {
                distance: "817 km",
                duration: "1 hour, 16 minutes",
            },
            from: {
                distance: "817 km",
                duration: "1 hour, 5 minutes",
            },
            image: "/image/main/OtgontengerZavhan.jpg",
            geometry: { type: "Point", coordinates: [97.7694, 47.7417] }
        },
        {
            id: "khovd",
            title: t('khovd'),
            country: "Mongolia",
            to: {
                distance: "1,228 km",
                duration: "1 hour, 52 minutes",
            },
            from: {
                distance: "1,198 km",
                duration: "1 hour, 33 minutes",
            },
            image: "/image/main/AltanHuhiiHovd.jpg",
            geometry: { type: "Point", coordinates: [91.6419, 48.0056] }
        },
        {
            id: "altai",
            title: t('altai'),
            country: "Mongolia",
            to: {
                distance: "861 km",
                duration: "1 hour, 22 minutes",
            },
            from: {
                distance: "889 km",
                duration: "1 hour, 13 minutes",
            },
            image: "/image/main/photo_2024-02-14_15-53-24.jpg",
            geometry: { type: "Point", coordinates: [96.2491, 46.3722] }
        },
        {
            id: "ulaangom",
            title: t('ulaangom'),
            country: "Mongolia",
            to: {
                distance: "1,150 km",
                duration: "1 hour, 46 minutes",
            },
            from: {
                distance: "1,176 km",
                duration: "1 hour, 31 minutes",
            },
            image: "/image/main/IMG_4013TurgenMountainsUvs.jpg",
            geometry: { type: "Point", coordinates: [92.0667, 49.9811] }
        },
        {
            id: "murun",
            title: t('murun'),
            country: "Mongolia",
            to: {
                distance: "591 km",
                duration: "59 minutes",
            },
            from: {
                distance: "593 km",
                duration: "49 minutes",
            },
            image: "/image/main/DJI_0077.jpg",
            geometry: { type: "Point", coordinates: [100.155, 49.6342] }
        },
        {
            id: "ulgii",
            title: t('ulgii'),
            country: "Mongolia",
            to: {
                distance: "1,260 km",
                duration: "1 hour 53 minutes",
            },
            from: {
                distance: "1,342 km",
                duration: "1 hour 51 minutes",
            },
            image: "/image/main/BagaturgeniiuulsBayanUlgii.jpg",
            geometry: { type: "Point", coordinates: [89.9674, 48.9683] }
        },
    ];

    const overtime = {
        beijing: {
            frankfurt: "10 hours",
            istanbul: "11 hours, 50 minutes",
        },
        frankfurt: {
            beijing: "2 hours, 45 minutes",
            seoul: "7 hours, 40 minutes",
            tokyo: "4 hours, 10 minutes",
            hongkong: "2 hours",
        },
        seoul: {
            frankfurt: "22 hours, 40 minutes",
            istanbul: "17 hours",
        },
        tokyo: {
            frankfurt: "12 hours",
            istanbul: "12 hours, 40 minutes",
        },
        hongkong: {
            frankfurt: "16 hours"
        },
        istanbul: {
            beijing: "19 hours, 55 minutes",
            seoul: "2 hours, 20 minutes",
            tokyo: "3 hours, 30 minutes",
        },
    };
    const subcities = [
        {
            id: "amsterdam",
            title: t('amsterdam'),
            country: 'netherlands',
            geometry: { type: "Point", coordinates: [4.9041, 52.3676] }
        },
        {
            id: "brussels",
            title: t('brussels'),
            country: 'belgium',
            geometry: { type: "Point", coordinates: [4.3517, 50.8503] }
        },
        {
            id: "vienna",
            title: t('vienna'),
            country: 'austria',
            geometry: { type: "Point", coordinates: [16.3738, 48.2082] }
        },
        {
            id: "warsaw",
            title: t('warsaw'),
            country: 'poland',
            geometry: { type: "Point", coordinates: [21.0122, 52.2298] }
        },
        {
            id: "zurich",
            title: t('zurich'),
            country: 'switzerland',
            geometry: { type: "Point", coordinates: [8.5417, 47.3769] }
        },
        {
            id: "barcelona",
            title: t('barcelona'),
            country: 'spain',
            geometry: { type: "Point", coordinates: [2.1734, 41.3851] }
        },
        {
            id: "rome",
            title: t('rome'),
            country: 'italy',
            geometry: { type: "Point", coordinates: [12.4964, 41.9028] }
        },
        {
            id: "chicago",
            title: t('chicago'),
            country: 'usa',
            geometry: { type: "Point", coordinates: [-87.6298, 41.8781] }
        },
        {
            id: "delhi",
            title: t('delhi'),
            country: 'india',
            geometry: { type: "Point", coordinates: [77.2090, 28.6139] }
        },
        {
            id: "mumbai",
            title: t('mumbai'),
            country: 'india',
            geometry: { type: "Point", coordinates: [72.8777, 19.0760] }
        },
        {
            id: "ho_chi_minh",
            title: t('ho_chi_minh'),
            country: 'vietnam',
            geometry: { type: "Point", coordinates: [106.6602, 10.7629] }
        },
        {
            id: "singapore",
            title: t('singapore'),
            country: 'singapore',
            geometry: { type: "Point", coordinates: [103.8198, 1.3521] }
        },
        {
            id: "perth",
            title: t('perth'),
            country: 'australia',
            geometry: { type: "Point", coordinates: [115.8575, -31.9505] }
        },
        {
            id: "melbourne",
            title: t('melbourne'),
            country: 'australia',
            geometry: { type: "Point", coordinates: [144.9631, -37.8136] }
        },
        {
            id: "sydney",
            title: t('sydney'),
            country: 'australia',
            geometry: { type: "Point", coordinates: [151.2093, -33.8688] }
        },
        {
            id: "brisbane",
            title: t('brisbane'),
            country: 'australia',
            geometry: { type: "Point", coordinates: [153.0251, -27.4698] }
        },
        {
            id: "san_francisco",
            title: t('san_francisco'),
            country: 'usa',
            geometry: { type: "Point", coordinates: [-122.4194, 37.7749] }
        },
        {
            id: "los_angeles",
            title: t('los_angeles'),
            country: 'usa',
            geometry: { type: "Point", coordinates: [-118.2437, 34.0522] }
        },
        {
            id: "washington",
            title: t('washington'),
            country: 'usa',
            geometry: { type: "Point", coordinates: [-77.0369, 38.9072] }
        },
        {
            id: "new_york",
            title: t('new_york'),
            country: 'usa',
            geometry: { type: "Point", coordinates: [-74.0060, 40.7128] }
        },
        {
            id: "boston",
            title: t('boston'),
            country: 'usa',
            geometry: { type: "Point", coordinates: [-71.0589, 42.3601] }
        },
        {
            id: "sapporo",
            title: t('sapporo'),
            country: 'japan',
            geometry: { type: "Point", coordinates: [141.3544, 43.0618] }
        },
        {
            id: "singapore",
            title: t('singapore'),
            country: 'singapore',
            geometry: { type: "Point", coordinates: [103.8198, 1.3521] },
            perspective: true
        },
        {
            id: "australia",
            title: t('australia'),
            country: 'australia',
            geometry: { type: "Point", coordinates: [133.7751, -25.2744] },
            perspective: true,
        },
        {
            id: "usa",
            title: t('usa'),
            country: 'usa',
            geometry: { type: "Point", coordinates: [-98.5795, 39.8283] },
            perspective: true,
        }
    ];

    const clickShowNavigate = () => {
        setShowNavigate(!shownavigate)
    }

    const changePoint1 = (event) => {
        const data = event.value;
        setChoosedCountry(data)
        if (point3data.id === 'ulaanbaatar') {
            point3.setAll({
                longitude: data.geometry.coordinates[0],
                latitude: data.geometry.coordinates[1]
            })
        }
        point1.setAll({
            longitude: data.geometry.coordinates[0],
            latitude: data.geometry.coordinates[1]
        })
    }

    const changePoint3 = (event) => {
        const data = event.value;
        setpoint3data(data)
        point3.setAll({
            longitude: data.geometry.coordinates[0],
            latitude: data.geometry.coordinates[1]
        })
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

    useLayoutEffect(() => {
        let root = am5.Root.new("chartdiv");
        const countryLabels = [];
        // Set themes
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "rotateX",
                panY: "rotateY",
                projection: am5map.geoOrthographic(),
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                paddingBottom: 20,
            })
        );

        var cont = chart.children.push(am5.Container.new(root, {
            layout: root.horizontalLayout,
            x: am5.p100,
            y: 100,
            centerX: am5.p100,
            dx: -10,
        }));

        // Add labels and controls
        cont.children.push(am5.Label.new(root, {
            centerY: am5.p50,
            text: t('scheduled_routes'),
            fill: am5.color(0xffffff),
            fontWeight: "bold",
            fontSize: 12,
        }));

        var switchButton = cont.children.push(am5.Button.new(root, {
            themeTags: ["switch"],
            centerY: am5.p50,
            icon: am5.Circle.new(root, {
                themeTags: ["icon"]
            })
        }));

        cont.children.push(
            am5.Label.new(root, {
                centerY: am5.p50,
                text: t('codeshare_routes'),
                fill: am5.color(0xffffff),
                fontWeight: "bold",
                fontSize: 12,
            })
        );

        switchButton.on("active", function () {
            if (!switchButton.get("active")) {
                goHome()
            } else {
                sublineSeries.show()
                perspectiveSeries.show()
                subcitySeries.show()
                legend.show()
                setShowDirection(false)
            }
        });

        const buttonSettings = {
            paddingBottom: 1,
            paddingTop: 1,
            paddingRight: 1,
            paddingLeft: 2,
            x: am5.p100,
            y: 100,
            centerX: am5.p100,
            dx: -10,
        }
        let button2 = root.container.children.push(
            am5.Button.new(root, {
                ...buttonSettings,
                y: 140,
                label: am5.Label.new(root, {
                    text: t('domestic'),
                    centerY: am5.p50,
                    fontSize: 14
                }),
                // icon: am5.Graphics.new(root, plane2),
                icon: am5.Picture.new(root, {
                    interactive: true,
                    src: "/image/main/mongolia.png",
                    cursorOverStyle: "pointer",
                    width: 50,
                    centerY: am5.p50  // Center vertically
                }),
                cursorOverStyle: "pointer",
            })
        );

        button2.get("background").setAll({
            fill: am5.color(0x000000),
            fillOpacity: 0.4
        });

        button2.events.on("click", function () {
            gotoMongolia()
        });

        let zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
        zoomControl.homeButton.set("visible", true);
        chart.chartContainer.get("background").events.on("click", function () {
            goHome();
        })

        zoomControl.homeButton.events.on("click", function () {
            goHome();
        })

        // Create polygon series
        var polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodataWorldLow,
                exclude: ["AQ"]
            })
        );

        polygonSeries.mapPolygons.template.events.on("click", (ev) => {
            var dataItem = ev.target.dataItem;
            var data = dataItem.dataContext;
            if (data.id === 'MN') {
                gotoMongolia(dataItem)
            }
        });

        var backgroundSeries = chart.series.unshift(
            am5map.MapPolygonSeries.new(root, {})
        );

        backgroundSeries.mapPolygons.template.setAll({
            fill: am5.color("#00000080"),
            strokeOpacity: 0
        });

        backgroundSeries.data.push({
            geometry: am5map.getGeoRectangle(90, 180, -90, -180)
        });

        chart.animate({ key: "rotationX", to: -80.8467, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
        chart.animate({ key: "rotationY", to: -20.8625, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });

        // this will be invisible line (note strokeOpacity = 0) along which invisible points will animate
        let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
        lineSeries.mapLines.template.setAll({
            strokeOpacity: 1,
            stroke: am5.color("#2259ff"),
            strokeWidth: 1,
            // strokeDasharray: 1
        });

        let sublineSeries = chart.series.push(am5map.MapLineSeries.new(root, {
            visible: false
        }));
        sublineSeries.mapLines.template.setAll({
            strokeOpacity: 1,
            stroke: colors.O,
            strokeWidth: 1,
            // strokeDasharray: 1
        });

        let perspectiveSeries = chart.series.push(am5map.MapLineSeries.new(root, {
            visible: false
        }));
        perspectiveSeries.mapLines.template.setAll({
            strokeOpacity: 1,
            stroke: colors.N,
            strokeWidth: 1,
            // strokeDasharray: 1
        });

        let lineSeriesMn = chart.series.push(am5map.MapLineSeries.new(root, {
            lineType: "curved",
            visible: false,
        }));

        lineSeriesMn.mapLines.template.setAll({
            strokeOpacity: 1,
            stroke: am5.color("#FFD700"),
            strokeWidth: 1,
            // strokeDasharray: 1
        });

        let animatedBulletSeries = chart.series.push(
            am5map.MapPointSeries.new(root, {})
        );

        animatedBulletSeries.bullets.push(function () {
            let circle = am5.Circle.new(root, {
                radius: 0
            });

            return am5.Bullet.new(root, {
                sprite: circle
            });
        });

        // destination series
        let citySeries = chart.series.push(
            am5map.MapPointSeries.new(root, {})
        );

        let subcitySeries = chart.series.push(
            am5map.MapPointSeries.new(root, {
                visible: false,
            })
        );

        let citySeriesMn = chart.series.push(
            am5map.MapPointSeries.new(root, {
                visible: false,
            })
        );

        let pointSeriesMn = chart.series.push(am5map.MapPointSeries.new(root, {

        }));
        let planeSeriesMn = chart.series.push(am5map.MapPointSeries.new(root, {
            visible: false,
        }));
        let planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
        let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

        let point1 = null;
        let point2 = addCity({ latitude: 47.9186, longitude: 106.917 }, "Ulaanbaatar");
        let point3 = null;

        if (choosedCountry.id) {
            point1 = addCity({
                latitude: choosedCountry.geometry.coordinates[1],
                longitude: choosedCountry.geometry.coordinates[0]
            }, "Frankfurt");
            point3 = addCity({
                latitude: choosedCountry.geometry.coordinates[1],
                longitude: choosedCountry.geometry.coordinates[0]
            }, "Frankfurt");
        } else {
            point1 = addCity({ latitude: 50.1109, longitude: 8.6821 }, "Frankfurt");
            point3 = addCity({ latitude: 50.1109, longitude: 8.6821 }, "Frankfurt");
        }

        setpoint1(point1)
        setpoint3(point3)

        let lineDataItem = lineSeries.pushDataItem({
            pointsToConnect: [point1, point2, point3]
        });

        const point1Mn = addCityMn({ latitude: 47.9186, longitude: 106.917 }, "Ulaanbaatar");
        let lineDataItemMn = lineSeriesMn.pushDataItem({
            geometry: createArcLine({
                latitude: point1Mn.get("latitude"),
                longitude: point1Mn.get("longitude")
            }, {
                latitude: 48.0056, longitude: 91.6419
            }, 0.1)
        });

        let plane = am5.Graphics.new(root, {
            svgPath:
                "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
            scale: 0.07,
            centerY: am5.p50,
            centerX: am5.p50,
            fill: am5.color('#fcffff')
        });

        let planeMn = am5.Graphics.new(root, {
            svgPath:
                "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
            scale: 0.07,
            centerY: am5.p50,
            centerX: am5.p50,
            fill: am5.color('#fcffff')
        });

        planeSeries.bullets.push(function () {
            let container = am5.Container.new(root, {});
            container.children.push(plane);
            return am5.Bullet.new(root, { sprite: container });
        });

        planeSeriesMn.bullets.push(function () {
            let container = am5.Container.new(root, {});
            container.children.push(planeMn);
            return am5.Bullet.new(root, { sprite: container });
        });

        let circleTemplate = am5.Template.new({});

        // visible city circles
        citySeries.bullets.push(function (root, series, dataItem) {
            let container = am5.Container.new(root, {});
            const data = dataItem.dataContext;
            let circle = container.children.push(
                am5.Circle.new(root, {
                    radius: 6,
                    tooltipText: "{title}",
                    tooltipY: 0,
                    fill: data.id === 'ulaanbaatar' ? am5.color("#FFD700") : am5.color("#2652fb"), // 6 тэмдэгттэй HEX
                    stroke: am5.color(0xffffff), // 6 тэмдэгттэй HEX
                    strokeOpacity: 0.1,
                    // "scale": 0.7,
                    "strokeWidth": 2,
                    interactive: true, // Интерактив байдал нэмэх
                    cursorOverStyle: "pointer" // Hover үед курсорыг "pointer" болгох
                }, circleTemplate)
            );

            circle.animate({
                key: "strokeOpacity",
                to: 1,
                duration: 1000, // Animation duration in milliseconds (1s)
                loops: Infinity, // Infinite loop
                easing: am5.ease.yoyo(am5.ease.linear) // Smooth effect
            });

            let countryLabel = container.children.push(
                am5.Label.new(root, {
                    text: "{title}",
                    paddingLeft: 5,
                    populateText: true,
                    fontWeight: "bold",
                    fontSize: isphone ? 12 : 14,
                    centerY: am5.p50,
                    x: circle.get("radius"),
                    layer: 5,
                    fill: am5.color(0xffffff)
                })
            );

            circle.on("radius", function (radius) {
                countryLabel.set("x", radius);
            })
            countryLabels.push(countryLabel)
            circle.events.on("pointerover", function (event) {
                event.target.set("scale", 1.2); // Hover үед хэмжээг томруулах
            })
            circle.events.on("pointerout", function (event) {
                event.target.set("scale", 1); // Хэвийн хэмжээнд буцаах
            })

            circle.events.on("click", function (event) {
                planeDataItem.set("positionOnLine", 0);
                // planeDataItem.clear();
                resetPlaneAnimation()
                var dataItem = event.target.dataItem;
                var data = dataItem.dataContext;
                setChoosedCountry(data);
                setShowNavigate(true)
                if (data.id !== 'ulaanbaatar') {
                    point1.setAll({
                        longitude: data.geometry.coordinates[0],
                        latitude: data.geometry.coordinates[1]
                    })
                    point3.setAll({
                        longitude: data.geometry.coordinates[0],
                        latitude: data.geometry.coordinates[1]
                    })
                }
            });

            return am5.Bullet.new(root, {
                sprite: container
            });
        });
        citySeries.data.setAll(cities);

        subcitySeries.bullets.push(function (root, series, dataItem) {
            let container = am5.Container.new(root, {});
            const data = dataItem.dataContext;
            let circle = container.children.push(
                am5.Circle.new(root, {
                    radius: 6,
                    tooltipText: "{title}",
                    tooltipY: 0,
                    fill: data.perspective ? colors.N : colors.O, // 6 тэмдэгттэй HEX
                    stroke: am5.color(0xffffff), // 6 тэмдэгттэй HEX
                    strokeOpacity: 0.3,
                    // "scale": 0.7,
                    "strokeWidth": 2,
                    interactive: true, // Интерактив байдал нэмэх
                    cursorOverStyle: "pointer" // Hover үед курсорыг "pointer" болгох
                }, circleTemplate)
            );

            circle.animate({
                key: "strokeOpacity",
                to: 1,
                duration: 1000, // Animation duration in milliseconds (1s)
                loops: Infinity, // Infinite loop
                easing: am5.ease.yoyo(am5.ease.linear) // Smooth effect
            });

            let countryLabel = container.children.push(
                am5.Label.new(root, {
                    text: "{title}",
                    paddingLeft: 5,
                    populateText: true,
                    fontWeight: "bold",
                    fontSize: 12,
                    centerY: am5.p50,
                    x: circle.get("radius"),
                    layer: 5,
                    fill: am5.color(0xffffff)
                })
            );

            circle.on("radius", function (radius) {
                countryLabel.set("x", radius);
            })
            countryLabels.push(countryLabel)
            circle.events.on("pointerover", function (event) {
                event.target.set("scale", 1.2); // Hover үед хэмжээг томруулах
            })
            circle.events.on("pointerout", function (event) {
                event.target.set("scale", 1); // Хэвийн хэмжээнд буцаах
            })

            circle.events.on("click", function (event) {
                setShowNavigate(false)
            });

            return am5.Bullet.new(root, {
                sprite: container
            });
        });

        subcitySeries.data.setAll(subcities);

        citySeriesMn.bullets.push(function (root, series, dataItem) {
            let container = am5.Container.new(root, {});

            let circle = container.children.push(
                am5.Circle.new(root, {
                    layer: 100,
                    radius: 6,
                    tooltipText: "{title}",
                    tooltipY: 0,
                    fill: am5.color("#2652fb"), // 6 тэмдэгттэй HEX
                    stroke: am5.color(0xffffff), // 6 тэмдэгттэй HEX
                    strokeOpacity: 0.3,
                    // "scale": 0.7,
                    "strokeWidth": 2,
                    interactive: true, // Интерактив байдал нэмэх
                    cursorOverStyle: "pointer" // Hover үед курсорыг "pointer" болгох
                }, circleTemplate)
            );
            circle.set("layer", 200);
            circle.animate({
                key: "strokeOpacity",
                to: 1,
                duration: 1500, // Animation duration in milliseconds (1s)
                loops: Infinity, // Infinite loop
                easing: am5.ease.yoyo(am5.ease.linear) // Smooth effect
            });

            let countryLabel = container.children.push(
                am5.Label.new(root, {
                    text: "{title}",
                    layer: 100,
                    paddingLeft: 5,
                    populateText: true,
                    fontWeight: "bold",
                    fontSize: 12,
                    centerY: am5.p50,
                    x: circle.get("radius"),
                    fill: am5.color(0xffffff)
                })
            );

            circle.on("radius", function (radius) {
                countryLabel.set("x", radius);
            })
            countryLabels.push(countryLabel)
            circle.events.on("pointerover", function (event) {
                event.target.set("scale", 1.2); // Hover үед хэмжээг томруулах
            })
            circle.events.on("pointerout", function (event) {
                event.target.set("scale", 1); // Хэвийн хэмжээнд буцаах
            })

            circle.events.on("click", function (event) {
                var dataItem = event.target.dataItem;
                var data = dataItem.dataContext;
                if (data.id !== 'ulaanbaatar') {
                    planeDataItemMn.set("positionOnLine", 0);
                    lineDataItemMn = lineSeriesMn.pushDataItem({
                        geometry: createArcLine({
                            latitude: point1Mn.get("latitude"),
                            longitude: point1Mn.get("longitude")
                        }, {
                            longitude: data.geometry.coordinates[0],
                            latitude: data.geometry.coordinates[1]
                        }, 0.1)
                    });
                    planeDataItemMn.set("lineDataItem", lineDataItemMn);
                    // planeDataItem.clear();
                    resetPlaneAnimationMn()
                }

                setChoosedCountry(data);
                setShowNavigate(true)
            });

            return am5.Bullet.new(root, {
                sprite: container
            });
        });
        citySeriesMn.data.setAll(citiesMn);
        // Prepare line series data
        let mongoliaDataItem = citySeries.getDataItemById("ulaanbaatar");

        function createArcLine(start, end, curvature = 0.7, segments = 30) {
            let coords = [];
            for (let i = 0; i <= segments; i++) {
                let t = i / segments;
                let arcFactor = Math.sin(t * Math.PI) * curvature; // Муруйлтын нөлөөлөл
                let lat = start.latitude + (end.latitude - start.latitude) * t + arcFactor * 10;
                let lon = start.longitude + (end.longitude - start.longitude) * t;
                coords.push([lon, lat]);
            }
            return {
                type: "MultiLineString",
                coordinates: [coords]
            };
        }

        am5.array.each(citiesMn, function (did) {
            if (did.id !== 'ulaanbaatar') {
                let destinationDataItem = citySeriesMn.getDataItemById(did.id);
                // let lineDataItem = lineSeriesMn.pushDataItem({});
                // lineDataItem.set("pointsToConnect", [mongoliaDataItem, destinationDataItem])

                let startPoint = {
                    latitude: mongoliaDataItem.get("latitude"),
                    longitude: mongoliaDataItem.get("longitude")
                };

                let endPoint = {
                    latitude: destinationDataItem.get("latitude"),
                    longitude: destinationDataItem.get("longitude")
                };

                lineSeriesMn.pushDataItem({
                    geometry: createArcLine(startPoint, endPoint, 0.1) // 0.7 муруйлттай
                });
            }
        });

        // this will do all the animations
        am5.array.each(cities, function (did) {
            let destinationDataItem = citySeries.getDataItemById(did.id);
            let lineDataItem = lineSeries.pushDataItem({});
            lineDataItem.set("pointsToConnect", [mongoliaDataItem, destinationDataItem])
        });

        am5.array.each(cities, function (did) {
            if (did.destinations) {
                let mainDataItem = citySeries.getDataItemById(did.id);
                did.destinations.forEach(element => {
                    let lineDataItem = sublineSeries.pushDataItem({});
                    let destinationDataItem = subcitySeries.getDataItemById(element);
                    lineDataItem.set("pointsToConnect", [mainDataItem, destinationDataItem])
                });
            }
            if (did.perspectives) {
                let mainDataItem = citySeries.getDataItemById(did.id);
                did.perspectives.forEach(element => {
                    let lineDataItem = perspectiveSeries.pushDataItem({});
                    let destinationDataItem = subcitySeries.getDataItemById(element);
                    lineDataItem.set("pointsToConnect", [mainDataItem, destinationDataItem])
                });
            }
        });

        let planeDataItem = planeSeries.pushDataItem({
            lineDataItem,
            positionOnLine: 0,
            autoRotate: true
        });

        planeDataItem.dataContext = {};
        let planeDataItemMn = planeSeriesMn.pushDataItem({
            lineDataItem: lineDataItemMn,
            positionOnLine: 0,
            autoRotate: true
        });

        planeDataItemMn.dataContext = {};
        resetPlaneAnimation()
        resetPlaneAnimationMn()

        function resetPlaneAnimation() {
            // Re-animate the plane along the line
            planeDataItem.animate({
                key: "positionOnLine",
                to: 1,
                duration: 30000, // Adjust duration as needed
                loops: Infinity, // Make sure it loops if desired
                easing: am5.ease.yoyo(am5.ease.linear) // Smooth yoyo animation
            });

            // Update the rotation based on position
            planeDataItem.on("positionOnLine", (value) => {
                if (planeDataItem.dataContext.prevPosition < value) {
                    plane.set("rotation", 0);
                }

                if (planeDataItem.dataContext.prevPosition > value) {
                    plane.set("rotation", -180);
                }
                planeDataItem.dataContext.prevPosition = value;
            });
        }

        function resetPlaneAnimationMn() {
            planeDataItemMn.animate({
                key: "positionOnLine",
                to: 1,
                duration: 30000, // Adjust duration as needed
                loops: Infinity, // Make sure it loops if desired
                easing: am5.ease.yoyo(am5.ease.linear) // Smooth yoyo animation
            });

            // Update the rotation based on position
            planeDataItemMn.on("positionOnLine", (value) => {
                if (planeDataItemMn.dataContext.prevPosition < value) {
                    planeMn.set("rotation", 0);
                }

                if (planeDataItemMn.dataContext.prevPosition > value) {
                    planeMn.set("rotation", -180);
                }
                planeDataItemMn.dataContext.prevPosition = value;
            });
        }

        function addCity(coords, title) {
            return pointSeries.pushDataItem({
                latitude: coords.latitude,
                longitude: coords.longitude
            });
        }

        function addCityMn(coords, title) {
            return pointSeriesMn.pushDataItem({
                latitude: coords.latitude,
                longitude: coords.longitude
            });
        }

        function goHome() {
            chart.goHome();
            stateSeries.hide();
            backContainer.hide();
            lineSeriesMn.hide();
            planeSeriesMn.hide();
            citySeriesMn.hide();
            lineSeries.show()
            planeSeries.show()
            sublineSeries.hide()
            perspectiveSeries.hide()
            subcitySeries.hide()
            legend.hide()
            cont.show()
            button2.show()
            setShowDirection(true)
            setChoosedCountry({})
            planeDataItem.set("positionOnLine", 0);
            resetPlaneAnimation()
        }

        var stateSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
            visible: false,
            geoJSON: mongoliaGeoJSON
        }));

        stateSeries.mapPolygons.template.setAll({
            fill: am5.color(0x6771DC),
            templateField: "polygonSettings"
        });

        var backContainer = chart.children.push(am5.Container.new(root, {
            x: am5.p100,
            centerX: am5.p100,
            dx: -10,
            paddingTop: 2,
            paddingRight: 10,
            paddingBottom: 2,
            y: 100,
            interactiveChildren: false,
            layout: root.horizontalLayout,
            cursorOverStyle: "pointer",
            background: am5.RoundedRectangle.new(root, {
                fill: am5.color(0xffffff),
                fillOpacity: 0.2
            }),
            visible: false
        }));

        backContainer.children.push(am5.Label.new(root, {
            text: "Back",
            centerY: am5.p50,
            fill: am5.color(0xffffff)
        }));

        backContainer.children.push(am5.Graphics.new(root, {
            width: 32,
            height: 32,
            centerY: am5.p50,
            fill: am5.color(0xffffff),
            svgPath: "M12 9.059V6.5a1.001 1.001 0 0 0-1.707-.708L4 12l6.293 6.207a.997.997 0 0 0 1.414 0A.999.999 0 0 0 12 17.5v-2.489c2.75.068 5.755.566 8 3.989v-1c0-4.633-3.5-8.443-8-8.941z"
        }));

        backContainer.events.on("click", function () {
            goHome();
        });

        let legend = chart.children.push(am5.Legend.new(root, {
            visible: false,
            nameField: "name",
            fillField: "color",
            strokeField: "color",
            useDefaultMarker: true,
            centerX: am5.p50,
            x: am5.p50,
            centerY: am5.p100,
            y: am5.p100,
            dy: -20,
            background: am5.RoundedRectangle.new(root, {
                fill: am5.color(0xffffff),
                fillOpacity: 0.2
            })
        }));

        legend.labels.template.setAll({
            fill: am5.color(0xffffff) // White text color
        });

        legend.data.setAll([{
            name: t("scheduled_routes"),
            color: colors.G,
        }, {
            name: t("codeshare_routes"),
            color: colors.O
        }, {
            name: t("perspective"),
            color: colors.N
        }]);

        function gotoMongolia() {
            var dataItem = polygonSeries.getDataItemById('MN');
            setChoosedCountry({})
            var zoomAnimation = polygonSeries.zoomToDataItem(dataItem);
            Promise.all([
                zoomAnimation.waitForStop(),
            ]).then(function (results) {
                stateSeries.show();
                // polygonSeries.hide(100)
                backContainer.show();
                lineSeries.hide()
                planeSeries.hide()
                sublineSeries.hide()
                perspectiveSeries.hide()
                legend.hide()
                button2.hide()
                planeDataItemMn.set("positionOnLine", 0);
                resetPlaneAnimationMn()
                lineSeriesMn.set("layer", 100);
                planeSeriesMn.set("layer", 100);
                citySeriesMn.set("layer", 100);
                // pointSeriesMn.show();
                lineSeriesMn.show();
                planeSeriesMn.show();
                citySeriesMn.show();
                cont.hide()
                setShowDirection(false)
                setpoint3data(cities[0]);
            });
        }

        return () => {
            root.dispose();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='min-h-[100vh]'>
            <div className={`w-[100%] h-full`}>

                <div className={classNames(
                    choosedCountry.title ? 'opacity-100' : 'opacity-0',
                    'transition-opacity ease-in-out delay-150 duration-300'
                )}>
                    <div
                        className={
                            classNames(
                                'transition absolute bg-black/30 w-[22rem] h-full text-white pt-20',
                                'backdrop-blur-md space-y-2 shadow-md z-10 duration-500',
                                shownavigate ? 'translate-x-0' : '-translate-x-full'
                            )}
                        style={{
                            boxShadow: "0 1px 2px rgba(60,64,67,0.3),0 2px 6px 2px rgba(60,64,67,0.15)"
                        }}
                    >
                        {/* <div className='text-center'>
                                    {t('ulaanbaatar')} - {t(choosedCountry.id)}
                                </div> */}
                        <div className="flex flex-col justify-between h-full overflow-y-auto px-4">
                            <div>
                                {showDirection && <div className='flex mb-2'>
                                    <DropDownList
                                        data={cities}
                                        textField='title'
                                        value={choosedCountry}
                                        onChange={changePoint1}
                                    />
                                    <div className='w-16 mx-2'>
                                        <img src="/image/main/35456.png" alt="" className='w-full' />
                                    </div>
                                    <DropDownList
                                        data={cities}
                                        textField='title'
                                        value={point3data}
                                        onChange={changePoint3}
                                    />
                                </div>}
                                <div
                                    style={{ backgroundImage: `url(${choosedCountry.image ?? "/image/main/plane-500.jpg"})` }}
                                    className='rounded-md bg-cover bg-center bg-no-repeat h-44 w-full'
                                >
                                    {/* <img src={choosedCountry.image ?? "/image/main/plane-500.jpg"} alt=""
                                                className="rounded-md h-60"
                                            /> */}
                                </div>
                                {choosedCountry.image && <div className='text-justify text-sm mt-4'>
                                    {t(choosedCountry.id + 'desc')}
                                </div>}
                            </div>
                            <div>
                                {
                                    (point3data.id !== 'ulaanbaatar' && choosedCountry.id !== 'ulaanbaatar') ? <>
                                        <div className='text-right pt-3 font-bold'>
                                            {t(point3data.id)}
                                        </div>
                                        <div className='relative'>
                                            <div className='text-xs absolute right-[5%] bg-black/30 p-1 top-14 rounded backdrop-blur-md'>
                                                <div className='absolute -top-2 left-[50%]'>
                                                    <span className="relative flex h-3 w-3 mx-auto -z-[1]">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                                        <span className="relative h-3 w-3 rounded-full bg-sky-500"></span>
                                                    </span>
                                                </div>
                                                <div className='flex'>
                                                    <div>Distance: &nbsp;</div>
                                                    <div className='font-medium'>{point3data.distance}</div>
                                                </div>
                                                <div className='text-justify'>Total travel time: <p className='font-medium'>
                                                    {point3data.duration}
                                                </p>
                                                </div>
                                            </div>
                                        </div>
                                        <img src="/logos/some/flight-3.png" alt="" className='h-64' />
                                        {overtime?.[choosedCountry.id]?.[point3data.id] && <div className="relative">
                                            <div className='text-xs absolute bg-black/30 bottom-32 p-1 rounded backdrop-blur-md'>
                                                <div className='text-justify'>
                                                    Stopover time:
                                                    <p className='font-medium'>
                                                        {overtime?.[choosedCountry.id]?.[point3data.id]}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>}
                                        <div className='relative bottom-[8rem] text-right pr-20 font-bold text-lg'>
                                            {t('ulaanbaatar')}
                                        </div>
                                        <div className='font-bold -mt-8'>
                                            {t(choosedCountry.id)}
                                        </div>
                                        <div className='relative'>
                                            <div className='text-xs absolute right-[45%] bg-black/30 bottom-8 p-1 rounded backdrop-blur-md'>
                                                <div className='absolute -top-2 left-[50%]'>
                                                    <span className="relative flex h-3 w-3 mx-auto -z-[1]">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                                        <span className="relative h-3 w-3 rounded-full bg-sky-500"></span>
                                                    </span>
                                                </div>
                                                <div className='flex'>
                                                    <div>Distance: &nbsp;</div>
                                                    <div className='font-medium'>{choosedCountry.distanceto}</div>
                                                </div>
                                                <div className='text-justify'>Total travel time: <p className='font-medium'>
                                                    {choosedCountry.durationto}
                                                </p>
                                                </div>
                                            </div>
                                        </div>
                                    </> : <>
                                        <div className='text-right -mb-4 font-bold'>
                                            {choosedCountry.id === 'ulaanbaatar' ? t(point3data.id) : t('ulaanbaatar')}
                                        </div>
                                        {((choosedCountry.id === 'ulaanbaatar' && point3data.distance) || choosedCountry.to) && <div className='relative'>
                                            <div className='text-xs absolute top-6 bg-black/30 p-1 rounded backdrop-blur-md'>
                                                <div className='absolute -top-2 left-[50%]'>
                                                    <span className="relative flex h-3 w-3 mx-auto -z-[1]">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                                        <span className="relative h-3 w-3 rounded-full bg-sky-500"></span>
                                                    </span>
                                                </div>
                                                {choosedCountry.id === 'ulaanbaatar' ? <div className='font-medium'>{t(choosedCountry.id)}&rarr;{t(point3data.id)}</div> :
                                                    <div className='font-medium'>{t(choosedCountry.id)}&rarr;{t('ulaanbaatar')}</div>}
                                                <hr />
                                                <div className='flex'>
                                                    <div>Distance: &nbsp;</div>
                                                    <div className='font-medium'>{choosedCountry.id === 'ulaanbaatar' ? point3data.distance : choosedCountry.to.distance}</div>
                                                </div>
                                                <div className='text-justify'>Total travel time: <p className='font-medium'>
                                                    {choosedCountry.id === 'ulaanbaatar' ? point3data.duration : choosedCountry.to.duration}
                                                </p>
                                                </div>
                                            </div>
                                        </div>}
                                        <img src="/logos/some/flight2point.png" alt="" className='h-64' />
                                        <div className='font-bold'>
                                            {t(choosedCountry.id)}
                                        </div>
                                        {(choosedCountry.from || choosedCountry.distance) && <div className='relative'>
                                            <div className='text-xs absolute right-[30%] bg-black/30 bottom-12 p-1 rounded backdrop-blur-md'>
                                                <div className='absolute -top-2 left-[50%]'>
                                                    <span className="relative flex h-3 w-3 mx-auto -z-[1]">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                                        <span className="relative h-3 w-3 rounded-full bg-sky-500"></span>
                                                    </span>
                                                </div>
                                                {choosedCountry.from && <>
                                                    <div className='font-medium'>{t('ulaanbaatar')}&rarr;{t(choosedCountry.id)}</div>
                                                    <hr />
                                                </>}
                                                <div className='flex'>
                                                    <div>Distance: &nbsp;</div>
                                                    <div className='font-medium'>{choosedCountry.from ? choosedCountry.from.distance : choosedCountry.distanceto}</div>
                                                </div>
                                                <div className='text-justify'>Total travel time: <p className='font-medium'>
                                                    {choosedCountry.from ? choosedCountry.from.duration : choosedCountry.durationto}
                                                </p>
                                                </div>
                                            </div>
                                        </div>}
                                    </>
                                }


                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div className={
                        classNames(
                            'transition absolute left-[22rem] top-[calc(50%-24px)] block z-10 duration-500',
                            shownavigate ? 'translate-x-0' : '-translate-x-[22rem]'
                        )
                    }>
                        <button
                            className={classNames(
                                'h-[48px] w-[23px] bg-black/30 backdrop-blur-md cursor-pointer hover:bg-primary-700',
                                'rounded-r-full border-l border-l-primary-600'
                            )}
                            style={{
                                boxShadow: '0 1px 2px rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15)'
                            }}
                            onClick={clickShowNavigate}
                        >
                            {shownavigate ? <ChevronLeftIcon className='h-4 w-4 text-white' /> : <ChevronRightIcon className='h-4 w-4 text-white' />}
                        </button>
                    </div>
                </div>
                <div
                    id="chartdiv"
                    className={`h-[100vh]`}
                ></div>
                <div className="bg"></div>
                <div className="star-field">
                    <div className="layer"></div>
                    <div className="layer"></div>
                    <div className="layer"></div>
                </div>
                {/* <div className='h-[100px] fixed bottom-2 right-12'>
                    <img src="/image/main/partners.png" alt="" className='w-full h-full' />
                </div> */}
            </div>
        </div>
    )
}

export default Destinations
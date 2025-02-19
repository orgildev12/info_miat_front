import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import mongoliaGeoJSON from './mn.json';
import am5geodataWorldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Domestic = () => {
    const [choosedCountry, setChoosedCountry] = useState({});
    const [shownavigate, setShowNavigate] = useState(true);

    const { t } = useTranslation();

    const clickShowNavigate = () => {
        setShowNavigate(!shownavigate)
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

    useLayoutEffect(() => {
        // Chart root
        const root = am5.Root.new("chartdiv");

        // Apply theme
        root.setThemes([am5themes_Animated.new(root)]);

        // Create the map chart
        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "rotateX",
                panY: "rotateY",
                projection: am5map.geoOrthographic(),
                homeGeoPoint: { longitude: 103.13887713161994, latitude: 46.9599710670946 },
                // scale: 2,
                rotationX: -100.8467,
            })
        );

        // chart.zoomToGeoPoint({longitude: 103.13887713161994, latitude: 46.9599710670946}, 2, true);
        // Create polygon series
        var polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodataWorldLow,
                exclude: ["AQ"]
            })
        );

        polygonSeries.events.on("datavalidated", function () {
            chart.zoomToGeoPoint({longitude: 103.13887713161994, latitude: 46.9599710670946}, 9, true);
        })

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

        // chart.animate({ key: "rotationX", to: -80.8467, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
        // chart.animate({ key: "rotationY", to: -20.8625, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });


        // Add Mongolia series
        const mongoliaSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: mongoliaGeoJSON,
            })
        );

        mongoliaSeries.mapPolygons.template.setAll({
            tooltipText: "{name}",
            interactive: true,
            fill: am5.color(0x673ab7),
        });

        const citiesMn = [
            {
                id: "ulaanbaatar",
                title: "Ulaanbaatar",
                country: "Mongolia",
                distance: "N/A",
                duration: "N/A",
                image: "/image/main/AdobeStock_227948748.jpg",
                geometry: { type: "Point", coordinates: [106.917, 47.9186] }
            },
            {
                id: "dalanzadgad",
                title: "Dalanzadgad",
                country: "Mongolia",
                distance: "N/A",
                duration: "N/A",
                image: "/image/main/MG_9388KhermenTsavUmnugovi.jpg",
                geometry: { type: "Point", coordinates: [104.416, 43.5708] }
            },
            {
                id: "uliastai",
                title: "Uliastai",
                country: "Mongolia",
                distance: "N/A",
                duration: "N/A",
                image: "/image/main/OtgontengerZavhan.jpg",
                geometry: { type: "Point", coordinates: [97.7694, 47.7417] }
            },
            {
                id: "khovd",
                title: "Khovd",
                country: "Mongolia",
                distance: "N/A",
                duration: "N/A",
                image: "/image/main/AltanHuhiiHovd.jpg",
                geometry: { type: "Point", coordinates: [91.6419, 48.0056] }
            },
            {
                id: "altai",
                title: "Altai",
                country: "Mongolia",
                distance: "N/A",
                duration: "N/A",
                image: "/image/main/photo_2024-02-14_15-53-24.jpg",
                geometry: { type: "Point", coordinates: [96.2491, 46.3722] }
            },
            {
                id: "ulaangom",
                title: "Ulaangom",
                country: "Mongolia",
                distance: "N/A",
                duration: "N/A",
                image: "/image/main/IMG_4013TurgenMountainsUvs.jpg",
                geometry: { type: "Point", coordinates: [92.0667, 49.9811] }
            },
            {
                id: "murun",
                title: "Murun",
                country: "Mongolia",
                distance: "N/A",
                duration: "N/A",
                image: "/image/main/DJI_0077.jpg",
                geometry: { type: "Point", coordinates: [100.155, 49.6342] }
            },
            {
                id: "ulgii",
                title: "Ulgii",
                country: "Mongolia",
                distance: "N/A",
                duration: "N/A",
                image: "/image/main/BagaturgeniiuulsBayanUlgii.jpg",
                geometry: { type: "Point", coordinates: [89.9674, 48.9683] }
            },
        ];


        // Add lines for routes
        let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {
            lineType: "curved"
        }));
        
        lineSeries.mapLines.template.setAll({
            strokeOpacity: 1,
            stroke: am5.color("#2259ff"),
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

        let citySeries = chart.series.push(
            am5map.MapPointSeries.new(root, {})
        );

        let planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
        const pointSeries = chart.series.push(
            am5map.MapPointSeries.new(root, {
                idField: "id",
                latitudeField: "latitude",
                longitudeField: "longitude"
            })
        );

        let point1 = addCity({ latitude: 47.9186, longitude: 106.917 }, "Ulaanbaatar");
        let point2 = null;
        if (choosedCountry.id) {
            point2 = addCity({
                latitude: choosedCountry.geometry.coordinates[1],
                longitude: choosedCountry.geometry.coordinates[0]
            }, "Frankfurt");
        } else {
            point2 = addCity({ latitude: 48.0056, longitude: 102.8174 });
        }

        let lineDataItem = lineSeries.pushDataItem({
            type: "LineString",
            pointsToConnect: [point1, point2]
        });


        let plane = am5.Graphics.new(root, {
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

        let circleTemplate = am5.Template.new({});
        // visible city circles
        citySeries.bullets.push(function (root, series, dataItem) {
            let container = am5.Container.new(root, {});

            let circle = container.children.push(
                am5.Circle.new(root, {
                    radius: 6,
                    tooltipText: "{title}",
                    tooltipY: 0,
                    fill: am5.color("#2652fb"), // 6 тэмдэгттэй HEX
                    stroke: am5.color("#2652fb"), // 6 тэмдэгттэй HEX
                    strokeOpacity: 0.3,
                    // "scale": 0.7,
                    "strokeWidth": 5,
                    interactive: true, // Интерактив байдал нэмэх
                    cursorOverStyle: "pointer" // Hover үед курсорыг "pointer" болгох
                }, circleTemplate)
            );

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
                point2.setAll({
                    longitude: data.geometry.coordinates[0],
                    latitude: data.geometry.coordinates[1]
                })
            });

            return am5.Bullet.new(root, {
                sprite: container
            });
        });

        citySeries.data.setAll(citiesMn);

        // Prepare line series data
        let mongoliaDataItem = citySeries.getDataItemById("ulaanbaatar");

        // this will do all the animations
        am5.array.each(citiesMn, function (did) {
            let destinationDataItem = citySeries.getDataItemById(did.id);
            let lineDataItem = lineSeries.pushDataItem({});
            lineDataItem.set("pointsToConnect", [mongoliaDataItem, destinationDataItem])
        });

        let planeDataItem = planeSeries.pushDataItem({
            lineDataItem,
            positionOnLine: 0,
            autoRotate: true
        });

        planeDataItem.dataContext = {};
        resetPlaneAnimation()
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

        function addCity(coords) {
            return pointSeries.pushDataItem({
                latitude: coords.latitude,
                longitude: coords.longitude
            });
        }


        return () => {
            root.dispose();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='mb-[4rem] h-[100vh]'>
            <div className='w-[100%] h-[100vh] fixed top-0 left-0'>

                <div className={classNames(
                    choosedCountry.title ? 'opacity-100' : 'opacity-0',
                    'transition-opacity ease-in-out delay-150 duration-300'
                )}>
                    <div
                        className={
                            classNames(
                                'transition absolute bg-black/30 w-80 h-full text-white pt-20',
                                'backdrop-blur-md px-4 py-8 space-y-4 shadow-md z-10 duration-500',
                                shownavigate ? 'translate-x-0' : '-translate-x-full'
                            )}
                        style={{
                            boxShadow: "0 1px 2px rgba(60,64,67,0.3),0 2px 6px 2px rgba(60,64,67,0.15)"
                        }}
                    >
                        {/* <div className='text-center'>
                                    {t('ulaanbaatar')} - {t(choosedCountry.id)}
                                </div> */}
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <div
                                    style={{ backgroundImage: `url(${choosedCountry.image})` }}
                                    className='rounded-md bg-cover bg-center bg-no-repeat h-44 w-full'
                                >
                                    {/* <img src={choosedCountry.image ?? "/image/main/plane-500.jpg"} alt=""
                                                className="rounded-md h-60"
                                            /> */}
                                </div>
                                <div className='text-justify text-sm mt-4'>
                                    {t(choosedCountry.id + 'desc')}
                                </div>
                            </div>
                            <div>
                                <div className='absolute right-[20%] pt-3 font-bold'>
                                    {t(choosedCountry.id)}
                                </div>
                                <div className='absolute bottom-[12rem] left-[10px]'>
                                    <div className='flex items-center bg-black/30 p-2 rounded backdrop-blur-md'>
                                        <div className='text-xs'>Distance: &nbsp;</div>
                                        <div className='text-sm'>{choosedCountry.distance}</div>
                                    </div>
                                    <span className="relative flex h-3 w-3 mx-auto -z-[1]">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                        <span className="relative h-3 w-3 rounded-full bg-sky-500"></span>
                                    </span>
                                </div>
                                <img src="/logos/some/flight2.png" alt="" className='h-64' />
                                <div className='absolute bottom-[3rem] left-[20%] font-bold'>
                                    {t('ulaanbaatar')}
                                </div>
                                <div className='absolute bottom-[6rem] right-[5px] bg-black/30 p-2 rounded backdrop-blur-md'>
                                    <div className='text-xs'>Total travel time: </div>
                                    <div className='text-sm'>{choosedCountry.duration}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={
                        classNames(
                            'transition absolute left-80 top-[calc(50%-24px)] block z-10 duration-500',
                            shownavigate ? 'translate-x-0' : '-translate-x-80'
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
                <div id="chartdiv" className="h-[100vh]"></div>
                <div className="bg"></div>
                <div className="star-field">
                    <div className="layer"></div>
                    <div className="layer"></div>
                    <div className="layer"></div>
                </div>
                <div className='h-[100px] fixed bottom-2 right-12'>
                    <img src="/image/main/partners.png" alt="" className='w-full h-full' />
                </div>
            </div>
        </div>
    )
}

export default Domestic
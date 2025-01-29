import { useLayoutEffect, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodataWorldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useTranslation } from 'react-i18next';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Destinations = () => {

    const [choosedCountry, setChoosedCountry] = useState({});
    const [shownavigate, setShowNavigate] = useState(true);

    const { t } = useTranslation();

    const clickShowNavigate = () => {
        setShowNavigate(!shownavigate)
    }

    useLayoutEffect(() => {
        let root = am5.Root.new("chartdiv");

        // Set themes
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "rotateX",
                panY: "rotateY",
                // projection: am5map.geoMercator(),
                // projection: am5map.geoNaturalEarth1(),
                projection: am5map.geoOrthographic(),
                // homeGeoPoint: { latitude: 46.8625, longitude: 103.8467 },
                wheelY: "none",
                // rotationX: -130.8467,
                // scale: 1.5
            })
        );

        let zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
        zoomControl.homeButton.set("visible", true);
        chart.chartContainer.get("background").events.on("click", function () {
            chart.goHome();
        })

        // Create polygon series
        var polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodataWorldLow,
                exclude: ["AQ"]
            })
        );

        polygonSeries.mapPolygons.template.setAll({
            tooltipText: "{name}",
            interactive: true
        });

        polygonSeries.mapPolygons.template.states.create("hover", {
            fill: am5.color('#9fbfde')
        });

        polygonSeries.mapPolygons.template.events.on("click", (ev) => {
            var dataItem = ev.target.dataItem;
            var data = dataItem.dataContext;
            console.log(data);
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
            stroke: am5.color(0xffba00),
            strokeWidth: 1,
            strokeDasharray: 3
        });

        // this will be visible line. Lines will connectg animating points so they will look like animated
        let animatedLineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
        animatedLineSeries.mapLines.template.setAll({
            stroke: am5.color(0xffba00),
            strokeOpacity: 0.6,
            strokeWidth: 2,
        });

        // invisible series which will animate along invisible lines
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


        let cities = [
            {
                id: "ulaanbaatar",
                title: t('ulaanbaatar'),
                country: 'mongolia',
                geometry: { type: "Point", coordinates: [103.8467, 46.8625] },
            },
            {
                id: "frankfurt",
                title: t('frankfurt'),
                country: 'germany',
                geometry: { type: "Point", coordinates: [8.6821, 50.1109] }
            },
            {
                id: "hongkong",
                title: t('hongkong'),
                country: 'china',
                geometry: { type: "Point", coordinates: [114.2, 22.3] }
            },
            {
                id: "tokyo",
                title: t('tokyo'),
                country: 'japan',
                geometry: { type: "Point", coordinates: [139.6917, 35.6895] }
            },
            {
                id: "seoul",
                title: t('seoul'),
                country: 'south_korea',
                geometry: { type: "Point", coordinates: [126.9779, 37.5665] }
            },
            {
                id: "ho_chi_minh",
                title: t('ho_chi_minh'),
                country: 'vietnam',
                geometry: { type: "Point", coordinates: [106.6297, 10.8231] }
            },
            {
                id: "istanbul",
                title: t('istanbul'),
                country: 'turkey',
                geometry: { type: "Point", coordinates: [28.9784, 41.0082] }
            },
            {
                id: "busan",
                title: t('busan'),
                country: 'south_korea',
                geometry: { type: "Point", coordinates: [129.0756, 35.1796] }
            },
            {
                id: "bangkok",
                title: t('bangkok'),
                country: 'thailand',
                geometry: { type: "Point", coordinates: [100.5018, 13.7563] }
            },
            {
                id: "beijing",
                title: t('beijing'),
                country: 'china',
                geometry: { type: "Point", coordinates: [116.4074, 39.9042] }
            },
            {
                id: "osaka",
                title: t('osaka'),
                country: 'japan',
                geometry: { type: "Point", coordinates: [135.5022, 34.6937] }
            },
            {
                id: "phuket",
                title: t('phuket'),
                country: 'thailand',
                geometry: { type: "Point", coordinates: [98.3381, 7.8804] }
            },
            {
                id: "guangzhou",
                title: t('guangzhou'),
                country: 'china',
                geometry: { type: "Point", coordinates: [113.2644, 23.1291] }
            }
        ];

        // destination series
        let citySeries = chart.series.push(
            am5map.MapPointSeries.new(root, {})
        );

        let planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
        let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

        let point1 = addCity({ latitude: 46.8625, longitude: 103.8467 }, "Ulaanbaatar");
        let point2 = null;
        if (choosedCountry.id) {
            point2 = addCity({
                latitude: choosedCountry.geometry.coordinates[1],
                longitude: choosedCountry.geometry.coordinates[0]
            }, "Frankfurt");
        } else {
            point2 = addCity({ latitude: 50.1109, longitude: 8.6821 }, "Frankfurt");
        }

        let lineDataItem = lineSeries.pushDataItem({
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
                    fill: am5.color(0xffba00),
                    stroke: root.interfaceColors.get("background"),
                    strokeWidth: 2,
                    interactive: true, // Интерактив байдал нэмэх
                    cursorOverStyle: "pointer" // Hover үед курсорыг "pointer" болгох
                }, circleTemplate)
            );

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

        citySeries.data.setAll(cities);

        // Prepare line series data
        let mongoliaDataItem = citySeries.getDataItemById("ulaanbaatar");

        // this will do all the animations
        am5.array.each(cities, function (did) {
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

        function addCity(coords, title) {
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
        <div>
            <div className={classNames(
                choosedCountry.title ? 'opacity-100' : 'opacity-0',
                'transition-opacity ease-in-out delay-150 duration-300'
            )}>
                <div
                    className={
                        classNames(
                            'transition absolute bg-primary-500 w-80 h-full text-white px-4 py-8 space-y-4 shadow-md z-10 duration-500',
                            shownavigate ? 'translate-x-0' : '-translate-x-full',
                            'border-t border-t-white'
                        )}
                    style={{
                        boxShadow: "0 1px 2px rgba(60,64,67,0.3),0 2px 6px 2px rgba(60,64,67,0.15)"
                    }}
                >
                    <div className='text-center'>
                        {t('ulaanbaatar')} - {t(choosedCountry.id)}
                    </div>
                    <div>
                        <img src="/image/main/plane-500.jpg" alt=""
                            className="rounded-md"
                        />
                    </div>
                    <div className='text-justify'>
                        {t(choosedCountry.id + 'desc')}
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
                            'h-[48px] w-[23px] bg-primary-500 cursor-pointer hover:bg-primary-700',
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
            <div class="bg"></div>
            <div class="star-field">
                <div class="layer"></div>
                <div class="layer"></div>
                <div class="layer"></div>
            </div>
        </div>
    )
}

export default Destinations
import React, { useLayoutEffect, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import mongoliaGeoJSON from './mn.json';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Domestic = () => {
    const [choosedCountry, setChoosedCountry] = useState({});
    const [shownavigate, setShowNavigate] = useState(true);

    useLayoutEffect(() => {
        // Chart root
        const root = am5.Root.new("chartdiv");

        // Apply theme
        root.setThemes([am5themes_Animated.new(root)]);

        // Create the map chart
        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "rotateX",
                panY: "translateY",
                wheelY: "none",
                projection: am5map.geoMercator()
            })
        );

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

        const cities = [
            {
                id: "UB",
                title: "Ulaanbaatar",
                country: "Mongolia",
                distance: "N/A",
                duration: "N/A",
                geometry: { type: "Point", coordinates: [106.917, 47.9186] }
            },
            {
                id: "KH",
                title: "Kharkhorin",
                country: "Mongolia",
                distance: "N/A",
                duration: "N/A",
                geometry: { type: "Point", coordinates: [102.8174, 48.0056] }
            },
            {
                id: "OL",
                title: "Dalanzadgad",
                country: "Mongolia",
                distance: "N/A",
                duration: "N/A",
                geometry: { type: "Point", coordinates: [113.332, 46.888] }
            },
            {
                id: "UL",
                title: "Uliastai",
                country: "Mongolia",
                distance: "N/A",
                duration: "N/A",
                geometry: { type: "Point", coordinates: [100.159, 49.9935] }
            }
        ];
        

        // Add lines for routes
        let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
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

        citySeries.data.setAll(cities);

        // Prepare line series data
        let mongoliaDataItem = citySeries.getDataItemById("UB");

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
        <div className="px-4 sm:px-6 lg:px-8 py-16 my-16 min-h-[80vh]">
            <div className='bg-background1 fixed bg-cover h-full w-full top-0 left-0 -z-10'></div>
            <div id="chartdiv" className="h-[80vh]"></div>
        </div>
    )
}

export default Domestic
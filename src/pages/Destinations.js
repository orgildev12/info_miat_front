import { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodataWorldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Destinations = () => {
    useLayoutEffect(() => {
        let root = am5.Root.new("chartdiv");

        // Set themes
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "rotateX",
                projection: am5map.geoMercator(),
                homeGeoPoint: { latitude: 2, longitude: 2 }
            })
        );

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

        // this will be invisible line (note strokeOpacity = 0) along which invisible points will animate
        let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
        lineSeries.mapLines.template.setAll({
            stroke: root.interfaceColors.get("alternativeBackground"),
            strokeOpacity: 0.3
        });

        // this will be visible line. Lines will connectg animating points so they will look like animated
        let animatedLineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
        animatedLineSeries.mapLines.template.setAll({
            stroke: root.interfaceColors.get("alternativeBackground"),
            strokeOpacity: 0.6
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
                id: "mongolia",
                title: "Ulaanbaatar",
                geometry: { type: "Point", coordinates: [103.8467, 46.8625] },
            },
            {
                id: "frankfurt",
                title: "Frankfurt",
                geometry: { type: "Point", coordinates: [8.6821, 50.1109] }
            },
            {
                id: "hongkong",
                title: "Hong Kong",
                geometry: { type: "Point", coordinates: [114.2, 22.3] }
            },
        ];

        // destination series
        let citySeries = chart.series.push(
            am5map.MapPointSeries.new(root, {})
        );

        let planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
        let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

        let point1 = addCity({ latitude: 46.8625, longitude: 103.8467 }, "Ulaanbaatar");
        let point2 = addCity({ latitude: 50.1109, longitude: 8.6821 }, "Frankfurt");

        let lineDataItem = lineSeries.pushDataItem({
            pointsToConnect: [point1, point2]
        });


        let plane = am5.Graphics.new(root, {
            svgPath:
                "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
            scale: 0.06,
            centerY: am5.p50,
            centerX: am5.p50,
            fill: am5.color('#012853')
        });

        planeSeries.bullets.push(function () {
            let container = am5.Container.new(root, {});
            container.children.push(plane);
            return am5.Bullet.new(root, { sprite: container });
        });

        // visible city circles
        citySeries.bullets.push(function () {
            let circle = am5.Circle.new(root, {
                radius: 5,
                tooltipText: "{title}",
                tooltipY: 0,
                fill: am5.color(0xffba00),
                stroke: root.interfaceColors.get("background"),
                strokeWidth: 2
            });

            circle.events.on("click", function (event) {
                planeDataItem.set("positionOnLine", 0);
                // planeDataItem.clear();
                resetPlaneAnimation()
                var dataItem = event.target.dataItem;
                var data = dataItem.dataContext;
                point2.setAll({
                    longitude: data.geometry.coordinates[0],
                    latitude: data.geometry.coordinates[1]
                })
            });

            return am5.Bullet.new(root, {
                sprite: circle
            });
        });

        citySeries.data.setAll(cities);

        // Prepare line series data
        let destinations = ["frankfurt", "hongkong"]
        let mongoliaDataItem = citySeries.getDataItemById("mongolia");

        // this will do all the animations
        am5.array.each(destinations, function (did) {
            let destinationDataItem = citySeries.getDataItemById(did);
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
        // planeDataItem.animate({
        //     key: "positionOnLine",
        //     to: 1,
        //     duration: 30000,
        //     loops: Infinity,
        //     easing: am5.ease.yoyo(am5.ease.linear)
        // });

        // planeDataItem.on("positionOnLine", (value) => {
        //     // console.log(data.id, 'value', value)
        //     if (planeDataItem.dataContext.prevPosition < value) {
        //         plane.set("rotation", 0);
        //     }

        //     if (planeDataItem.dataContext.prevPosition > value) {
        //         plane.set("rotation", -180);
        //     }
        //     planeDataItem.dataContext.prevPosition = value;
        // });

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
    }, []);

    return (
        <div id="chartdiv" className="h-full min-h-screen">

        </div>
    )
}

export default Destinations
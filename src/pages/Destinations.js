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
                projection: am5map.geoNaturalEarth1()
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
            fill: am5.color(0x677935)
        });

        chart.events.on("click", function (ev) {
            console.log(chart.invert(ev.point))
        });

        polygonSeries.mapPolygons.template.events.on("click", (ev) => {
            var dataItem = ev.target.dataItem;
            var data = dataItem.dataContext;
            // var zoomAnimation = polygonSeries.zoomToDataItem(dataItem);
            console.log(data);
            // Promise.all([
            //     zoomAnimation.waitForStop(),
            //     am5.net.load("https://cdn.amcharts.com/lib/5/geodata/json/" + data.map + ".json", chart)
            // ]).then((results) => {
            //     var geodata = am5.JSONParser.parse(results[1].response);
            //     countrySeries.setAll({
            //         geoJSON: geodata,
            //         fill: data.polygonSettings.fill
            //     });

            //     countrySeries.show();
            //     worldSeries.hide(100);
            //     backContainer.show();
            // });
        });

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
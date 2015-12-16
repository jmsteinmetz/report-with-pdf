$(function() {

    // Functional chart control ( function(target (ID or class), type, data)
    buildChart("#SharePageviews", "bar", "/data/shareofpageviews.json");
    buildChart("#ShareSales", "horizontalbar", "/data/shareofsales.json");
    buildMap("demoLocation", "usa", "#e5ebe9", "#4f56b8", "#a7a7a3", "/data/locations.json");
    canvasChart("brandConsideration");

    function buildChart(target, type, dataurl) {

        var label = "";
        var labelset = new Array;
        var dataset = new Array;

        $.getJSON(dataurl, function(obj) {
            $.each(obj.labels[0], function(key, value) {
                labelset.push(key);
                dataset.push(value.value);
            });
            var color = obj.details[0].color;
            // $.each(obj.details[0], function(key, value) {

            // });

            var dataObj = {
                labels: labelset,
                datasets: [{
                    label: label,
                    fillColor: color,
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    data: dataset
                }]
            };

            if (type === 'bar') {
                var ctx = $(target).get(0).getContext("2d");
                var BarChart = new Chart(ctx).HorizontalBar(dataObj, options);
            }

            if (type === 'horizontalbar') {
                var ctx = $(target).get(0).getContext("2d");
                var HorizBarChart = new Chart(ctx).HorizontalBar(dataObj, options);
            }
        });
    };

    // : Refactor
    // All of these can be refactored easily into the build function above. 

    var ctx = $("#InterestPageviews").get(0).getContext("2d");
    var myBarChart = new Chart(ctx).HorizontalBar(InterestPageviews, options);

    var ctx = $("#BehaviorDevice").get(0).getContext("2d");
    var myBarChart = new Chart(ctx).Bar(BehaviorDevice, options_x);

    var ctx = $("#BehaviorAge").get(0).getContext("2d");
    var myBarChart = new Chart(ctx).Bar(BehaviorAge, options_y);

    var ctx = $("#AudienceGender").get(0).getContext("2d");
    var myPieChart = new Chart(ctx).Pie(AudienceGender, options);
    document.getElementById('js-legend').innerHTML = myPieChart.generateLegend();

    // : Refactor
    // Map : http://datamaps.github.io/

    function buildMap(target, scope, fillColor, scopeFillColor, borderColor, dataURL) {

        var map = new Datamap({
            element: document.getElementById(target),
            scope: scope,
            fills: {
                defaultFill: fillColor,
                USA: scopeFillColor,
            },
            geographyConfig: {
                borderWidth: 3,
                borderColor: borderColor
            }
        });

        $.getJSON(dataURL, function(obj) {
            //console.log(obj);
            var loc = new Array;
            $.each(obj.locations, function(key, value) {

                var locObject = {
                        name: value.name,
                        radius: value.radius,
                        yeild: value.yield,
                        country: value.country,
                        significance: value.significance,
                        fillKey: value.fillKey,
                        date: value.date,
                        latitude: value.latitude,
                        longitude: value.longitude
                    }
                    //console.log(locObject);
                loc.push(locObject)
            })
            map.bubbles(loc);
        });
    }

    // : Refactor
    // Canvas JS : http://canvasjs.com/javascript-charts/
    CanvasJS.addColorSet("customColorSet1", [ //colorSet Array
        "#043d4b",
        "#19aa8e",
        "#994274"
    ]);

    function canvasChart(target) {
        var chart = new CanvasJS.Chart(target, {
            toolTip: {
                shared: true
            },
            legend: {
                fontFamily: "proximanovareg",
                fontSize: 15,
                fontColor: "#7c797b"
            },
            axisX: {
                gridThickness: 0,
                lineColor: "transparent",
                tickColor: "transparent",
                labelFontFamily: "proximanovareg",
            },
            axisY: {
                gridThickness: 0,
                lineColor: "transparent",
                tickColor: "transparent",
                labelFontColor: "transparent"
            },
            interactivityEnabled: false,
            colorSet: "customColorSet1",
            data: [{
                    type: "stackedBar100",
                    showInLegend: true,
                    name: " Brand Not Considered",
                    dataPoints: [{
                            y: 4,
                            label: "Nike"
                        }, {
                            y: 11,
                            label: "Puma"
                        }, {
                            y: 15,
                            label: "Adidas"
                        }, {
                            y: 22,
                            label: "Asics"
                        }, {
                            y: 5,
                            label: "Reebok"
                        }

                    ]
                }, {
                    type: "stackedBar100",
                    showInLegend: true,
                    name: " Brand Considered with Others",
                    dataPoints: [{
                            y: 42,
                            label: "Nike"
                        }, {
                            y: 42,
                            label: "Puma"
                        }, {
                            y: 51,
                            label: "Adidas"
                        }, {
                            y: 58,
                            label: "Asics"
                        }, {
                            y: 45,
                            label: "Reebok"
                        }

                    ]
                }, {
                    type: "stackedBar100",
                    showInLegend: true,
                    name: "  Only Brand Considered",
                    dataPoints: [{
                            y: 53,
                            label: "Nike"
                        }, {
                            y: 47,
                            label: "Puma"
                        }, {
                            y: 34,
                            label: "Adidas"
                        }, {
                            y: 18,
                            label: "Asics"
                        }, {
                            y: 50,
                            label: "Reebok"
                        }

                    ]
                }

            ]
        });

        chart.render();

    }

});

/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'wijmo.data.ajax', 'wijmo-pro.all', 'wijmo-open.all'],
	function (eLeap, $, _, Backbone, wijmoDataAjax, wijmoProAll, wijmoOpenAll) {'use strict';
		
	eLeap.own.ChartPanel = Backbone.View.extend({
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.listenForEvents();
		},
		
		listenForEvents: function() {
			this.stopListening();
			//this.listenTo(window.resize, resizeChart);
		},
			
		resizeChart: function() {
			$wijlinechart.wijlinechart("redraw");
		    $wijbarchart.wijbarchart("redraw");
		    $wijpiechart.wijpiechart("redraw");
		    $wijlinechartLarge.wijlinechart("redraw");
		},
		
		renderChart: function() {
			
			var $wijlinechart = $("#wijlinechart");
			var $wijbarchart = $("#wijbarchart");
			var $wijpiechart = $("#wijpiechart");
			var $wijlinechartLarge = $("#wijlinechart-large");
			
			$wijlinechartLarge.wijlinechart({
				showChartLabels: false,
			    type: "area",
			    legend: {
			        visible: false
			    },
			    hint: {
			        enable: false
			    },
			    axis: {
			        y: {
			            labels: { style: { fill: "#737c85", x: 30 } },
			            gridMajor: {
			                visible: true,
			                style: {
			                    stroke: "#dadede",
			                    "stroke-width": "1",
			                }
			            },
			            max: 50,
			            min: 1
			            //annoMethod: "values",
			        },
			        x: { labels: { style: { fill: "#737c85", y: 150 } } }
			    },
			    seriesList: [
			        {
			            fitType: "spline",
			            data: {
			                x: ["02-01", "02-02", "02-03", "02-04", "02-05", "02-06", "02-07", "02-08", "02-09", "02-10", "02-11", "02-12", "02-13", "02-14", "02-15", "02-16", "02-17", "02-18", "02-19", "02-20", "02-21", "02-22", "02-23", "02-24", "02-25", "02-26", "02-27", "02-28"],
			                y: [1, 2, 3, 5, 7, 8, 9, 11, 12, 14, 15, 16, 18, 20, 21, 22, 25, 26, 28, 30, 31, 33, 34, 36, 37, 40, 41, 44]
			            },
			            markers: { visible: false }
			        },
			        {
			            fitType: "spline",
			            data: {
			                x: ["02-01", "02-02", "02-03", "02-04", "02-05", "02-06", "02-07", "02-08", "02-09", "02-10", "02-11", "02-12", "02-13", "02-14", "02-15", "02-16", "02-17", "02-18", "02-19", "02-20", "02-21", "02-22", "02-23", "02-24", "02-25", "02-26", "02-27", "02-28"],
			                y: [0, 1, 1, 3, 0, 1, 2, 5, 3, 2, 5, 1, 3, 2, 3, 1, 5, 3, 1, 4, 6, 6, 0, 8, 1, 4, 5, 6]
			            },
			            markers: { visible: false }
			        }
			    ],
			    seriesStyles: [
			        { fill: "#85d6de", stroke: "#85d6de", "stroke-width": 5, opacity: 1 },
			        { fill: "#fed37f", stroke: "#fed37f", "stroke-width": 5, opacity: 1 }
			    ],
			});
		}
	});
	return eLeap.own.ChartPanel;
});

/*
var $wijlinechart = $("#wijlinechart");
var $wijbarchart = $("#wijbarchart");
var $wijpiechart = $("#wijpiechart");
var $wijlinechartLarge = $("#wijlinechart-large");

//init
$wijlinechart.wijlinechart({
    showChartLabels: false,
    hint: {
        enable: false
    },
    axis: {
        y: {
            labels: { style: { fill: "#737c85" } },
            gridMajor: {
                visible: true,
                style: {
                    stroke: "#dadede",
                    "stroke-width": "1",
                }
            },
            max: 100,
            min: 0,
            annoMethod: "values",
        },
        x: { labels: { style: { fill: "#737c85" } } }
    },
    legend: {
        visible: false
    },
    seriesList: [
        {
            data: {
                x: [2, 4, 6, 8, 10, 12],
                y: [60, 65, 90, 55, 39, 44]
            },
            markers: {
                visible: true, type: "circle",
                style: {
                    stroke: "#f3f7f7",
                    "stroke-width": "1",
                }
            }
        },
        {
            data: {
                x: [2, 4, 6, 8, 10, 12],
                y: [52, 44, 68, 80, 99, 70]
            },
            markers: {
                visible: true, type: "circle",
                style: {
                    stroke: "#f3f7f7",
                    "stroke-width": "1",
                }
            }
        }
    ],
    seriesStyles: [
        { stroke: "#fe8f8c", "stroke-width": 1, opacity: 1 },
        { stroke: "#85d6de", "stroke-width": 1, opacity: 1 }
    ],
});

$wijlinechartLarge.wijlinechart({
    showChartLabels: false,
    type: "area",
    legend: {
        visible: false
    },
    hint: {
        enable: false
    },
    axis: {
        y: {
            labels: { style: { fill: "#737c85", x: 30 } },
            gridMajor: {
                visible: true,
                style: {
                    stroke: "#dadede",
                    "stroke-width": "1",
                }
            },
            max: 50,
            min: 1
            //annoMethod: "values",
        },
        x: { labels: { style: { fill: "#737c85", y: 150 } } }
    },
    seriesList: [
        {

            fitType: "spline",
            data: {
                x: ["02-01", "02-02", "02-03", "02-04", "02-05", "02-06", "02-07", "02-08", "02-09", "02-10", "02-11", "02-12", "02-13", "02-14", "02-15", "02-16", "02-17", "02-18", "02-19", "02-20", "02-21", "02-22", "02-23", "02-24", "02-25", "02-26", "02-27", "02-28"],
                y: [1, 2, 3, 5, 7, 8, 9, 11, 12, 14, 15, 16, 18, 20, 21, 22, 25, 26, 28, 30, 31, 33, 34, 36, 37, 40, 41, 44]
            },
            markers: { visible: false }
        },
        {
            fitType: "spline",
            data: {
                x: ["02-01", "02-02", "02-03", "02-04", "02-05", "02-06", "02-07", "02-08", "02-09", "02-10", "02-11", "02-12", "02-13", "02-14", "02-15", "02-16", "02-17", "02-18", "02-19", "02-20", "02-21", "02-22", "02-23", "02-24", "02-25", "02-26", "02-27", "02-28"],
                y: [0, 1, 1, 3, 0, 1, 2, 5, 3, 2, 5, 1, 3, 2, 3, 1, 5, 3, 1, 4, 6, 6, 0, 8, 1, 4, 5, 6]
            },
            markers: { visible: false }
        }
    ],
    seriesStyles: [
        { fill: "#85d6de", stroke: "#85d6de", "stroke-width": 5, opacity: 1 },
        { fill: "#fed37f", stroke: "#fed37f", "stroke-width": 5, opacity: 1 }
    ],
});

//Charts redraw on resize
$(window).resize(function () {
    $wijlinechart.wijlinechart("redraw");
    $wijbarchart.wijbarchart("redraw");
    $wijpiechart.wijpiechart("redraw");
    $wijlinechartLarge.wijlinechart("redraw");
});*/


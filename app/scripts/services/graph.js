'use strict';

/**
 * @ngdoc service
 * @name calidadDelAire.Graph
 * @description
 * # Graph
 * Service in the calidadDelAire.
 */
angular.module('calidadDelAire')
  .service('Graph', ['Defaults', 'lodash', function (Defaults, lodash) {
      var _buildChartTitle = function(datum) {
        if(datum.length > 1) {
          console.log(datum[0].name + ' vs ' + datum[1].name);
          return datum[0].name + ' vs ' + datum[1].name
        }
        console.log(datum[0].name);
        return datum[0].name;
      };

      var _buildSolidLine = function(indicatorName, indicatorCity, indicatorData){
        var _serie = {
          name: indicatorName,
          type: 'spline',
          stack: '1'
          // tooltip options missing to build
          // tooltip: {
          //   valueSuffix: ' S/U'
          // }
          // add other options as needed
        };

        // Build the data object
        _serie.data =  lodash.map(indicatorData, function(data){
          return [data.date_unit, data.value];
        });

        return _serie;
      };

      var _buildDashedLine = function(indicatorName, indicatorCity, indicatorData){
        var _serie = {
          name: indicatorName,
          type: 'spline',
          dashStyle: 'longdash',
          stack: '1'
          // tooltip options missing to build
          // tooltip: {
          //   valueSuffix: ' S/U'
          // }
          // add other options as needed
        };

        // Build the data object
        _serie.data =  lodash.map(indicatorData, function(data){
          return [data.date_unit, data.value];
        });

        return _serie;
      };

      var _buildGraphSeries = function(datum) {
        return lodash.flatten(lodash.map(datum, function(indicatorData){
          // Determine which kind of line we're building
          console.log(indicatorData)
          switch(indicatorData.type) {
            case 'linesolid':
            return _buildSolidLine(indicatorData.name, indicatorData.city, indicatorData.timeline);

            case 'longdash':
            return _buildDashedLine(indicatorData.name, indicatorData.city, indicatorData.timeline);
          }}));
      };


      var _chartConfig = function(datum) {
        return {
          options: {
            exporting: { enabled: false },
            credits: {
              enabled: false
            },
            chart: {
              zoomType: 'xy',
              backgroundColor: '#F6F6F6'
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },

            xAxis: {
              type: 'category',
              labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
              }
            },

            yAxis: [{ // Primary yAxis
                labels: {
                    formatter: function () {
                        return this.value;
                    },
                    style: {
                      color: '#000'
                    }
                },
                title: {
                    text: '',
                    style: {
                      color: '#000'
                    }
                }
            }, { // Secondary yAxis
                labels: {
                    formatter: function () {
                        return this.value;
                    },
                    style: {
                      color: '#000'
                    }
                },
                opposite: true
            }],
          },
          series: _buildGraphSeries(datum),
          title: {
            text: _buildChartTitle(datum)
          }
        };
      };

      return {
        // buildDatum: _buildDatum,
        chartConfig: _chartConfig
      };
  }]);

'use strict';

/**
 * @ngdoc service
 * @name calidadDelAire.api
 * @description
 * # api
 * Service in the calidadDelAire.
 */
angular.module('calidadDelAire')
  .service('Api', ['$http', function ($http) {
    function uriParam(param) {
      return '/' + param;
    };

    function convertCalltoObj(return_list) {
      var return_Obj = {}
      return_list.pollutants.forEach(function (val,i){
        return_Obj[val.pollutant] = val.timeline
      });
      return return_Obj
    };

    function coulorer(quality) {
      var fill
      if (quality <= 0.25) {
          fill = "#A5E5FF";
      } else if (quality <= 0.50) {
          fill = "#43D1FE";
      } else if (quality <= 0.75) {
          fill = "#0097FF";
      } else if (quality > 0.75) {
          fill = "#151E8A";
      }
      return fill
    };

    function convertHistorytoLines(pollutants_city_history_as_list) {
      var historical_timeline = []
      var baseline = []
      pollutants_city_history_as_list.max.forEach(function (val, i) {
        historical_timeline.push({'date_unit': val.time, 'value': parseFloat(val.normalized)})
        baseline.push({'date_unit': val.time, 'value':1.0})
      });
      return [historical_timeline, baseline]
    };

    var baseUrl = 'http://localhost:8000/';
    var uri = {
      cities: baseUrl + 'cities',
      twitts: function(city_id) {
        return baseUrl + 'twitts?city_id=' + city_id;
      },
      indicator: function(city, indicator) {
        return baseUrl + 'indicator' + uriParam(city) + uriParam(indicator);
      },
      pollutant_data: function(location, timeframe, now_flag) {
        return baseUrl+ 'cities-pollutant-timeline?geographical_zone='+ location+'&dateUnit='+ timeframe + '&now=' + now_flag;
      },
      stations: function(location) {
        return baseUrl+ 'stations/?city_id=' + location;
      }
    };

    var _dateOptions = [
      { name: 'hour', label: 'Hora'},
      { name: 'day', label: 'Día'},
      { name: 'month', label: 'Mes'},
      { name: 'year', label: 'Año'}
    ];


    var _cities = function() {
      return $http.get(uri.cities);
    };

    var _twitts = function(city_id) {
      return $http.get(uri.twitts(city_id));
    };

    var _city = function(city, indicator) {
      return $http.get(uri.indicator(city, indicator));
    };

    var _pollutant_data = function(location, timeframe, now_flag){
      return $http.get(uri.pollutant_data(location, timeframe, now_flag));
    };

    var _stations = function(location){
      return $http.get(uri.stations(location))
    };

    var _convertCalltoObj = function(return_list) {
      return convertCalltoObj(return_list)
    };

    var _convertHistorytoLines = function(pollutants_city_history_as_list) {
      return convertHistorytoLines(pollutants_city_history_as_list)
    };

    var _coulorer = function(quality){
      return coulorer(quality)
    };


    var _quality_graph = function(pollutant_line, base_line) {
      return [
        {
          name: 'Calidad del Aire (D.F.)',
          city: 'Ciudad de México',
          type: 'linesolid',
          timeline: pollutant_line
        },

        {
            name: 'Calidad de Aire (Ideal)',
            city: 'Ciudad de México',
            type: 'longdash',
            timeline: base_line
          }
      ];
    };

    return {
      dateOptions: _dateOptions,
      quality_graph: _quality_graph,
      twitts: _twitts,
      pollutant_data: _pollutant_data,
      stations: _stations,
      convertCalltoObj: _convertCalltoObj,
      convertHistorytoLines: _convertHistorytoLines,
      coulorer: _coulorer
      // indicator: _indicator,
      //
      // // dummy datasets
    };
  }]);

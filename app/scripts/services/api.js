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
    }

    var baseUrl = 'http://104.154.49.35:5000/';
    var uri = {
      cities: baseUrl + 'cities',
      indicator: function(city, indicator) {
        return baseUrl + 'indicator' + uriParam(city) + uriParam(indicator);
      },
    };

    var _dateOptions = [
      { name: 'day', label: 'Día'},
      { name: 'week', label: 'Semana'},
      { name: 'month', label: 'Mes'},
      { name: 'year', label: 'Año'}
    ];


    var _cities = function() {
      return $http.get(uri.cities);
    };

    var _city = function(city, indicator) {
      return $http.get(uri.indicator(city, indicator));
    };

    var _dummy_city = function() {
      return [
        {
          name: 'Calidad del Aire (D.F.)',
          city: 'Bogotá',
          type: 'objetivo',
          timeline: [{
            'date_unit': 1989,
            'value': 0.05
          }, {
            'date_unit': 1990,
            'value': 0.1
          }, {
            'date_unit': 1991,
            'value': 0.11
          }, {
            'date_unit': 1992,
            'value': 0.12
          }, {
            'date_unit': 1993,
            'value': 0.11
          }, {
            'date_unit': 1994,
            'value': 0.13
          }, {
            'date_unit': 1995,
            'value': 0.14
          }, {
            'date_unit': 1996,
            'value': 0.12
          }, {
            'date_unit': 1997,
            'value': 0.14
          }, {
            'date_unit': 1998,
            'value': 0.08
          }]
        },

        {
            name: 'Calidad de Aire (Ideal)',
            city: 'Bogotá',
            type: 'objetivo',
            timeline: [{
              'date_unit': 1989,
              'value': 0.1
            }, {
              'date_unit': 1990,
              'value': 0.1
            }, {
              'date_unit': 1991,
              'value': 0.1
            }, {
              'date_unit': 1992,
              'value': 0.1
            }, {
              'date_unit': 1993,
              'value': 0.1
            }, {
              'date_unit': 1994,
              'value': 0.1
            }, {
              'date_unit': 1995,
              'value': 0.1
            }, {
              'date_unit': 1996,
              'value': 0.1
            }, {
              'date_unit': 1997,
              'value': 0.1
            }, {
              'date_unit': 1998,
              'value': 0.1
            }]
          }
      ];
    };

    return {
      dateOptions: _dateOptions,
      dummy_city: _dummy_city,
      // cities: _cities,
      // indicator: _indicator,
      //
      // // dummy datasets
    };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name calidadDelAire.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the calidadDelAire
 */
angular.module('calidadDelAire')
  .controller('MainCtrl', ['$timeout', '$scope','Api', 'Graph', function ($timeout, $scope,  Api, Graph) {
      var self = this;

      // Inititalize variables
      self.dateSelected = "day";
      self.dateOptions = Api.dateOptions;


      self.initialize = function() {
        // Comment this when using real data
        // self.showChart = false;
        // self.data = Api.dummy_cities();

        self.drawGraph();
        // Uncomment this for real functionality
        // Api.cities().then(function successCallback(response){
        //   // Fetch graph config options
        //   // self.chartConfig = Graph.chartConfig(null);
        //   // self.showChart = true;
        // }, function errorCallback(response){
        //   console.error(response);
        //   // self.showChart = false;
        // });
      };

      self.drawGraph = function() {
        self.showChart = true;

        var twitts = []
         Api.twitts("MXMEX").then(function successCallback(response){
             twitts.push(response.data);
         }, function errorCallback(response){
             console.error(response);
             self.showChart = false;
         })

         var stations_circle_data = []
         var pollutant_cloud_array = []
         var response_list = []
         Api.stations("MXMEX").then(function successCallback(response){
             response.data.data.forEach(function(val, i) {
               Api.pollutant_data(val.station_id, self.dateSelected.name, 1).then(function successCallback(response_level2){
                   response_list = Api.convertCalltoObj(response_level2.data)
                   var normalized_value = response_list.max[0].normalized
                   stations_circle_data.push({"name":val.name, "long":val.longitude, "lat":val.latitude, "quality": normalized_value , "color": Api.coulorer(normalized_value)})
                }, function errorCallback(response_level2){
                    console.error(response_level2);
                });
             });
          }, function errorCallback(response){
              console.error(response);
              self.showChart = false;
          });

          var pollutants_city_now = {}
          var pollutant_cloud_array = []
          Api.pollutant_data("MXMEX", self.dateSelected.name, 1).then(function successCallback(response){
              pollutants_city_now = response.data
              var pollutants_array = Api.convertCalltoObj(pollutants_city_now)
              for (var key in pollutants_array) {
                if (pollutants_array[key][0]["normalized"] != "nan" & key != "max") {
                  pollutant_cloud_array.unshift([key, parseFloat(pollutants_array[key][0]["normalized"])]);
                }
                for (var i = 1; i < 4-pollutant_cloud_array.length; i++) {
                  pollutant_cloud_array.push(["none","none"]);
                }
              }
           }, function errorCallback(response){
               console.error(response);
               self.showChart = false;
           });


           var pollutants_city_history = {}
           var path_to_file_download = "http://localhost:8000/cities-pollutant-timeline?geographical_zone=MXMEX&dateUnit=" +self.dateSelected.name + "&filetype=csv"
           Api.pollutant_data("MXMEX", self.dateSelected.name, 0).then(function successCallback(response){
               pollutants_city_history = response.data
            }, function errorCallback(response){
                console.error(response);
                self.showChart = false;
            });


        // Give time for the container to draw
        $timeout(function(){
          // self.chartConfig = Graph.chartConfig(self.data);
          $scope.twitts = twitts[0]
          $scope.path_to_file_download = path_to_file_download
        }, 500);
        $timeout(function(){
          // self.chartConfig = Graph.chartConfig(self.data);
          $scope.pollutant_cloud_array = pollutant_cloud_array
          $scope.stations_circle_data = stations_circle_data
        }, 1000);
        $timeout(function(){
          // self.chartConfig = Graph.chartConfig(self.data);
          var data_lines = Api.convertHistorytoLines(Api.convertCalltoObj(pollutants_city_history))
          self.chartConfig = Graph.chartConfig(Api.quality_graph(data_lines[0], data_lines[1]));
        }, 2000);
      };

      self.initialize();
  }]);

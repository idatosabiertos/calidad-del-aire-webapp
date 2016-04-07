angular.module('calidadDelAire')
  .controller('MapCtrl', function($scope, NgMap) {
    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });
    $scope.showCity = function(event, city) {
      console.log("lololol")
      $scope.selectedCity = city;
      $scope.map.showInfoWindow('myInfoWindow', this);
    };
  });

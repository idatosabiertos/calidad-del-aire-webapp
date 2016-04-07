angular.module('calidadDelAire')
  .controller('MapCtrl', [$scope, function(NgMap,$scope) {
    NgMap.getMap().then(function(map) {
      $scope.objMap = map;
    });

    $scope.showInfoWindow = function (event, p) {
      var infowindow = new google.maps.InfoWindow();
      var center = new google.maps.LatLng(p[0],p[1]);

      infowindow.setContent(
          '<h3>' + p + '</h3>');

      infowindow.setPosition(center);
      infowindow.open($scope.objMap);
    };
  }]);

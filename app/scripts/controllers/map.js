angular.module('calidadDelAire').controller('MapCtrl',["$scope", "NgMap", function($scope, NgMap) {
  var vm = this;
  NgMap.getMap().then(function(map) {
    console.log('map', map);
    vm.map = map;
    //$timeout(function(){
    //  vm.HideAllInfo()
    //}, 200);
  });

  $scope.active_station= ""

  vm.hideDetail = function() {
    $scope.active_station="";
    //vm.station = station;
    //vm.map.showInfoWindow('foo-iw', station);
  };

  vm.showDetail = function(e, station) {
    station = JSON.parse(station)

    $scope.active_station= station.lat.toString() + "," + station.long.toString()
    console.log($scope.active_station)
    //vm.station = station;
    //vm.map.showInfoWindow('foo-iw', station);
  };


  vm.hashCode = function(string_data) {
    var hash = 0, i, chr, len;
    if (string_data.length === 0) return hash;
    for (i = 0, len = string_data.length; i < len; i++) {
      chr   = string_data.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
  
}]);

angular.module('calidadDelAire')
  .controller('MapCtrl', function(NgMap) {
    NgMap.getMap().then(function(map) {
      google.maps.event.addListener(circle, 'click', function(){
              infoWindow.setContent('<h2>' + circle.name + '</h2>' + circle.quality);
              infoWindow.open($scope.map, circle);
          });
    });
  });

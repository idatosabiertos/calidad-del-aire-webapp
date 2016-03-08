'use strict';

/**
 * @ngdoc directive
 * @name comoVamosColombiaApp.directive:cloud
 * @description
 * # d3Map
 */

function cloud(quality,element) {
  var cloud_height = 126;  // 380
  var cloud_width = 200;   // 600

  var quality_over100 = quality*100;
  var margin_all = cloud_width*0.033333;
  var max_width = cloud_width*1.15;
  var max_height = cloud_height*1.4; //1.3158
  var font_size=String(cloud_height*0.11) +"px" //0.0638

  var graphic_percentage = -0.0544*Math.pow(quality,3.0)+
  0.0816*Math.pow(quality,2.0)+0.7798*quality + 0.0965;
  //var graphic_percentage = 0.66*quality+0.17
  //var graphic_percentage = quality

  var text_position = graphic_percentage
  if (quality < 0.1) {
      text_position = 0.1752416
  } else if (quality > 0.85) {
      text_position = 0.7848776000000001
  }

  var text_0_label_weight= "normal"
  var text_100_label_weight= "normal"
  var text_value_label = quality_over100
  if (quality == 0) {
      text_value_label = "";
      text_0_label_weight ="bold";
  } else if (quality == 1) {
      text_value_label = "";
      text_100_label_weight ="bold";
  }

  var margin = {top: margin_all, right: margin_all, bottom: margin_all, left: margin_all},
      width = max_width - margin.left - margin.right,
      height = max_height - margin.top - margin.bottom;


  var svg = d3.select(element)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("svg:image")
      .attr("x", margin.left)        // position the left of the rectangle
      .attr("y", margin.bottom)
      .attr("id", "cloud-svg")
      .attr("xlink:href", "images/cloud_base.svg")
      .attr("width", cloud_width)
      .attr("height", cloud_height);

  var defs = svg.append("defs").attr("id", "imgdefs")

  var filling_pattern = defs.append("pattern")
      .attr("id", "filling_pattern")
      .attr("height", 1)
      .attr("width", 1)
      .attr("x", "0")
      .attr("y", "0")

  if (quality <= 0.25) {
      fill_filename = "images/cloud_1.svg";
  } else if (quality <= 0.50) {
      fill_filename = "images/cloud_2.svg";
  } else if (quality <= 0.75) {
      fill_filename = "images/cloud_3.svg";
  } else if (quality <= 1.0) {
      var fill_filename = "images/cloud_4.svg";
  }

  filling_pattern.append("svg:image")
      .attr("id", "darkblue-cloud-svg")
      .attr("xlink:href", fill_filename)
      .attr("width", cloud_width)
      .attr("height", cloud_height);

  svg.append("rect")        // attach a rectangle
        .attr("x", margin.left)        // position the left of the rectangle
        .attr("y", margin.bottom)         // position the top of the rectangle
        .attr("fill","url(#filling_pattern")
        .attr("height", cloud_height)    // set the height
        .attr("width", cloud_width*graphic_percentage);    // set the width

  svg.append("rect")        // attach a rectangle
        .attr("x", 0)        // position the left of the rectangle
        .attr("y", 0)         // position the top of the rectangle
        .attr("fill","white")
        .attr("height", max_height)    // set the height
        .attr("width", margin.left*1.1);    // set the width

  // Axis region starts
  // Horizontal Line
  svg.append("line")
        .attr("x1", margin.left + 0.1*cloud_width)
        .attr("y1", margin.top + 1.1*cloud_height)
        .attr("x2", margin.left + 0.9*cloud_width)
        .attr("y2", margin.top + 1.1*cloud_height)
        .attr("stroke-width", 1)
        .attr("stroke", "#0F156E");

  // Axis line 0
  svg.append("line")
        .attr("x1", margin.left + 0.1*cloud_width)
        .attr("y1", margin.top + 1.07*cloud_height)
        .attr("x2", margin.left + 0.1*cloud_width)
        .attr("y2", margin.top + 1.13*cloud_height)
        .attr("stroke-width", 1)
        .attr("stroke", "#0F156E");

  svg.append("line")
        .attr("x1", margin.left + 0.9*cloud_width)
        .attr("y1", margin.top + 1.07*cloud_height)
        .attr("x2", margin.left + 0.9*cloud_width)
        .attr("y2", margin.top + 1.13*cloud_height)
        .attr("stroke-width", 1)
        .attr("stroke", "#0F156E");

  // axis Textlabels

  svg.append("text")
        .attr("x", margin.left + 0.08*cloud_width)
        .attr("y", margin.top + 1.28*cloud_height)
        .text( "O" )
        .attr("font-family", "GothamRnd")
        .attr("font-size", font_size)
        .attr("fill", "#6E7072")
        .attr("text-spacing","150%")
        .attr("font-weight",text_0_label_weight);

  svg.append("text")
        .attr("x", margin.left + 0.89*cloud_width)
        .attr("y", margin.top + 1.28*cloud_height)
        .text( "1OO" )
        .attr("font-family", "GothamRnd")
        .attr("font-size", font_size)
        .attr("fill", "#6E7072")
        .attr("text-spacing","150%")
        .attr("font-weight",text_100_label_weight);

  // value Textlabels

  svg.append("text")
        .attr("x", margin.left + (text_position-0.02)*cloud_width)
        .attr("y", margin.top + 1.28*cloud_height)
        .text(text_value_label)
        .attr("font-family", "GothamRnd")
        .attr("font-size", font_size)
        .attr("fill", "#0F156E")
        .attr("font-weight","bold")
        .attr("text-spacing","150%");

      svg.append("rect")        // attach a rectangle
          .attr("x", margin.left)        // position the left of the rectangle
          .attr("y", margin.bottom)         // position the top of the rectangle
          .attr("fill","url(#filling_pattern")
          .attr("height", cloud_height)    // set the height
          .attr("width", cloud_width*graphic_percentage);    // set the width

      svg.append("rect")        // attach a rectangle
          .attr("x", 0)        // position the left of the rectangle
          .attr("y", 0)         // position the top of the rectangle
          .attr("fill","white")
          .attr("height", max_height)    // set the height
          .attr("width", margin.left*1.1);    // set the width
}

angular.module('calidadDelAire')
  .directive('cloud', function () {
    return {
      template: '<svg></svg>',
      scope: { quality: '@quality'},
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.$watch("quality",function(newValue,oldValue){
          cloud(scope.quality,element[0].firstChild);
        });
      },
    };
  });

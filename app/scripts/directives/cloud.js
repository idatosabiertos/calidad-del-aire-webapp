'use strict';

/**
 * @ngdoc directive
 * @name comoVamosColombiaApp.directive:cloud
 * @description
 * # d3Map
 */

function cloud(quality,pollutant,element) {
  var cloud_height = 126;  // 380
  var cloud_width = 200;   // 600

  var quality_over100 = parseInt(quality*100);
  var margin_all = cloud_width*0.033333;
  var max_width = cloud_width*1.15;
  var max_height = cloud_height*1.8; //1.3158
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
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .on("mouseover", mapMouseOver)
      .on("mouseout", mapMouseOut);


  svg.append("circle")        // attach a rectangle
      .attr("cx", max_width/2)        // position the left of the rectangle
      .attr("cy", max_height/2)         // position the top of the rectangle
      .attr("r",max_width/2)
      .attr("id","fill_rect")
      .attr("fill","transparent")

  svg.append("svg:image")
      .attr("x", margin.left)        // position the left of the rectangle
      .attr("y", margin.bottom+0.4*cloud_height)
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
  } else if (quality > 0.75) {
      var fill_filename = "images/cloud_4.svg";
  }

  filling_pattern.append("svg:image")
      .attr("id", "darkblue-cloud-svg")
      .attr("xlink:href", fill_filename)
      .attr("width", cloud_width)
      .attr("height", cloud_height)


  svg.append("rect")        // attach a rectangle
        .attr("x", margin.left)        // position the left of the rectangle
        .attr("y", margin.top+0.4*cloud_height)         // position the top of the rectangle
        .attr("id", "rect_dark_cloud")
        .attr("fill","url(#filling_pattern)")
        .attr("height", cloud_height)    // set the height
        .attr("width", cloud_width*graphic_percentage);    // set the width

  svg.append("rect")        // attach a rectangle
        .attr("x", 0)        // position the left of the rectangle
        .attr("y", margin.top+0.4*cloud_height)         // position the top of the rectangle
        .attr("id","fill_rect")
        .attr("fill","white")
        .attr("height", cloud_height)    // set the height
        .attr("width", margin.left*1.1);    // set the width

  // Axis region starts
  // Horizontal Line
  svg.append("line")
        .attr("x1", margin.left + 0.1*cloud_width)
        .attr("y1", margin.top + 1.5*cloud_height)
        .attr("x2", margin.left + 0.9*cloud_width)
        .attr("y2", margin.top + 1.5*cloud_height)
        .attr("stroke-width", 1)
        .attr("stroke", "#0F156E");

  // Axis line 0
  svg.append("line")
        .attr("x1", margin.left + 0.1*cloud_width)
        .attr("y1", margin.top + 1.47*cloud_height)
        .attr("x2", margin.left + 0.1*cloud_width)
        .attr("y2", margin.top + 1.53*cloud_height)
        .attr("stroke-width", 1)
        .attr("stroke", "#0F156E");

  svg.append("line")
        .attr("x1", margin.left + 0.9*cloud_width)
        .attr("y1", margin.top + 1.47*cloud_height)
        .attr("x2", margin.left + 0.9*cloud_width)
        .attr("y2", margin.top + 1.53*cloud_height)
        .attr("stroke-width", 1)
        .attr("stroke", "#0F156E");

  // Pollutant title section
    svg.append("rect")        // attach a rectangle
          .attr("x", max_width/2.0-cloud_width/3)        // position the left of the rectangle
          .attr("y", 0.02*max_height)         // position the top of the rectangle
          .attr("id", "title_box")
          .attr("fill","white")
          .attr("stroke","#0B1270")
          .attr("stroke-width","3px")
          .attr("height", cloud_height*0.31)    // set the height
          .attr("width", cloud_width/1.70);    // set the width

  // Title font size

  var title_font_size = 22;
  var n_pollutant = pollutant.length;
  var multiplier = 0.5+n_pollutant/4.0
  console.log(title_font_size.toString()+"px")

  svg.append("text")
          .attr("x", max_width/2.0-multiplier*title_font_size)
          .attr("y", 0.14*max_height)
          .attr("id", "title_box")
          .text(pollutant)
          .attr("font-family", "GothamRnd")
          .attr("font-size", title_font_size.toString()+"px")
          .attr("fill", "#0B1270")
          .attr("text-spacing","150%")
          .attr("font-weight","bolder");

  var title_box = svg.selectAll("*")
          .on("mouseover", function() {
              svg.selectAll("#title_box")
                .classed("hover",true);
            })
          .on("mouseout", function() {
              svg.selectAll("#title_box")
                .classed("hover",false)
        })

  // axis Textlabels

  svg.append("text")
        .attr("x", margin.left + 0.08*cloud_width)
        .attr("y", margin.top + 1.66*cloud_height)
        .text( "O" )
        .attr("font-family", "GothamRnd")
        .attr("font-size", font_size)
        .attr("font-weight","bold")
        .attr("fill", "#6E7072")
        .attr("text-spacing","150%")
        .attr("font-weight",text_0_label_weight);

  svg.append("text")
        .attr("x", margin.left + 0.89*cloud_width)
        .attr("y", margin.top + 1.66*cloud_height)
        .text( "1OO" )
        .attr("font-family", "GothamRnd")
        .attr("font-size", font_size)
        .attr("font-weight","bold")
        .attr("fill", "#6E7072")
        .attr("text-spacing","150%")
        .attr("font-weight",text_100_label_weight);

  // value Textlabels

  svg.append("text")
        .attr("x", margin.left + (text_position-0.02)*cloud_width)
        .attr("y", margin.top + 1.66*cloud_height)
        .text(text_value_label)
        .attr("font-family", "GothamRnd")
        .attr("font-size", font_size)
        .attr("font-weight","bold")
        .attr("fill", "#0F156E")
        .attr("font-weight","bold")
        .attr("text-spacing","150%");



      svg.append("rect")        // attach a rectangle
          .attr("x", 0)        // position the left of the rectangle
          .attr("y", 0)         // position the top of the rectangle
          .attr("fill","white")
          .attr("height", cloud_height)    // set the height
          .attr("width", margin.left*1.1);    // set the width

      function mapMouseOver(d){
        var text_out  = "Pasa el mouse por encima de alguna de las nubes para conocer más detalles sobre los contaminantes";
        console.log(text_out)
        if (pollutant== "PM10") {
            text_out ="Partículas suspendidas en el aire que representan riesgos a la salud, ya que se depositan en el tracto respiratorio. Generalmente son producto de una combustión incompleta (léase, malos quemadores o motores) o por procesos de molienda (léase, cementeras)";
        } else if (pollutant== "PM25") {
            text_out  = "Partículas suspendidas en el aire que representan riesgos a la salud, ya que se depositan en el tracto respiratorio. Son más pequeñas que las partículas de 10 micras, sólo más pequeñas por lo que llegan más lejos en el tracto respiratorio.";
        } else if (pollutant== "O3") {
            text_out  = "La capa de ozono es buena, pero mucho más arriba que al nivel de la ciudad, el ozono a nivel de la ciudad tiene lugar por agentes altamente oxidantes y da problemas de salud, tanto al respirar como al contacto con la materia viva.";
        } else if (pollutant== "CO") {
            text_out  = " Producto de la mala combustión. Altamente tóxico.";
        } else if (pollutant== "SO2") {
            text_out  = "Producto de la combustión de materiales que contienen azufre, principalmente de sólidos. Medianamente tóxico.";
        } else if (pollutant== "NO2") {
            text_out  = "Producto de la mala combustión de sólidos y de cadenas largas de combustible (más pesadas que la gasolina), que reaccionan con el aire. Es precursora de las partículas PM 2.5. Altamente tóxico.";
        }
        var text_div = d3.selectAll("section.text_in").text(text_out);
      }

      function mapMouseOut(d){
        var text_div = d3.selectAll("section.text_in").text("Pasa el mouse por encima de alguna de las nubes para conocer más detalles sobre los contaminantes.");
      }


}

angular.module('calidadDelAire')
  .directive('cloud', function () {
    return {
      template: '<svg></svg>',
      scope: {
        quality: '@quality',
        pollutant: '@pollutant'
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.$watch("quality",function(newValue,oldValue){
          cloud(scope.quality, scope.pollutant, element[0].firstChild);
        });
      },
    };
  });

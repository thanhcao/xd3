// import * as d3 from "d3";
import React from 'react';
    var height = 800,
         width = 500;

    var padding = 50;
    var defaultCircleRadius = 2;    

    var zoom = d3.zoom().scaleExtent([1,10]).on("zoom",zoomed)

    var circleDrag = d3.drag()
                        .on("start", dragStarted)
                        .on("drag", dragged);

    var svg = d3.select("#viz-wrapper")
                    .append('svg')
                    .attr('height', height + padding * 2 )
                    .attr('width', width + padding * 2)
                    .call(zoom);

    var viz = svg.append('g')
                    .attr('id', 'viz')
                    .attr('transform','translate(' + padding + ',' + padding + ')');

    var xScale = d3.scaleTime().range([0,width]);
    var yScale = d3.scaleLinear().range([height,0]);
    var rScale = d3.scaleLinear().range([5, 50]);
    // Set up the x axis
    var xAxis = d3.axisBottom(xScale)
                              .ticks(20);
    // Set up the y axis 
    var yAxis = d3.axisLeft(yScale)
                              .ticks(20);

    var solveForR = function(TMAX) {
        // area of a circle
        // Area = Pi * r * r
        var Area = Math.abs( TMAX );
        var r = Math.sqrt( Area / Math.PI);
        return r
      };

    var parseTime = d3.timeParse("%Y%m%d");
     d3.csv('data/climate_data_truncated.csv', function(data) {
        var yMax = d3.max(data, function(element) {
            return parseInt(element.TMAX)
        });

        var yMin = d3.min(data, function(element) {
            return parseInt(element.TMAX)
        });

        var xDomain = d3.extent(data, function(element){
            return parseTime(element.DATE)
        });

        var yDomain = d3.extent(data, function(element){
            return parseInt(element.TMAX)
        });

        var rDomain = d3.extent(data, function(element){
            return solveForR(parseInt(element.TMAX));
        });

        xScale.domain(xDomain);    
        yScale.domain(yDomain);
        rScale.domain(rDomain);


        viz.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 800 + ")")
        .call(xAxis)
        .selectAll('text')
        .attr("transform", function() {
            return "rotate(-65)"
        })
        .style("text-anchor", "end")
        .style('font-size', '10px')
        .attr("dx", "-10px")
        .attr("dy", "10px");

        viz.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        var dots = viz.selectAll('g.dots')
                     .data(data)
                     .enter()
                     .append('g')
                    .attr('class','dots');

        dots.attr('transform', function(d) {
            // get the x position
            var date = parseTime(d.DATE);
            var x = xScale(date)
            // get the y position
            var y = yScale(d.TMAX)
            return 'translate(' + x + ',' + y + ')'
          })
            .style('stroke', '#00ffd2')
            .style('fill','#006bff');

        dots.append('circle')
          .attr('r', defaultCircleRadius);

        dots.append('text')
          .text(function(d) {
            return d.TMAX
        }).style('display', 'none');

        dots.on("mouseenter", function(d, i) {
            dot = d3.select(this);
            radius = solveForR( parseInt(d.TMAX) ) 
            dot.select('text')
            .style('display', 'block');
            dot.select('circle')
            .attr('r', rScale( radius ));
        });

        dots.on("mouseleave", function(d, i) {
        d3.select(this)
           .select('text')
           .style('display', 'none');
        dot.select('circle')
           .attr('r', defaultCircleRadius)           
        });

        dots.call(circleDrag);

     });

    function zoomed() {
      viz.attr("transform", "translate(" + 
                     d3.event.transform.x + "," + d3.event.transform.y + ")" +
                    "scale(" + d3.event.transform.k + ")");
    };

    function dragStarted() {
      d3.event.sourceEvent.stopPropagation();
      d3.select(this)
         .select('circle')
         .style("fill", 'red');
    };

    function dragged(d) {
      d.x = d3.event.x;
      d.y = d3.event.y;
      d3.select(this)
         .attr("transform", 
          'translate(' + d.x + ',' +
                         d.y + ')');
      date = xScale.invert(d3.event.x);
      d.DATE = parseTime(date);
      temp = yScale.invert(d3.event.y);
      d.TMAX = temp.toString();
      console.log(d);
    };



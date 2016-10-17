import React from 'react';
import * as d3 from "d3";

export default class Graph extends React.Component {
    componentDidUpdate() {
        this.renderGraph();
    }

    componentDidMount() {
        this.renderGraph();
    }

    renderGraph() {
        var parseTime = d3.timeParse("%Y%m%d");
        var solveForR = function(TMAX) {
            // area of a circle
            // Area = Pi * r * r
            var Area = Math.abs( TMAX );
            var r = Math.sqrt( Area / Math.PI);
            return r
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

        var defaultCircleRadius = 2;
        var {model,data} = this.props;
        var node  = this.refs.thisGraph;
        var xScale = d3.scaleTime().range([0,model.width]);
        var yScale = d3.scaleLinear().range([model.height,0]);
        var rScale = d3.scaleLinear().range([5, 50]);

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


        var circleDrag = d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged);

        var graph = d3.select(node);
        var dots = graph.selectAll('g.dots')
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
    }

    render() {
        return <g className="thisGraph" ref="thisGraph" ></g>
    }
}

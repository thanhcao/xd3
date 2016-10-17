import React from 'react';
import * as d3 from "d3";

export default class Axis extends React.Component {
    componentDidUpdate() {
        this.renderAxis();
    }

    componentDidMount() {
        this.renderAxis();
    }

    renderAxis() {
        var {width} = this.props
        var node  = this.refs.axis;
        var xScale = d3.scaleTime().range([0,width]);
        var xAxis = d3.axisBottom(xScale).ticks(20);
        d3.select(node)
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
    }

    render() {
        return <g className="bottomAxis" ref="axis" ></g>
    }
}

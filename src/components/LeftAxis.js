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
        var {model} = this.props
        var node  = this.refs.leftAxis;
        var yScale = d3.scaleLinear().range([model.height,0]);
        var yAxis = d3.axisLeft(yScale)
            .ticks(20);
        d3.select(node)
            .call(yAxis);

    }

    render() {
        return <g className="leftAxis" ref="leftAxis" ></g>
    }
}

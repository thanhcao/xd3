import React from 'react';
import * as d3 from "d3";
import LeftAxis from 'components/LeftAxis';
import BottomAxis from 'components/BottomAxis';
import Graph from 'components/Graph';

import LeftAxisModel from 'models/LeftAxisModel';
import BottomAxisModel from 'models/BottomAxisModel';
import GraphModel from 'models/GraphModel';

export default class TestChart extends React.Component {
    render() {
        var bottomAxisModel = new BottomAxisModel(600)
        var leftAxisModel = new LeftAxisModel(900)
        var graphModel = new GraphModel(600,900)

        return (
            <svg height="900" width="600">
                <g>
                    <LeftAxis model={leftAxisModel}></LeftAxis>
                    <BottomAxis model={bottomAxisModel}></BottomAxis>
                    <Graph model={graphModel} data={this.props.data}></Graph>
                </g>
            </svg>
        )
    }
}

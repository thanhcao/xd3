import React, {Component} from 'react';
import reactDOM from 'react-dom';

import d3Chart from './d3Chart';

class Chart extends Component{
    componentDidMount(){
        var el = this.findDOMNode();
        var dispatcher = d3Chart.create(el, {
            width: this.props.width,
            height: this.props.height
        }, this.getChartState());
        dispatcher.on('point:mouseover', this.showTooltip);
        dispatcher.on('point:mouseout', this.hideTooltip);
        this.dispatcher = dispatcher;
    }

    componentDidUpdate(prevProps, prevState){
        var el = this.getDOMNode();
        d3Chart.update(el, this.getChartState(), this.dispatcher);
    }

    getChartState(){
        var appState = this.props.appState;

        var tooltips = [];
        if (appState.showingAllTooltips) {
            tooltips = appState.data;
        }
        else if (appState.tooltip) {
            tooltips = [appState.tooltip];
        }

        return _.assign({}, appState, {tooltips: tooltips});
    }

    render(){
        return (
            <div className="Chart"></div>
        );
    }

    showTooltip(d) {
        if (this.props.appState.showingAllTooltips) {
            return;
        }

        this.props.setAppState({
            tooltip: d,
            // Disable animation
            prevDomain: null
        });
    }

    hideTooltip() {
        if (this.props.appState.showingAllTooltips) {
            return;
        }

        this.props.setAppState({
            tooltip: null,
            prevDomain: null
        });
    }
}
Chart.defaultProps = {
    width: '100%',
    height: '300px'
}

export default Chart
import React,{Component} from 'react';
import reactDOM from 'react-dom';
import * as d3 from "d3";
import TestChart from 'components/charts/TestChart';

class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            charts: [{data:[],id:1}]
        };
    }

    componentDidMount()
    {
        this.fetchData()
    }

    fetchData()
    {
        var self = this
        d3.csv('data/climate_data_truncated.csv', function (data) {
            // var xDomain = d3.extent(data, function(element){
            //     return parseTime(element.DATE)
            // });
            //
            // var yDomain = d3.extent(data, function(element){
            //     return parseInt(element.TMAX)
            // });
            //
            // var rDomain = d3.extent(data, function(element){
            //     return solveForR(parseInt(element.TMAX));
            // });

            // this.setState({
            //     data: data,
            //     xDomain: xDomain,
            //     yDomain: yDomain,
            //     rDomain: rDomain
            // });

            self.state.charts[0].data = data;
            self.setState(self.state);

        });
    }

    render() {
        return (
            <div className="App">
                <div>
                    {this.state.charts.map(function(chart, index) {
                        return (
                            <TestChart key={chart.id} data={chart.data} ></TestChart>
                        );
                    }.bind(this))}
                </div>
            </div>
        );
    }
}

reactDOM.render(<App />, document.getElementById('root'));
import React from 'react';
import Chart from 'components/Chart';
import reactDOM from 'react-dom';
import Svg from 'components/svg.js';



var sampleData = [
    {id: '5fbmzmtc', x: 7, y: 41, z: 6},
    {id: 's4f8phwm', x: 11, y: 45, z: 9},
    // ...
];

var App = React.createClass({
    getInitialState: function() {
        return {
            data: sampleData,
            domain: {x: [0, 30], y: [0, 100]}
        };
    },

    render: function() {
        return (
            <div className="App">
                <Chart
                    data={this.state.data}
                    domain={this.state.domain} />
            </div>
        );
    }
});

reactDOM.render(<App />, document.getElementById('root'));
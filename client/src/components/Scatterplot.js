import React, { Component } from 'react';

import * as d3 from 'd3';

class Scatterplot extends Component {
    constructor(props) {
        super(props);

        this.renderScatterplot();
        console.log(this.props.timestampRange)
    }
    componentDidUpdate(nextProps) {
        this.renderScatterplot(nextProps);
    }
    renderScatterplot() {
        const { width, zoomTransform, timestampRange } = this.props;

        this.xScaleTime = d3.scaleLinear()
            .domain([timestampRange.start, timestampRange.end])
            .range([0, width])

        if (zoomTransform) {
            this.xScaleTime.domain(zoomTransform.rescaleX(this.xScaleTime).domain());
        }

    }
    render() {
        const { data, events } = this.props;

        const yScale = d3.scaleLinear()
            .domain([0, events.length])
            .range([0, 400])
        console.log(data)

        return (
            <g ref="scatterplot">
                {data.map((event) => <circle cx={this.xScaleTime(event.timestamp)} cy={yScale(data.indexOf(event.event_type))} r={4} key={Math.random()} />)}
            </g>
        )
    }
}

export default Scatterplot;

// render() {
//     const { data } = this.props;



//     return (
//         <g ref="scatterplot">
//             {data.map((event) => {
//                 <circle cx={this.xScaleTime(event.timestamp)} cy={100} r={4} key={Math.random()} />
//                 // <circle cx={this.xScaleTime(event.timestamp)} cy={yScale(data.indexOf(event))} r={4} key={Math.random()} />
//             })
//             }
//         </g>
//     )
// }
// }
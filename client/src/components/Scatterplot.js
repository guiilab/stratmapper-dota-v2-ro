import React, { Component } from 'react';

import * as d3 from 'd3';

class Scatterplot extends Component {
    constructor(props) {
        super(props);

        this.renderScatterplot();
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
        const { data, events, width } = this.props;

        const yScale = d3.scaleLinear()
            .domain([0, events.length-1])
            .range([10, 390])

        return (
            <React.Fragment>
                <g ref="axes">
                    {events.map((event) => {
                    return <line x1="0" y1={yScale(events.indexOf(event))} x2={width} y2={yScale(events.indexOf(event))} stroke="grey" strokeDasharray={3} key={Math.random()}/>})
                }
                </g>
                <g ref="scatterplot">
                    {data.map((event) => {
                        if (!event.timestamp) {
                            return;
                        }
                    return <circle cx={this.xScaleTime(event.timestamp)} cy={yScale(events.indexOf(event.event_type))} r={4} key={Math.random()} />})
                }
                    {/* {data.map((event) => <circle cx={this.xScaleTime(event.timestamp)} cy={yScale(data.indexOf(event.event_type))} r={4} key={Math.random()} />)} */}
                </g>
            </React.Fragment>
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
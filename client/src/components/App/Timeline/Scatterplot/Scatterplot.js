import React, { Component } from 'react';

import * as d3 from 'd3';

import { Context } from '../../../Provider.js'

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
        const { data, events } = this.props;
        const { units } = this.props.state;

        const yScale = d3.scaleLinear()
            .domain([0, events.length - 1])
            .range([10, 390])

        return (
            <g ref="scatterplot">
                {data.map((event) => {
                    return <circle
                        cx={this.xScaleTime(event.timestamp)}
                        cy={yScale(events.indexOf(event.event_type))}
                        r={4}
                        fill={units[event.unit].color}
                        stroke="black"
                        strokeWidth={1}
                        key={event.node_id}
                    />
                })
                }
            </g>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <Scatterplot {...context} {...props} />}
    </Context.Consumer>
);
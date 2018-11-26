import React, { Component } from 'react';
import { scaleLinear } from 'd3';

import { Context } from '../../Provider.js';
import EventIcon from '../../Map/EventIcon/EventIcon.js';

class Scatterplot extends Component {
    constructor(props) {
        super(props);
        this.renderScatterplot();
    }

    shouldComponentUpdate(nextProps) {
        if ((nextProps.data !== this.props.data) || (nextProps.zoomTransform !== this.props.zoomTransform) || (nextProps.timestampRange !== this.props.timestampRange)) {
            return true
        }
        return false
    }

    componentDidUpdate() {
        this.renderScatterplot();
    }

    renderScatterplot() {
        const { width, zoomTransform, timestampRange } = this.props;
        timestampRange.start = Math.round(timestampRange.start)
        timestampRange.end = Math.round(timestampRange.end)

        this.xScaleTime = scaleLinear()
            .domain([timestampRange.start, timestampRange.end])
            .range([0, width])

        if (zoomTransform) {
            this.xScaleTime.domain(zoomTransform.rescaleX(this.xScaleTime).domain());
        }
    }

    render() {
        const { data, events, yScaleTime } = this.props;
        const { icons } = this.context.state;
        return (
            <g ref="scatterplot">
                {data.map((event) => {
                    return (
                        <EventIcon
                            zoomTransform={.04}
                            x={this.xScaleTime(event.timestamp)}
                            y={yScaleTime(events.indexOf(event.event_type))}
                            d={icons[event.event_type]}
                            unit={event.unit}
                            event={event}
                            key={event.node_id} />
                    )
                })
                }
            </g>
        )
    }
}

Scatterplot.contextType = Context;

export default Scatterplot;
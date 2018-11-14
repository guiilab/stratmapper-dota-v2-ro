import React, { Component } from 'react';

import { scaleLinear } from 'd3';

import { Context } from '../../Provider.js'

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
        const { toggleActiveNode, getUnit, setTooltipPosition } = this.context;
        const { selectedUnits, selectedEventTypes } = this.context.state;
        return (
            <g ref="scatterplot">
                {data.map((event) => {
                    let unitObject = getUnit(event.unit)
                    return <circle
                        cx={this.xScaleTime(event.timestamp)}
                        cy={yScaleTime(events.indexOf(event.event_type))}
                        r={4}
                        fill={(selectedUnits.includes(event.unit) && (selectedEventTypes.includes(event.event_type))) ? unitObject.color : 'grey'}
                        stroke="black"
                        strokeWidth={1}
                        key={event.node_id}
                        onMouseOver={(e) => { toggleActiveNode(event); setTooltipPosition(e) }}
                        onMouseOut={() => toggleActiveNode(null)}
                    />
                })
                }
            </g>
        )
    }
}

Scatterplot.contextType = Context;

export default Scatterplot;
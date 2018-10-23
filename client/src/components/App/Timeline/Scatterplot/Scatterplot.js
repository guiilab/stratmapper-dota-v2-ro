import React, { PureComponent } from 'react';

import { scaleLinear } from 'd3';

import { Context } from '../../../Provider.js'

class Scatterplot extends PureComponent {
    constructor(props) {
        super(props);
        this.renderScatterplot();
    }

    componentDidUpdate() {
        this.renderScatterplot();
    }

    renderScatterplot() {
        const { width, zoomTransform, timestampRange } = this.props;

        this.xScaleTime = scaleLinear()
            .domain([timestampRange.start, timestampRange.end])
            .range([0, width])

        if (zoomTransform) {
            this.xScaleTime.domain(zoomTransform.rescaleX(this.xScaleTime).domain());
        }
    }

    render() {
        const { data, events, yScaleTime, toggleActiveNode, getUnit } = this.props;
        const { selectedUnits, selectedEventTypes } = this.props.state;

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
                        onMouseOver={() => toggleActiveNode(event)}
                        onMouseOut={() => toggleActiveNode(null)}
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
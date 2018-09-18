import React, { Component } from 'react';
import * as d3 from 'd3'

import { Context } from '../../../Provider.js'

class UnitLine extends Component {
    render() {
        const { xScale, yScale, unit } = this.props;
        const { unitEventsAll, brushRange, units } = this.props.state;

        const line = d3.line()

        line
            .x(function (d, i) {
                return xScale(d.posX)
            })
            .y(function (d, i) {
                return yScale(d.posY)
            })

        let unitEventsBrushed = unitEventsAll.filter(event => (event.timestamp > brushRange[0]) && (event.timestamp < brushRange[1]))
        let unitEventsFiltered = unitEventsBrushed.filter(event => event.unit == unit)

        console.log(unitEventsFiltered)

        return (
            <path
                d={line(unitEventsFiltered)}
                fill="none"
                stroke={units[unit].color}
                strokeWidth={1}
            />
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <UnitLine {...context} {...props} />}
    </Context.Consumer>
);
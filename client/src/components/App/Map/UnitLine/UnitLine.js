import React, { Component } from 'react';
import { line } from 'd3';

import { Context } from '../../../Provider.js'

class UnitLine extends Component {

    render() {
        const { xScale, yScale, unit } = this.props;
        const { units, brushRange, statusEventsFilteredByUnit } = this.props.state;

        let dataBrushed = statusEventsFilteredByUnit[unit].filter(event => (event.timestamp > brushRange[0]) && (event.timestamp < brushRange[1]))

        const unitLine = line()

        unitLine
            .x(function (d, i) {
                return xScale(d.posX)
            })
            .y(function (d, i) {
                return yScale(d.posY)
            })

        if (!unitLine) {
            return <div>Loading</div>
        }
        return (
            <path
                d={unitLine(dataBrushed)}
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
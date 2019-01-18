import React, { PureComponent } from 'react';
import { line } from 'd3';

import { Context } from '../../Provider.js'

class UnitLine extends PureComponent {

    render() {
        const { xScale, yScale, unit, zoomTransform, getUnit } = this.props;
        const { brushRange, statusEventsFilteredByUnit } = this.props.state;

        // Split data based on conditional events to differentiate teleports from respawns, etc.
        let dataSplit = [];
        let dataSplitIndices = [];
        let dataBrushed = statusEventsFilteredByUnit[unit].filter(event => (event.timestamp > brushRange[0]) && (event.timestamp < brushRange[1]))
        dataBrushed.forEach((d, i) => {
            if (d.event_type === 'death') {
                dataSplitIndices.push(['death', i])
            }
            if (d.event_type === 'respawned') {
                dataSplitIndices.push(['unit-line', i])
            }
            if ((d.event_type === 'tp_scroll')) {
                dataSplitIndices.push(['tp_scroll', i])
            }
            if ((d.event_type === 'tp_scroll_end')) {
                dataSplitIndices.push(['unit-line', i])
            }
        })

        if (dataSplitIndices.length !== 0) {
            dataSplitIndices.forEach((d) => {
                dataSplit.push([d[0], dataBrushed.splice([d[1]])])
            })
            dataSplit.push(['unit-line', dataBrushed])
        } else {
            dataSplit.push(['unit-line', dataBrushed])
        }

        // Get unit object from context, which includes unit data
        let unitObject = getUnit(unit)

        // Instantiate unitline from d3 line
        const unitLine = line()

        // Map x andy data to unitline
        unitLine
            .x(function (d, i) {
                return xScale(d.posX)
            })
            .y(function (d, i) {
                return yScale(d.posY)
            })

        // Conditional rendering if not unitline
        if (!unitLine) {
            return <div>Loading</div>
        }
        return (
            <React.Fragment>
                {/* Based on split data, remove final node to become unit circle/icon indicator */}
                {dataSplit.map((line, index) => {
                    let lastNode;
                    if (line[1].length !== 0) {
                        lastNode = line[1].slice(-1)[0]
                    }
                    return (
                        <g key={index}>
                            {/* Unit circle icon/indicator */}
                            {lastNode ? <circle
                                cx={xScale(lastNode.posX)}
                                cy={yScale(lastNode.posY)}
                                r='10'
                                stroke='black'
                                strokeWidth="1"
                                fill={unitObject.color}
                            /> : null}
                            <path
                                d={unitLine(line[1])}
                                fill="none"
                                className={line[0]}
                                stroke={unitObject.color}
                                strokeWidth={zoomTransform < .022 ? .5 : 1}
                                strokeDasharray={line[0] === 'unit-line' ? 0 : 4}
                                key={index}
                            />
                        </g>
                    )
                })
                }
            </React.Fragment>
        )
    }
}

// Passes context and props to the component, which renders itself
export default (props) => (
    <Context.Consumer>
        {(context) => <UnitLine {...context} {...props} />}
    </Context.Consumer>
);
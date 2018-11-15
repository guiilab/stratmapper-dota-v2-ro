import React, { PureComponent } from 'react';
import { line } from 'd3';

import { Context } from '../../Provider.js'

class UnitLine extends PureComponent {

    render() {
        const { xScale, yScale, unit, zoomTransform, getUnit } = this.props;
        const { brushRange, statusEventsFilteredByUnit } = this.props.state;

        let dataSplit = [];
        let dataSplitIndices = [];
        let dataBrushed = statusEventsFilteredByUnit[unit].filter(event => (event.timestamp > brushRange[0]) && (event.timestamp < brushRange[1]))
        dataBrushed.forEach((d, i) => {
            if (d.event_type === 'death') {
                dataSplitIndices.push(['death', i])
            } else if (d.event_type === 'tp_scroll') {
                dataSplitIndices.push(['tp_scroll', i])
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

        let unitObject = getUnit(unit)

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
            <React.Fragment>
                {dataSplit.map((line, index) => {
                    return (
                        <path
                            d={unitLine(line[1])}
                            fill="none"
                            className={line[0]}
                            stroke={unitObject.color}
                            strokeWidth={zoomTransform < .022 ? .5 : 1}
                            strokeDasharray={line[0] === 'unit-line' ? 0 : 4}
                            key={index}
                        />
                    )
                })
                }
            </React.Fragment>
        )
    }
}


export default (props) => (
    <Context.Consumer>
        {(context) => <UnitLine {...context} {...props} />}
    </Context.Consumer>
);
import React, { PureComponent } from 'react';
import { line } from 'd3';

import { Context } from '../../Provider.js'

class UnitLine extends PureComponent {

    render() {
        const { xScale, yScale, unit, zoomTransform, getUnit } = this.props;
        const { brushRange, statusEventsFilteredByUnit } = this.props.state;

        let dataBrushed = statusEventsFilteredByUnit[unit].filter(event => (event.timestamp > brushRange[0]) && (event.timestamp < brushRange[1]))
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
            // <React.Fragment>
            //     {dataBrushed.map(unit => {
            //         return (
            //             <path
            //                 d={unitLine(unit)}
            //                 fill="none"
            //                 stroke={unitObject.color}
            //                 strokeWidth={zoomTransform < .022 ? .5 : 1}
            //                 key={Math.round()}
            //             />
            //         )
            //     })
            //     }
            // </React.Fragment>
            <path
                d={unitLine(dataBrushed)}
                fill="none"
                stroke={unitObject.color}
                strokeWidth={zoomTransform < .022 ? .5 : 1}
                key={Math.round()}
            />
        )
    }
}


export default (props) => (
    <Context.Consumer>
        {(context) => <UnitLine {...context} {...props} />}
    </Context.Consumer>
);
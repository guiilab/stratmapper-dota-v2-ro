import React, { Component } from 'react';

import { Context } from '../../Provider.js'
import EventIcon from './EventIcon/EventIcon.js';
import Background from '../../../img/dotaminimap_7.jpg';

var mapDivStyle = {
    backgroundImage: "url(" + Background + ")"
};

class Map extends Component {
    render() {
        const { xScale, yScale } = this.props;
        const { unitEventsAll, icons, brushRange } = this.props.state;

        if (brushRange.length !== 0) {
            const unitEventsFiltered = unitEventsAll.filter(function (unit) {
                brushRange[0] && unit < brushRange[1]
            })
        }

        return (
            <div className="map-container" style={mapDivStyle}>
                <svg className="map-svg" height="800" width="800">
                    {unitEventsAll.map(event => {
                        return (
                            <EventIcon x={xScale(event.posX)} y={yScale(event.posY)} d={icons[event.event_type]} unit={event.unit} event={event} key={event.node_id} />
                        )
                    })}
                </svg>
            </div >
        );
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <Map {...context} />}
    </Context.Consumer>
);
import React, { Component } from 'react';

import { Context } from './Provider.js'
import EventIcon from './EventIcon.js';
import Background from '../img/dotaminimap_7.jpg';

var mapDivStyle = {
    backgroundImage: "url(" + Background + ")"
};

class Map extends Component {
    render() {
        const { xScale, yScale } = this.props;
        const { unitEventsAll, icons } = this.props.state;

        return (
            <div className="map-container" style={mapDivStyle}>
                <svg className="map-svg" height="800" width="800">
                    {unitEventsAll.map(event => {
                        return (
                            <EventIcon x={xScale(event.posX)} y={yScale(event.posY)} d={icons[event.event_type]} event={event} key={Math.random()} />
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
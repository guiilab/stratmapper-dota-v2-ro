import React, { Component } from 'react';

import { Context } from './Provider.js'
import UnitEvent from './UnitEvent.js';
import Background from '../img/dotaminimap_7.jpg';

var mapDivStyle = {
    backgroundImage: "url(" + Background + ")"
};

class Map extends Component {


    testFunction = () => {
        alert('yes')
    }

    render() {

        const { xScale, yScale } = this.props;
        const { unitEventsAll, icons } = this.props.state;
        return (
            <div className="map-container" style={mapDivStyle}>
                <svg className="map-svg" width="800" height="800">
                    <g className="unit-events-group">
                        {unitEventsAll.map(event => {
                            return (
                                <UnitEvent x={xScale(event.x)} y={yScale(event.y)} d={icons[event.event_type]} key={Math.random()} />
                            )
                        })}
                    </g>
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
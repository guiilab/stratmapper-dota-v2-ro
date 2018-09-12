import React, { Component } from 'react';

import { Context } from '../../Provider.js'
import EventIcon from './EventIcon/EventIcon.js';
import Background from '../../../img/overmatch_cropped.jpg';

class Map extends Component {
    render() {
        const { xScale, yScale } = this.props;
        // const { unitEventsAll, icons, mapSettings } = this.props.state;
        const { unitEventsAll, icons, brushRange, mapSettings } = this.props.state;


        const mapContainerStyle = {
            backgroundImage: "url(" + Background + ")",
            width: mapSettings.width,
            height: mapSettings.height
        };
        let unitEventsFiltered;
        if (brushRange.length !== 0) {
            unitEventsFiltered = unitEventsAll.filter(unit => (unit.timestamp > brushRange[0]) && (unit.timestamp < brushRange[1]))
            // (unit.timestamp > brushRange[0]) && (unit.timestamp < brushRange[1])
        }

        if (!unitEventsFiltered) {
            return (
                <div className="map-container" style={mapContainerStyle} >
                    <svg className="map-svg" height={mapSettings.height} width={mapSettings.width}>
                    </svg>
                </div >
            )
        }
        return (
            <div className="map-container" style={mapContainerStyle} >
                <svg className="map-svg" height={mapSettings.height} width={mapSettings.width}>
                    {unitEventsFiltered.map(event => {
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
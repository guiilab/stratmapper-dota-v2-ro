import React, { Component } from 'react';

import * as d3 from 'd3';

import { Context } from '../../Provider.js'
import EventIcon from './EventIcon/EventIcon.js';
import Background from '../../../img/overmatch_cropped.jpg';

class Map extends Component {
    constructor(props) {
        super(props)

        this.state = {
            zoomTransform: null
        }

        this.zoom = d3.zoom()
            // .xExtent([2000, 5000])
            // .scaleExtent([1, 15])
            .on("zoom", this.zoomed.bind(this))
    }

    componentDidMount() {
        d3.select(this.refs.mapsvg)
            .call(this.zoom)
    }

    componentDidUpdate(nextProps, prevState) {
        d3.select(this.refs.mapsvg)
            .call(this.zoom)
    }

    zoomed() {
        this.setState({
            zoomTransform: d3.event.transform
        }, () => console.log(this.state.zoomTransform));
    }

    render() {
        const { xScale, yScale } = this.props;
        const { unitEventsAll, icons, brushRange, mapSettings } = this.props.state;


        const mapContainerStyle = {
            backgroundColor: 'black',
            width: mapSettings.width,
            height: mapSettings.height
        };

        let unitEventsFiltered;

        if (brushRange.length !== 0) {
            unitEventsFiltered = unitEventsAll.filter(unit => (unit.timestamp > brushRange[0]) && (unit.timestamp < brushRange[1]))
        }

        if (!unitEventsFiltered) {
            return (
                <div className="map-container" style={mapContainerStyle} >
                    <svg className="map-svg" ref="mapsvg" height={mapSettings.height} width={mapSettings.width}>
                        <g transform={this.state.zoomTransform}>
                            <defs>
                                <pattern id="bg" width={1} height={1}>
                                    <image href={Background} ></image>
                                </pattern>
                            </defs>
                            <rect height={mapSettings.height} width={mapSettings.width} fill="url(#bg)"></rect>
                        </g>
                    </svg>
                </div >
            )
        }
        return (
            <div className="map-container" style={mapContainerStyle} >
                <svg className="map-svg" height={mapSettings.height} width={mapSettings.width}>
                    <g transform={this.state.zoomTransform}>
                        <defs>
                            <pattern id="bg" width={1} height={1}>
                                <image href={Background} ></image>
                            </pattern>
                        </defs>
                        <rect height={mapSettings.height} width={mapSettings.width} fill="url(#bg)"></rect>
                        {unitEventsFiltered.map(event => {
                            return (
                                <EventIcon x={xScale(event.posX)} y={yScale(event.posY)} d={icons[event.event_type]} unit={event.unit} event={event} key={event.node_id} />
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
import React, { Component } from 'react';

import * as d3 from 'd3';

import { Context } from '../../Provider.js'
import EventIcon from './EventIcon/EventIcon.js';
import UnitLine from './UnitLine/UnitLine.js'
import Background from '../../../img/overmatch.png';

class Map extends Component {
    constructor(props) {
        super(props)

        this.state = {
            zoomTransform: null
        }

        this.zoom = d3.zoom()
            .scaleExtent([.8, 15])
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
        });
    }

    centerMap() {
        d3.select(this.refs.mapsvg)
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .call(this.zoom.transform, d3.zoomIdentity)
    }

    render() {
        const { xScale, yScale } = this.props;
        const { unitEventsTimeline, mapSettings, brushRange, selectedUnits, icons } = this.props.state;

        const mapContainerStyle = {
            backgroundColor: 'black',
            width: mapSettings.width,
            height: mapSettings.height
        };

        if (!unitEventsTimeline) {
            return (
                <div>Loading</div>
            )
        }
        if (unitEventsTimeline) {
            let unitEventsBrushed = unitEventsTimeline.filter(event => (event.timestamp > brushRange[0]) && (event.timestamp < brushRange[1]))
            let unitEventsFiltered = unitEventsBrushed.filter(event => (selectedUnits.includes(event.unit)))

            return (
                <div className="map-container" style={mapContainerStyle} >
                    <svg className="map-svg" ref="mapsvg" height={mapSettings.height} width={mapSettings.width}>
                        <g transform={this.state.zoomTransform}>
                            {/* <g transform={this.props.state.mapZoomTransform}> */}
                            <defs>
                                <pattern id="bg" width={1} height={1}>
                                    <image href={Background} ></image>
                                </pattern>
                            </defs>
                            <rect height={mapSettings.height} width={mapSettings.width} fill="url(#bg)"></rect>
                            {selectedUnits.map(unit => {
                                return (
                                    <UnitLine
                                        unit={unit}
                                        key={unit}
                                    />
                                )
                            })
                            }
                            {unitEventsFiltered.map(event => {
                                return (
                                    <EventIcon
                                        x={xScale(event.posX)}
                                        y={yScale(event.posY)}
                                        d={icons[event.event_type]}
                                        unit={event.unit}
                                        event={event}
                                        key={event.node_id} />
                                )
                            })}
                        </g>
                    </svg>
                    <div className="map-controls">
                        <div className="map-center-button" onClick={() => this.centerMap()}>Center</div>
                    </div>
                </div >
            );
        }
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <Map {...context} />}
    </Context.Consumer>
);
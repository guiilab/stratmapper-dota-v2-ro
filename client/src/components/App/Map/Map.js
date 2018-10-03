import React, { Component } from 'react';

import * as d3 from 'd3';

import { Context } from '../../Provider.js'
import EventIcon from './EventIcon/EventIcon.js';
import UnitLine from './UnitLine/UnitLine.js'
import Background from '../../../img/dotaminimap_7.jpg';

class Map extends Component {
    constructor(props) {
        super(props)

        this.state = {
            zoomTransformScaled: .04,
            zoomTransform: null
        }

        this.zoom = d3.zoom()
            .scaleExtent([.4, 15])
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
            zoomTransformScaled: this.zoomScaleIcon(d3.event.transform.k),
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

    zoomScaleIcon(num) {
        const scale = d3.scaleLog()
            .domain([1, 15])
            .range([.04, .006])
        return scale(num)
    }

    render() {
        const { xScale, yScale } = this.props;
        const { unitEventsTimeline, mapSettings, brushRange, selectedUnits, icons, brushActive, selectedEvents, windowSettings } = this.props.state;

        console.log(windowSettings)

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
            let unitEventsFinal = unitEventsFiltered.filter(event => (selectedEvents.includes(event.event_type)))

            return (
                <div className="map-container" style={mapContainerStyle} >
                    <svg className="map-svg" ref="mapsvg" height={mapSettings.height} width={mapSettings.width}>
                        <g transform={this.state.zoomTransform}>
                            <defs>
                                <pattern id="bg" width={1} height={1}>
                                    <image href={Background} width={mapSettings.height} height={mapSettings.height}></image>
                                </pattern>
                            </defs>
                            <rect height={mapSettings.height} width={mapSettings.width} fill="url(#bg)"></rect>
                            {brushActive ? selectedUnits.map(unit => {
                                return (
                                    <UnitLine
                                        zoomTransform={this.state.zoomTransformScaled}
                                        unit={unit}
                                        key={unit}
                                    />
                                )
                            }) : <g>empty</g>
                            }
                            {brushActive ? unitEventsFinal.map(event => {
                                return (
                                    <EventIcon
                                        zoomTransform={this.state.zoomTransformScaled}
                                        x={xScale(event.posX)}
                                        y={yScale(event.posY)}
                                        d={icons[event.event_type]}
                                        unit={event.unit}
                                        event={event}
                                        key={event.node_id} />
                                )
                            }) : <g>empty</g>
                            }
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
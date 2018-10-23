import React, { Component } from 'react';

import * as d3 from 'd3';

import { Context } from '../../Provider.js'
import EventIcon from './EventIcon/EventIcon.js';
import UnitLine from './UnitLine/UnitLine.js'
import Background from '../../../img/dotamini2.png';

class Map extends Component {
    constructor(props) {
        super(props)

        this.state = {
            zoomTransformScaled: .06,
            zoomTransform: null
        }

        this.zoom = d3.zoom()
            .scaleExtent([.4, 10])
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
            .domain([.4, 10])
            .range([.08, .01])
        return scale(num)
    }

    render() {
        const { xScale, yScale } = this.props;
        const { brushRange, selectedUnits, icons, brushActive, windowSettings, unitEventsFiltered } = this.props.state;

        const mapContainerStyle = {
            width: windowSettings.width,
            height: windowSettings.height,
            backgroundColor: 'black'
        };

        let mapSvgStyle = {
            width: windowSettings.width,
            height: windowSettings.width,
        }

        if (!unitEventsFiltered) {
            return (
                <div>Loading</div>
            )
        }
        if (unitEventsFiltered) {
            return (
                <div className="map-container" style={mapContainerStyle} >
                    <svg className="map-svg" ref="mapsvg" style={mapSvgStyle} >
                        <g transform={this.state.zoomTransform}>
                            <defs>
                                <pattern id="bg" width={1} height={1}>
                                    <image href={Background} width={windowSettings.width} height={windowSettings.width}></image>
                                </pattern>
                            </defs>
                            <rect width={windowSettings.width} height={windowSettings.width} fill="url(#bg)"></rect>
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
                            {brushRange.length !== 0 ? unitEventsFiltered.map(event => {
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
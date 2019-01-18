import React, { PureComponent } from 'react';

import { zoom, select, event, scaleLog, easeLinear, zoomIdentity } from 'd3'

import { Context } from '../Provider.js'
import EventIcon from './EventIcon/EventIcon.js';
import UnitLine from './UnitLine/UnitLine.js'
import Background from '../../../img/dotamini3.jpg';

class Map extends PureComponent {
    // Use constructor to bind zoom function on load
    constructor(props) {
        super(props)

        this.state = {
            zoomTransformScaled: .06,
            zoomTransform: null
        }
        this.zoom = zoom()
            // Sets zoom extent, adjust for more or less zoom functionality
            .scaleExtent([.4, 10])
            .on("zoom", this.zoomed.bind(this))
    }

    // Center the map, based on screen size
    componentDidMount() {
        this.centerMap()
        select(this.refs.mapsvg)
            .call(this.zoom)
    }

    // On update call zoom
    componentDidUpdate(nextProps, prevState) {
        select(this.refs.mapsvg)
            .call(this.zoom)
    }

    // set state with d3 zoomtransform on zoom
    zoomed() {
        this.setState({
            zoomTransformScaled: this.zoomScaleIcon(event.transform.k),
            zoomTransform: event.transform
        });
    }

    // Center the map, based on screen size
    centerMap() {
        let zoomID = zoomIdentity
        zoomID.k = .5
        zoomID.x = this.props.state.mapSettings.width
        select(this.refs.mapsvg)
            .transition()
            .duration(200)
            .ease(easeLinear)
            .call(this.zoom.transform, zoomID)
    }

    // The zoom scale for the icons on the map
    zoomScaleIcon(num) {
        const scale = scaleLog()
            .domain([.4, 10])
            .range([.08, .01])
        return scale(num)
    }

    render() {
        const { xScale, yScale } = this.props;
        const { brushRange, selectedUnits, icons, windowSettings, unitEventsFiltered } = this.props.state;

        const mapContainerStyle = {
            width: windowSettings.width,
            height: windowSettings.height,
            backgroundColor: 'black'
        };

        let mapSvgStyle = {
            width: windowSettings.width,
            height: windowSettings.width,
        }

        return (
            <div className="map-container" style={mapContainerStyle} >
                <svg className="map-svg" ref="mapsvg" style={mapSvgStyle} >
                    <g transform={this.state.zoomTransform}>
                        {/* Use defs and pattern for background image mapping in SVG */}
                        <defs>
                            <pattern id="bg" width={1} height={1}>
                                <image href={Background} width={windowSettings.width} height={windowSettings.width}></image>
                            </pattern>
                        </defs>
                        <rect width={windowSettings.width} height={windowSettings.width} fill="url(#bg)"></rect>
                        {/* Add unit lines paths for each unit, based on brush length */}
                        {brushRange.length !== 0 ? selectedUnits.map(unit => {
                            return (
                                <UnitLine
                                    zoomTransform={this.state.zoomTransformScaled}
                                    unit={unit}
                                    key={unit}
                                />
                            )
                        }) : <g>empty</g>
                        }
                        {/* Add event icons to the map, based on filtered events */}
                        {unitEventsFiltered ? unitEventsFiltered.map(event => {
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
                    {/* Center the map */}
                    <div className="map-center-button" onClick={() => this.centerMap()}>Center</div>
                </div>
            </div >
        );
    }
}

// Passes context and props to the component, which renders itself
export default () => (
    <Context.Consumer>
        {(context) => <Map {...context} />}
    </Context.Consumer>
);
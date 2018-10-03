import React, { PureComponent } from 'react';
import * as d3 from 'd3';

import { Context } from '../../Provider.js'

import Scatterplot from './Scatterplot/Scatterplot.js';
import XAxis from './XAxis/XAxis.js';
import EventOption from './EventOption/EventOption.js';
import AxisLines from './AxisLines/AxisLines.js'
import Brush from './Brush/Brush.js';
import BrushButton from './BrushButton/BrushButton.js'

class Timeline extends PureComponent {
    constructor(props) {
        super(props);
        this.chart = React.createRef()
        this.state = {
            height: null,
            width: null,
            zoomTransform: null,
        }
    }

    getZoom = () => {
        return d3.zoom()
            .scaleExtent([.9, 15])
            .translateExtent([[0, this.props.state.timestampRange.start], [this.state.width, this.props.state.timestampRange.end]])
            .on("zoom", this.zoomed.bind(this))
    }

    componentDidMount() {
        const zoom = this.getZoom()
        this.setState({
            height: 250,
            width: this.chart.current.offsetWidth
        })
        d3.select(this.refs.svg)
            .call(zoom)
    }

    componentDidUpdate(nextProps, prevState) {
        const zoom = this.getZoom()
        this.setState({
            width: this.chart.current.offsetWidth
        })
        d3.select(this.refs.svg)
            .call(zoom)
    }

    zoomed() {
        this.setState({
            zoomTransform: d3.event.transform
        });
    }

    render() {
        const { zoomTransform, width } = this.state;
        const { events, unitEventsTimeline, timestampRange, timelineSettings, selectedEvents, loadSettings, brushActive, selectedUnits } = this.props.state;
        const { yScaleTime, toggleBrushActive } = this.props;

        const heightStyle = {
            height: timelineSettings.height
        }
        if (!width) {
            return (
                <div className="timeline-container" ref="timelineContainer">
                    <div className="timeline-chart" ref={this.chart}>
                    </div>
                </div>
            )
        }

        let unitEventsTimelineFiltered = unitEventsTimeline;
        if (loadSettings.incremental_timeline === true) {
            let unitEventsSelectedUnits = unitEventsTimeline.filter((d) => selectedUnits.includes(d.unit))
            unitEventsTimelineFiltered = unitEventsSelectedUnits.filter((d) => selectedEvents.includes(d.event_type))
        }

        return (
            <div className="timeline-container" ref="timelineContainer">
                <div className="event-select-container" style={heightStyle}>
                    <BrushButton />
                    {events.timelineObj.map((event) => <EventOption event={event} key={event.event_type} />)}
                </div>
                <div className="timeline-chart" ref={this.chart} style={heightStyle} onKeyDown={(e) => toggleBrushActive(e)} onKeyUp={(e) => toggleBrushActive(e)} tabIndex="0">
                    <svg width="100%" height="100%" ref="svg" className="timeline-svg-scatter">
                        <AxisLines
                            events={events.timeline}
                            yScaleTime={yScaleTime}
                            width={width}
                        />
                        {brushActive ?
                            <Brush
                                width={width}
                                timestampRange={timestampRange}
                                zoomTransform={zoomTransform}
                            /> : <g>Empty</g>
                        }
                        <Scatterplot
                            data={unitEventsTimelineFiltered}
                            width={width}
                            zoomTransform={zoomTransform}
                            timestampRange={timestampRange}
                            events={events.timeline}
                            yScaleTime={yScaleTime}
                        />
                    </svg>
                    <div className="x-axis">
                        <svg width="100%" ref="x-axis">
                            <XAxis
                                width={width}
                                zoomTransform={zoomTransform}
                                timestampRange={timestampRange}
                            />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <Timeline {...context} />}
    </Context.Consumer>
);

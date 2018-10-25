import React, { Component } from 'react';
import { zoom, select, event } from 'd3';

import { Context } from '../../Provider.js'

import Scatterplot from './../Scatterplot/Scatterplot.js';
import XAxis from './../XAxis/XAxis.js';
import AxisLines from './../AxisLines/AxisLines.js';
import Drag from './../Drag/Drag.js';
import Brush from './../Brush/Brush.js';

class TimelineChart extends Component {
    constructor(props) {
        super(props);
        this.chart = React.createRef()
        this.state = {
            clicked: false,
            mousePos: 0,
            height: null,
            width: null,
            offsetX: 0,
            zoomTransform: null,
        }
    }

    getZoom = () => {
        return zoom()
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
        select(this.refs.svg)
            .call(zoom)
    }

    componentDidUpdate(nextProps, prevState) {
        const zoom = this.getZoom()
        this.setState({
            width: this.chart.current.offsetWidth
        })
        select(this.refs.svg)
            .call(zoom)
    }

    toggleClick = () => {
        this.setState({
            clicked: !this.state.clicked
        })
    }

    drag = (e) => {
        this.setState({
            offsetX: e.clientX
        })
    }

    zoomed() {
        this.setState({
            zoomTransform: event.transform
        });
    }

    render() {
        const { zoomTransform, width } = this.state;
        const { events, timestampRange, timelineSettings, brushActive, unitEventsTimeline } = this.props.state;
        const { yScaleTime, toggleBrushActive } = this.props;

        const heightStyle = {
            height: timelineSettings.height
        }

        return (
            <div className="timeline-chart" onMouseDown={() => this.toggleClick()} onMouseUp={() => this.toggleClick()} onMouseMove={this.state.clicked ? (e) => this.drag(e) : null} ref={this.chart} style={heightStyle} onKeyDown={(e) => toggleBrushActive(e)} onKeyUp={(e) => toggleBrushActive(e)} tabIndex="0">
                <Drag clicked={this.state.clicked} offsetX={this.state.offsetX} />
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
                        data={unitEventsTimeline}
                        width={width}
                        zoomTransform={zoomTransform}
                        timestampRange={timestampRange}
                        events={events.timeline}
                        yScaleTime={yScaleTime}
                    />
                </svg>
                <div className="x-axis">
                    <svg width="100%" height={20}>
                        <XAxis
                            width={width}
                            zoomTransform={zoomTransform}
                            timestampRange={timestampRange}
                        />
                    </svg>
                </div>
            </div>
        );
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <TimelineChart {...context} />}
    </Context.Consumer>
);

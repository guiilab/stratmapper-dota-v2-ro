import React, { PureComponent } from 'react';
import { zoom, select, event } from 'd3';

import { Context } from '../../Provider.js'

import Scatterplot from './../Scatterplot/Scatterplot.js';
import XAxis from './../XAxis/XAxis.js';
import AxisLines from './../AxisLines/AxisLines.js';
import Brush from './../Brush/Brush.js';
import GlobalTimeline from './GlobalTimeline/GlobalTimeline.js';

class TimelineChart extends PureComponent {
    // User constructor to create a ref for sizing purposes
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
            hover: false
        }
    }

    // On mount get zoom, chartwidth, and call zoom
    componentDidMount() {
        this.zoom = this.getZoom()
        this.setState({
            height: 250,
            width: this.chart.current.offsetWidth
        })
        select(this.refs.svg)
            .call(this.zoom)
    }

    // On update change zoom, size, disable mouse zoom if no zoom
    componentDidUpdate() {
        if (this.state.zoomTransform === null) {
            select(this.refs.svg)
                .call(this.zoom)
                .on("mousedown.zoom", null)
        } else {
            select(this.refs.svg)
                .call(this.zoom)
        }
        if (this.chart.current.offsetWidth !== this.state.width) {
            this.setState({
                width: this.chart.current.offsetWidth
            })
        }
    }

    getZoom = () => {
        const { timestampRange } = this.context.state;
        return zoom()
            .scaleExtent([1, 15])
            .translateExtent([[0, timestampRange.start], [this.chart.current.offsetWidth, timestampRange.end]])
            .on("zoom", this.zoomed.bind(this))
    }


    toggleClick = () => {
        this.setState({
            clicked: !this.state.clicked
        })
    }

    zoomed() {
        this.setState({
            zoomTransform: event.transform
        });
    }

    render() {
        const { events, timestampRange, timelineSettings, unitEventsTimeline, activeLabel } = this.context.state;
        const { yScaleTime } = this.context;

        const heightStyle = {
            height: timelineSettings.height
        }

        // Conditional rendering if not width
        if (!this.state.width) {
            return <div className="timeline-chart" ref={this.chart}></div>
        }
        return (
            <div className="timeline-chart" ref={this.chart} style={heightStyle} >
                <XAxis
                    width={this.state.width}
                    zoomTransform={this.state.zoomTransform}
                    timestampRange={timestampRange}
                />
                {/* Holds labels above standard timeline */}
                <GlobalTimeline
                    chartWidth={this.state.width}
                    zoomTransform={this.state.zoomTransform}
                />
                <svg width="100%" height="100%" ref="svg" className="timeline-svg-scatter">
                    {/* Lines across standard timeline, d3 method */}
                    <AxisLines
                        events={events.timeline}
                        yScaleTime={yScaleTime}
                        width={this.state.width}
                    />
                    {/* Brush for brush selection in timeline */}
                    <Brush
                        activeLabel={activeLabel}
                        chartWidth={this.state.width}
                        timestampRange={timestampRange}
                        zoomTransform={this.state.zoomTransform}
                        brushRange={this.context.state.brushRange}
                    />
                    {/* Scatterplot of event icons in timeline */}
                    <Scatterplot
                        data={unitEventsTimeline}
                        width={this.state.width}
                        zoomTransform={this.state.zoomTransform}
                        timestampRange={timestampRange}
                        events={events.timeline}
                        yScaleTime={yScaleTime}
                    />
                </svg>
            </div >
        );
    }
}

// Enables access to context in component
TimelineChart.contextType = Context;

export default TimelineChart;

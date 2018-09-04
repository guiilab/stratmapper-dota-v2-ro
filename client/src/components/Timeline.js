import React, { Component } from 'react';
import * as d3 from 'd3';

import { Context } from './Provider.js'

import Scatterplot from './Scatterplot.js';
import XAxis from './XAxis.js';
import EventOption from './EventOption.js';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
            padding: null,
            zoomTransform: null,
            percentage: 0.7995733333
        }
        this.zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", this.zoomed.bind(this))
    }
    componentDidMount() {
        this.setState({
            width: this.props.state.windowSettings.width * this.state.percentage,
            height: 400,
            paddingLeft: 120,
            padding: 50
        })
        d3.select(this.refs.svg)
            .call(this.zoom)
    }

    componentDidUpdate(nextProps, prevState) {
        if (nextProps.state.windowSettings.width * this.state.percentage !== prevState.width) {
            this.setState({
                width: nextProps.state.windowSettings.width * this.state.percentage
            })
        }
        d3.select(this.refs.svg)
            .call(this.zoom)
    }

    zoomed() {
        this.setState({
            zoomTransform: d3.event.transform
        });
    }

    toggleSelectedEventLocal = (event) => {
        this.props.toggleSelectedEvent(event)
    }

    render() {
        const { zoomTransform, width, height } = this.state;
        const { events, unitEventsAll, timestampRange } = this.props.state;

        if (!width) {
            return <div>Hello</div>
        }
        return (
            <div className="timeline-container" ref="timelineContainer">
                <div className="event-select-container">
                    {events.all.map((event) => <EventOption event={event} key={event} toggleSelectedEventLocal={(e) => this.toggleSelectedEventLocal(e)} />)}
                </div>
                <div className="timeline-chart">
                    <svg width="100%" height="100%" ref="svg" className="timeline-svg-scatter">
                        <Scatterplot
                            data={unitEventsAll}
                            width={width}
                            height={height}
                            zoomTransform={zoomTransform}
                            timestampRange={timestampRange}
                            events={events.all}
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

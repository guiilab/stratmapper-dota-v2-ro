import React, { PureComponent } from 'react';
import * as d3 from 'd3';

import { Context } from '../../Provider.js'

import Scatterplot from './Scatterplot/Scatterplot.js';
import XAxis from './XAxis/XAxis.js';
import EventOption from './EventOption/EventOption.js';
import AxisLines from './AxisLines/AxisLines.js'
import Brush from './Brush/Brush.js';

class Timeline extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            shiftKey: false,
            width: null,
            height: null,
            padding: null,
            zoomTransform: null,
            percentage: 0.7995733333
        }
        this.zoom = d3.zoom()
            // .xExtent([2000, 5000])
            .scaleExtent([1, 15])
            .on("zoom", this.zoomed.bind(this))
    }
    componentDidMount() {
        this.setState({
            width: this.props.state.windowSettings.width * this.state.percentage,
            height: 300,
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

    panned() {
        console.log('working')
    }

    toggleShiftKey(e) {
        if (e.shiftKey) {
            this.setState({
                shiftKeyActive: !this.state.shiftKeyActive
            })
        }
    }

    render() {
        const { zoomTransform, width, height } = this.state;
        const { events, unitEventsTimeline, timestampRange } = this.props.state;
        const { yScaleTime } = this.props;

        if (!width) {
            return <div>Hello</div>
        }
        return (
            <div className="timeline-container" ref="timelineContainer">
                <div className="event-select-container">
                    {events.timeline.map((event) => <EventOption event={event} key={event} />)}
                </div>
                <div className="timeline-chart" onKeyDown={(e) => this.toggleShiftKey(e)} onKeyUp={(e) => this.toggleShiftKey(e)} tabIndex="0">
                    <svg width="100%" height="100%" ref="svg" className="timeline-svg-scatter">
                        <AxisLines
                            events={events.timeline}
                            yScaleTime={yScaleTime}
                            width={width}
                        />
                        {this.state.shiftKeyActive ?
                            <Brush
                                width={width}
                                timestampRange={timestampRange}
                                zoomTransform={zoomTransform}
                            /> : <g>Empty</g>
                        }
                        <Scatterplot
                            data={unitEventsTimeline}
                            height={height}
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

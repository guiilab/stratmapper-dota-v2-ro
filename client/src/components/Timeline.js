import React, { Component } from 'react';
import * as d3 from 'd3';

import { Context } from './Provider.js'

import Scatterplot from './Scatterplot.js';
import XAxis from './XAxis.js';
import YAxis from './YAxis.js';

const random = d3.randomNormal(5, 1);

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
            padding: null,
            data: d3.range(200).map(_ => [random(), random()]),
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
            height: 300,
            paddingLeft: 120,
            padding: 50
        }, () => d3.select(this.refs.svg)
            .call(this.zoom)
        )
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

    render() {
        const { events } = this.props.state;
        const { zoomTransform, width, height, padding, paddingLeft } = this.state;

        return (
            <div className="timeline-container" ref="timelineContainer">
                <div className="event-select-container">
                    <svg width="100" height={height} ref="svg2" className="y-axis">
                        <YAxis
                            height={height}
                            events={[...events.categories]}
                        />
                    </svg>
                </div>
                <div className="timeline-chart">
                    <svg width="100%" height="100%" ref="svg" className="timeline-svg-scatter">
                        <Scatterplot
                            data={this.state.data}
                            width={width}
                            height={height}
                            zoomTransform={zoomTransform}
                            zoomType="detail" />
                    </svg>
                    <div className="x-axis">
                        <svg width="100%" height="100%" ref="x-axis">
                            <XAxis
                                width={width}
                                zoomTransform={zoomTransform}
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

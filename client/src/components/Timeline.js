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
            timelineSettings: {
                width: null,
                height: null,
                padding: null
            },
            data: d3.range(200).map(_ => [random(), random()]),
            zoomTransform: null
        }
        this.zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", this.zoomed.bind(this))
    }
    componentDidMount() {
        this.setState({
            timelineSettings: {
                width: this.props.state.windowSettings.width * .65,
                height: 300,
                padding: 20
            }
        }, () => d3.select(this.refs.svg)
            .call(this.zoom)
        )
    }

    componentDidUpdate(nextProps, prevState) {
        if (nextProps.state.windowSettings.width * .65 !== prevState.timelineSettings.width) {
            this.setState(prevState => ({
                timelineSettings: { ...prevState.timelineSettings, width: nextProps.state.windowSettings.width * .65 },
            }))
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
        const { zoomTransform, timelineSettings } = this.state;

        let timelineContainerStyle = {
            width: timelineSettings.width,
            height: timelineSettings.height

        };

        return (
            <div style={timelineContainerStyle} className="timeline-container" ref="timelineContainer">
                <svg width={timelineSettings.width - timelineSettings.padding} height={timelineSettings.height - timelineSettings.padding} ref="svg">
                    <Scatterplot
                        data={this.state.data}
                        width={timelineSettings.width}
                        height={timelineSettings.height}
                        zoomTransform={zoomTransform}
                        zoomType="detail" />
                    <XAxis
                        width={timelineSettings.width}
                        zoomTransform={zoomTransform}
                    />
                    <YAxis
                        height={timelineSettings.height}
                        events={[...events.categories]}
                    />
                </svg>
            </div>
        );
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <Timeline {...context} />}
    </Context.Consumer>
);

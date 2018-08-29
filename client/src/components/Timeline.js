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
            zoomTransform: null
        }
        this.zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", this.zoomed.bind(this))
    }
    componentDidMount() {
        this.setState({
            width: this.props.state.windowSettings.width * .65,
            height: 300,
            paddingLeft: 150,
            padding: 50
        }, () => d3.select(this.refs.svg)
            .call(this.zoom)
        )
    }

    componentDidUpdate(nextProps, prevState) {
        if (nextProps.state.windowSettings.width * .65 !== prevState.width) {
            this.setState({
                width: nextProps.state.windowSettings.width * .65
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

        let timelineContainerStyle = {
            width: width,
            height: height
        };

        return (
            <div style={timelineContainerStyle} className="timeline-container" ref="timelineContainer">
                <svg width={width} height={height} ref="svg2" className="timeline-svg-axes">

                    <YAxis
                        height={height}
                        events={[...events.categories]}
                    />
                </svg>
                <svg width={width - paddingLeft} height={height} ref="svg" className="timeline-svg-scatter">
                    <Scatterplot
                        data={this.state.data}
                        width={width - paddingLeft}
                        height={height}
                        zoomTransform={zoomTransform}
                        zoomType="detail" />
                    <XAxis
                        width={width - padding}
                        zoomTransform={zoomTransform}
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

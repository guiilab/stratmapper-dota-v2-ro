import React, { Component } from 'react';
import { scaleLinear } from 'd3';

import { Context } from '../../../../Provider'

class TimelineLabel extends Component {
    constructor(props) {
        super(props)
        this.renderTimelineLabels();
    }

    state = {
        hover: false,
        active: false,
    }

    componentDidUpdate() {
        this.renderTimelineLabels();
    }

    toggleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    toggleActive = () => {
        this.setState({
            active: !this.state.active
        }, () => {
            if (this.state.active) {
                this.props.toggleBrushActive('toggle', [...this.props.label.timestamp_range])
            } else {
                this.props.toggleBrushActive('toggle', [])
            }
        })
    }

    renderTimelineLabels = () => {
        const { zoomTransform, chartWidth } = this.props;
        const { timestampRange } = this.props.state;

        this.xScaleTime = scaleLinear()
            .domain([timestampRange.start, timestampRange.end])
            .range([0, chartWidth])

        if (zoomTransform) {
            this.xScaleTime.domain(zoomTransform.rescaleX(this.xScaleTime).domain());
        }
    }

    xScaleTimeInvert = (x) => {
        const { chartWidth } = this.props;
        const { timestampRange } = this.props.state;
        let scale = scaleLinear()
            .domain([0, timestampRange.end - timestampRange.start])
            .range([0, chartWidth])
        return scale(x)
    }

    render() {
        const { label } = this.props;

        let labelPosX = label.timestamp_range[0];
        let diff = label.timestamp_range[1] - label.timestamp_range[0]

        let color;
        color = this.state.hover || this.state.active ? 'green' : 'rgba(0, 0, 0, .2)';

        const timelineLabelStyle = {
            fill: color,
            pointerEvents: 'all'
        }

        return (
            <g>
                <text
                    x={this.xScaleTime(labelPosX)}
                    fontFamily="Verdana"
                    fontSize="10"
                    fill="grey"
                    y="15"
                >
                    {label.behavior}
                </text>
                <rect
                    width={this.xScaleTimeInvert(diff)}
                    height="20"
                    x={this.xScaleTime(labelPosX)}
                    className="timeline-label"
                    style={timelineLabelStyle}
                    onClick={() => this.toggleActive()}
                    onMouseOver={() => this.toggleHover()}
                    onMouseOut={() => this.toggleHover()}
                >
                </rect>
            </g>
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <TimelineLabel {...context} {...props} />}
    </Context.Consumer>
);

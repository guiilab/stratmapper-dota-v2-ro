import React, { Component } from 'react';
import { scaleLinear } from 'd3';

import { Context } from '../../../../Provider'

class TimelineLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labelId: this.props.label.id,
            hover: false,
            active: false,
        }
        this.renderTimelineLabels();
    }

    // static getDerivedStateFromProps(nextProps, nextState) {
    //     if (nextProps.state.activeLabel === null) {
    //         return null
    //     }
    //     if (nextProps.state.activeLabel !== nextState.labelId) {
    //         return {
    //             active: false
    //         }
    //     }
    //     return null;
    // }

    componentDidMount() {
        console.log(this.state.labelId)
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
        const { label } = this.props;
        this.setState({
            active: !this.state.active
        }, () => {
            if (this.state.active) {
                this.props.changeLabel(label)
            } else {
                this.props.changeLabel(null)
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
        color = this.state.hover || this.state.active ? 'coral' : 'darkgrey';

        return (
            <g>
                <rect
                    width={this.xScaleTimeInvert(diff)}
                    height="20"
                    y={5}
                    x={this.xScaleTime(labelPosX)}
                    className="timeline-label"
                    fill='grey'
                    pointerEvents='all'
                    onClick={() => this.toggleActive()}
                    onMouseOver={() => this.toggleHover()}
                    onMouseOut={() => this.toggleHover()}
                    stroke={color}
                    strokeWidth="2px"
                >
                </rect>
                <text
                    x={this.xScaleTime(labelPosX) + 10}
                    fontFamily="Verdana"
                    fontSize="10"
                    fill="white"
                    y="17"
                    pointerEvents="none"
                >
                    {label.behavior}
                </text>
            </g>
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <TimelineLabel {...context} {...props} />}
    </Context.Consumer>
);

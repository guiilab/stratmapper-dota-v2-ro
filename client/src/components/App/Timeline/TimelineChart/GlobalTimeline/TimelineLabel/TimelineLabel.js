import React, { Component } from 'react';
import { scaleLinear } from 'd3';

import { Context } from '../../../../Provider'

class TimelineLabel extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.state.timestampRange)
        this.xScaleTime = scaleLinear()
            .domain([this.props.state.timestampRange.start, this.props.state.timestampRange.end])
            .range([0, this.props.width])
    }


    state = {
        hover: false,
        active: false,
    }

    toggleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    componentDidUpdate() {
        this.renderTimelineLabels();
    }

    renderTimelineLabels = () => {
        const { zoomTransform } = this.props;

        if (zoomTransform) {
            this.xScaleTime.domain(zoomTransform.rescaleX(this.xScaleTime).domain());
        }
    }

    render() {

        let color = this.state.hover ? 'green' : 'grey'
        const timelineLabelStyle = {
            fill: color,
            pointerEvents: 'all'
        }

        return (
            <rect
                width="100"
                height="20"
                x={this.xScaleTime(660)}
                className="timeline-label"
                style={timelineLabelStyle}
                onMouseOver={() => this.toggleHover()}
                onMouseOut={() => this.toggleHover()}>
            </rect>
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <TimelineLabel {...context} {...props} />}
    </Context.Consumer>
);

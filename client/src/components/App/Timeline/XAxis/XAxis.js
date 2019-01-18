import React, { Component } from 'react';

import { Context } from '../../Provider.js';
import { scaleLinear, select, axisTop } from 'd3';

class XAxis extends Component {

    // Render the d3 axis on mount
    componentDidMount() {
        this.renderAxis()
    }

    // Disable extraneous rerenders, only rerenders if zoomtransform props change
    shouldComponentUpdate(nextProps) {
        if (nextProps.zoomTransform !== this.props.zoomTransform) {
            return true
        }
        return false
    }

    // Rerender axis on update
    componentWillUpdate(nextProps) {
        this.renderAxis(nextProps);
    }

    renderAxis = () => {
        const { zoomTransform, timestampRange, width } = this.props;

        // Scale the axis based on the timestamp range from match settings, stored in context
        const xScaleTime = scaleLinear()
            .domain([timestampRange.start, timestampRange.end])
            .range([0, width])

        // If the timeline is zoomed, rescale everything accordingly
        if (zoomTransform) {
            xScaleTime.domain(zoomTransform.rescaleX(xScaleTime).domain());
        }

        // Add axis to top using d3 axis function
        const axis = axisTop(xScaleTime)
        select(this.refs.xAxis)
            .call(axis);
    }

    render() {

        const { width } = this.props;
        return (
            <div className="x-axis-svg">
                <svg width={width} height="100%">
                    <g transform="translate(0,18)" ref="xAxis" />
                </svg>
            </div>
        )
    }
}

// Passes context and props to the component, which renders itself
export default (props) => (
    <Context.Consumer>
        {(context) => <XAxis {...context} {...props} />}
    </Context.Consumer>
);
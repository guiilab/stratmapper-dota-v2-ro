import React, { Component } from 'react';

import { Context } from '../../Provider.js';
import { scaleLinear, axisBottom, select } from 'd3';

class XAxis extends Component {

    componentDidMount() {
        this.renderAxis()
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.zoomTransform !== this.props.zoomTransform) {
            return true
        }
        return false
    }

    componentWillUpdate(nextProps) {
        this.renderAxis(nextProps);
    }

    renderAxis = () => {
        const { zoomTransform, timestampRange, width } = this.props;

        const xScaleTime = scaleLinear()
            .domain([timestampRange.start, timestampRange.end])
            .range([0, width])

        if (zoomTransform) {
            xScaleTime.domain(zoomTransform.rescaleX(xScaleTime).domain());
        }

        const axis = axisBottom(xScaleTime)
        select(this.refs.xAxis)
            .call(axis);
    }

    render() {

        return <g ref="xAxis" />
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <XAxis {...context} {...props} />}
    </Context.Consumer>
);
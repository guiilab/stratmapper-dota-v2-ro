import React, { Component } from 'react';

import { Context } from '../../../Provider.js';
import * as d3 from 'd3';

class XAxis extends Component {

    componentDidMount(props) {
        this.renderAxis(props)
    }

    componentWillUpdate(nextProps) {
        this.renderAxis(nextProps);
    }

    renderAxis = () => {
        const { zoomTransform } = this.props;

        const xScaleTime = d3.scaleLinear()
            .domain([this.props.timestampRange.start, this.props.timestampRange.end])
            .range([0, this.props.width])

        if (zoomTransform) {
            xScaleTime.domain(zoomTransform.rescaleX(xScaleTime).domain());
        }

        const axis = d3.axisBottom(xScaleTime)
        d3.select(this.refs.xAxis)
            .call(axis);
    }

    render() {

        return <g ref="xAxis" className="xAxis" />
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <XAxis {...context} {...props} />}
    </Context.Consumer>
);
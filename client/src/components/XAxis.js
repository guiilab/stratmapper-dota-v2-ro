import React, { Component } from 'react';

import * as d3 from 'd3';

class XAxis extends Component {

    componentDidMount(props) {
        this.renderAxis(props)
    }

    componentWillUpdate(nextProps) {
        this.renderAxis(nextProps);
    }

    renderAxis() {
        const { width, zoomTransform } = this.props;

        const xScale = d3.scaleLinear()
            .domain([0, 20])
            .range([0, width]);

        if (zoomTransform) {
            xScale.domain(zoomTransform.rescaleX(xScale).domain());
        }

        const axis = d3.axisBottom(xScale);

        d3.select(this.refs.xAxis)
            .call(axis);
    }

    render() {
        return <g ref="xAxis" />
    }
}

export default XAxis
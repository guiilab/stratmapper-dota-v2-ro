import React, { Component } from 'react';

import * as d3 from 'd3';

class YAxis extends Component {

    componentDidMount(props) {
        this.renderAxis(props)
    }

    componentWillUpdate(nextProps) {
        this.renderAxis(nextProps);
    }

    renderAxis() {
        const { height, events } = this.props;

        const yScale = d3.scaleLinear()
            .domain([0, 10])
            .range([0, height]);

        const axis = d3.axisRight(yScale)
            .tickFormat((d, i) => { return events[i] })

        d3.select(this.refs.yAxis)
            .call(axis);
    }

    render() {
        return <g ref="yAxis" />
    }
}

export default YAxis
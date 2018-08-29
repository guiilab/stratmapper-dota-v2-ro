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
            .range([20, height - 20]);

        const axis = d3.axisRight(yScale)
            .tickFormat((d, i) => { return events[i] })
        // .tickPadding([50])

        d3.select(this.refs.yAxis)
            .call(axis);
    }

    render() {
        return <g ref="yAxis" />
    }
}

export default YAxis
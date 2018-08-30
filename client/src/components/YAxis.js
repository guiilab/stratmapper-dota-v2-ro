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

        const axis = d3.axisLeft(yScale)
            .tickFormat((d, i) => { return events[i] })
            .ticks(14)


        d3.select(this.refs.yAxis)
            .call(axis);
    }

    render() {

        const x = 100;
        const y = 0;
        const styles = {
            transform: `translate(${x}px, ${y}px)`
        };

        return <g style={styles} ref="yAxis" />
    }
}

export default YAxis
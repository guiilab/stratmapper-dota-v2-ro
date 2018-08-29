import React, { Component } from 'react';

import * as d3 from 'd3';

class Scatterplot extends Component {
    constructor(props) {
        super(props);
        this.renderScatterplot();
    }
    componentDidUpdate(nextProps) {
        this.renderScatterplot(nextProps);
    }
    renderScatterplot() {
        const { data, width, height, zoomTransform } = this.props;

        this.xScale = d3.scaleLinear()
            .domain([0, d3.max(data, ([x, y]) => x)])
            .range([0, width])
        this.yScale = d3.scaleLinear()
            .domain([0, d3.max(data, ([x, y]) => y)])
            .range([0, height]);

        if (zoomTransform) {
            this.xScale.domain(zoomTransform.rescaleX(this.xScale).domain());
        }
    }
    render() {
        const { data } = this.props;

        return (
            <g ref="scatterplot">
                {data.map(([x, y]) => <circle cx={this.xScale(x)} cy={this.yScale(y)} r={4} key={Math.random()} />)}
            </g>
        )
    }
}

export default Scatterplot;
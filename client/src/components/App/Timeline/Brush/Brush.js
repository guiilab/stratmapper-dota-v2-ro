import React, { Component } from 'react';

import { Context } from '../../../Provider.js';
import * as d3 from 'd3';

class Brush extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount(props) {
        this.renderBrush(props)
    }

    componentWillUpdate(nextProps) {
        this.renderBrush(nextProps);
    }

    renderBrush = () => {
        const brush = d3.brushX()
            .on('brush', this.brushed)

        d3.select(this.refs.brush)
            .call(brush)
        // .call(brush.move, [200, 200])    
    }

    brushed = () => {
        const xScaleTime = d3.scaleLinear()
            .domain([this.props.timestampRange.start, this.props.timestampRange.end])
            .range([0, this.props.width])

        let s = d3.event.selection;
        if (this.props.zoomTransform) {
            const newXScale = this.props.zoomTransform.rescaleX(xScaleTime)
            this.props.updateBrushRange([newXScale.invert(s[0]), newXScale.invert(s[1])])
        }
    }

    render() {
        return (
            <g ref="brush">
            </g>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <Brush {...context} {...props} />}
    </Context.Consumer>
);
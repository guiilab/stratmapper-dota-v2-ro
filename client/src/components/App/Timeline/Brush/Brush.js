import React, { Component } from 'react';

import { Context } from '../../Provider.js';
import { scaleLinear, brushX, select, event } from 'd3';

class Brush extends Component {
    constructor(props) {
        super(props)
        this.brush = brushX()
            .on('brush', this.brushed)
    }

    componentDidMount() {
        this.renderBrush();
    }

    componentDidUpdate(nextProps) {
        this.updateBrush();
    }

    xScaleTimeInvert = (x) => {
        const { timestampRange, chartWidth } = this.props;
        let scale = scaleLinear()
            .domain([timestampRange.start, timestampRange.end])
            .range([0, chartWidth])
        return scale(x)
    }

    renderBrush = () => {
        let brushStart = this.xScaleTimeInvert(this.context.state.brushRange[0])
        let brushEnd = this.xScaleTimeInvert(this.context.state.brushRange[1])
        select(this.refs.brush)
            .call(this.brush)
            .call(this.brush.move, [brushStart, brushEnd])
    }

    updateBrush = () => {
        select(this.refs.brush)
            .call(this.brush)
    }

    brushed = () => {
        const { timestampRange, chartWidth, zoomTransform } = this.props;

        const xScaleTime = scaleLinear()
            .domain([timestampRange.start, timestampRange.end])
            .range([0, chartWidth])

        let s;

        if (event.selection) {
            s = event.selection;
        } else {
            s = [xScaleTime(this.context.state.brushRange[0]), xScaleTime(this.context.state.brushRange[1])];
        }

        if (zoomTransform) {
            const newXScale = zoomTransform.rescaleX(xScaleTime)
            this.context.updateBrushRange([newXScale.invert(s[0]), newXScale.invert(s[1])])
        } else {
            this.context.updateBrushRange([xScaleTime.invert(s[0]), xScaleTime.invert(s[1])])
        }
    }

    render() {
        return (
            <g ref="brush">
            </g>
        )
    }
}

Brush.contextType = Context;

export default Brush;
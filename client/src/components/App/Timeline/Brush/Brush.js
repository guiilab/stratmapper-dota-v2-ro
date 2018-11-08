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

    componentDidUpdate() {
        this.updateBrush();
    }

    renderBrush = () => {
        const { timestampRange, chartWidth } = this.props;
        let brushStart;
        let brushEnd;

        this.xScaleTime = scaleLinear()
            .domain([timestampRange.start, timestampRange.end])
            .range([0, chartWidth])

        if (this.context.state.brushRange.length === 0) {
            brushStart = timestampRange.start;
            brushEnd = timestampRange.start + (timestampRange.end - timestampRange.start);
            select(this.refs.brush)
                .call(this.brush)
                .call(this.brush.move, [brushStart, brushEnd])
            // this.context.updateBrushRange([brushStart, brushEnd])

        } else {
            brushStart = this.xScaleTime(this.context.state.brushRange[0])
            brushEnd = this.xScaleTime(this.context.state.brushRange[1])
            select(this.refs.brush)
                .call(this.brush)
                .call(this.brush.move, [brushStart, brushEnd])
            // this.context.updateBrushRange([brushStart, brushEnd])
        }
    }

    updateBrush = () => {
        select(this.refs.brush)
            .call(this.brush)
    }

    brushed = () => {
        const { zoomTransform } = this.props;

        let s;

        if (event.selection) {
            s = event.selection;
        } else {
            s = [this.xScaleTime(this.context.state.brushRange[0]), this.xScaleTime(this.context.state.brushRange[1])];
        }

        if (zoomTransform) {
            const newXScale = zoomTransform.rescaleX(this.xScaleTime)
            this.context.updateBrushRange([newXScale.invert(s[0]), newXScale.invert(s[1])])
        } else {
            this.context.updateBrushRange([this.xScaleTime.invert(s[0]), this.xScaleTime.invert(s[1])])
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
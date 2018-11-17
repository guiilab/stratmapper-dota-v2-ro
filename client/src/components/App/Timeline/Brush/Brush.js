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
        this.initBrush().then(res => this.renderBrush());
    }

    componentDidUpdate(nextProps) {
        if (nextProps.activeLabel !== this.props.activeLabel) {
            setTimeout(function () {
                this.renderBrush()
            }.bind(this), 10)

        }
        this.updateBrush()

    }

    initBrush = async () => {
        const { timestampRange, chartWidth } = this.props;
        this.xScaleTime = scaleLinear()
            .domain([timestampRange.start, timestampRange.end])
            .range([0, chartWidth])

        let brushStart = timestampRange.start + ((timestampRange.end - timestampRange.start) / 10);
        let brushEnd = timestampRange.start + ((timestampRange.end - timestampRange.start) / 4);
        this.context.updateBrushRange([brushStart, brushEnd])
    }

    renderBrush = () => {
        let brushStart = this.xScaleTime(this.context.state.brushRange[0]);
        let brushEnd = this.xScaleTime(this.context.state.brushRange[1]);
        select(this.refs.brush)
            .call(this.brush)
            .transition()
            .call(this.brush.move, [brushStart, brushEnd])
    }

    updateBrush = () => {
        let { zoomTransform } = this.props;
        if (zoomTransform) {
            let newXScaleTime = zoomTransform.rescaleX(this.xScaleTime);
            let brushStart = newXScaleTime(this.context.state.brushRange[0]);
            let brushEnd = newXScaleTime(this.context.state.brushRange[1]);
            select(this.refs.brush)
                .call(this.brush)
                .transition()
                .call(this.brush.move, [brushStart, brushEnd])
        }
        select(this.refs.brush)
            .call(this.brush)
    }

    brushed = () => {
        const { zoomTransform } = this.props;

        let s = [this.context.state.brushRange[0], this.context.state.brushRange[1]];

        if (event.selection) {
            s = event.selection;
        } else {
            s = [this.context.state.brushRange[0], this.context.state.brushRange[1]];
        }

        if (zoomTransform) {
            const newXScale = zoomTransform.rescaleX(this.xScaleTime)
            this.context.updateBrushRange([newXScale.invert(s[0]), newXScale.invert(s[1])])
        }
        else {
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
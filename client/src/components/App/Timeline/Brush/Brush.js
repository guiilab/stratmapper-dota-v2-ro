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
        if (!this.props.zoomTransform) {
            this.updateBrush();
        } else if (nextProps.zoomTransform !== this.props.zoomTransform) {
            this.renderBrush()
        }
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
        const { zoomTransform } = this.props;
        let brushStart;
        let brushEnd;

        if (zoomTransform) {
            console.log('renderBrush - zoomTransform')
            const newXScaleTime = zoomTransform.rescaleX(this.xScaleTime)
            brushStart = newXScaleTime(this.context.state.brushRange[0])
            brushEnd = newXScaleTime(this.context.state.brushRange[1])
        } else {
            console.log('renderBrush - else')
            brushStart = this.xScaleTime(this.context.state.brushRange[0])
            brushEnd = this.xScaleTime(this.context.state.brushRange[1])
        }
        select(this.refs.brush)
            .call(this.brush)
            .transition()
            .call(this.brush.move, [brushStart, brushEnd])
    }

    updateBrush = () => {
        console.log('update brush ran')
        select(this.refs.brush)
            .call(this.brush)
    }

    brushed = () => {
        const { zoomTransform } = this.props;

        let s;
        if (event.selection) {
            console.log('brushed - event.selection')
            s = event.selection;
        } else {
            console.log('brushed - else')
            s = [this.context.state.brushRange[0], this.context.state.brushRange[1]];
        }

        if (zoomTransform) {
            console.log('brushed - zoomtransform')
            console.log(s)
            const newXScale = zoomTransform.rescaleX(this.xScaleTime)
            this.context.updateBrushRange([newXScale.invert(s[0]), newXScale.invert(s[1])])
        }
        else {
            console.log('brushed - else')
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
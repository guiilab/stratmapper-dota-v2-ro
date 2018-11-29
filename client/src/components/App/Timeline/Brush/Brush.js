import React, { Component } from 'react';

import { Context } from '../../Provider.js';
import { scaleLinear, brushX, select, event } from 'd3';

class Brush extends Component {

    componentDidMount() {
        this.initBrush().then(res => this.renderBrush());
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeLabel !== this.props.activeLabel) {
            setTimeout(function () {
                this.renderBrush()
            }.bind(this), 10)
        }
        if ((prevProps.brushRange[0] !== this.props.brushRange[0]) && (this.context.state.playing)) {
            this.renderBrush()
        } else if (!this.props.zoomTransform) {
            this.updateBrush()
        } else if (prevProps.zoomTransform !== this.props.zoomTransform) {
            this.renderBrush()
        }
    }

    initBrush = async () => {
        this.brush = brushX()
            .on('brush', this.brushed)
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
        let newXScaleTime;

        if (zoomTransform) {
            newXScaleTime = zoomTransform.rescaleX(this.xScaleTime);
            brushStart = newXScaleTime(this.context.state.brushRange[0]);
            brushEnd = newXScaleTime(this.context.state.brushRange[1]);
        } else {
            brushStart = this.xScaleTime(this.context.state.brushRange[0]);
            brushEnd = this.xScaleTime(this.context.state.brushRange[1]);
        }
        select(this.refs.brush)
            .call(this.brush)
            .transition()
            .duration(500)
            .call(this.brush.move, [brushStart, brushEnd])
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
            s = [this.context.state.brushRange[0], this.context.state.brushRange[1]];
        }
        if (this.context.state.playing) {
            return
        } else if (!zoomTransform) {
            this.context.updateBrushRange([this.xScaleTime.invert(s[0]), this.xScaleTime.invert(s[1])])
        } else if (event.sourceEvent) {
            let newXScaleTime = zoomTransform.rescaleX(this.xScaleTime);
            this.context.updateBrushRange([newXScaleTime.invert(s[0]), newXScaleTime.invert(s[1])])
        }
    }

    render() {
        return (
            <g ref="brush" />
        )
    }
}

Brush.contextType = Context;

export default Brush;
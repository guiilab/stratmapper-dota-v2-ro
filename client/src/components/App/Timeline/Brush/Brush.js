import React, { Component } from 'react';

import { Context } from '../../../Provider.js';
import { select, event, scaleLinear, brushX } from 'd3';

class Brush extends Component {
    componentDidMount() {
        this.renderBrush();
    }

    componentWillUpdate() {
        this.renderBrush();
    }

    renderBrush = (num) => {
        let s = [200, 300];
        const xScaleTime = scaleLinear()
            .domain([this.props.timestampRange.start, this.props.timestampRange.end])
            .range([0, this.props.width])

        const brush = brushX()

        if (num === 1) {
            this.props.updateBrushRange([xScaleTime.invert(s[0]), xScaleTime.invert(s[1])])
            brush
                .extent([[0, 0], [0, 400]])

            select(this.refs.brush)
                .call(brush)
                .call(brush.move, [s[0], s[1]])
        } else {
            select(this.refs.brush)
                .call(brush)
            brush
                .on('brush', this.brushed)
        }
    }

    brushed = () => {
        let s = [200, 300];

        const xScaleTime = scaleLinear()
            .domain([this.props.timestampRange.start, this.props.timestampRange.end])
            .range([0, this.props.width])

        if (event.selection) {
            s = event.selection
        }

        if (this.props.zoomTransform) {
            const newXScale = this.props.zoomTransform.rescaleX(xScaleTime)
            this.props.updateBrushRange([newXScale.invert(s[0]), newXScale.invert(s[1])])
        } else {
            console.log('this is updating the range')
            this.props.updateBrushRange([xScaleTime.invert(s[0]), xScaleTime.invert(s[1])])
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
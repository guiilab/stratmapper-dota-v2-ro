import React, { Component } from 'react';
import { scaleLinear } from 'd3';

// import { Context } from './../../Provider.js'

class Drag extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        clicked: false,
        x: null
    }

    toggleClicked = () => {
        this.setState({
            clicked: !this.state.clicked
        })
    }

    xScaleTime = (x) => {
        const { timestampRange, chartWidth } = this.props;
        let scale = scaleLinear()
            .domain([0, chartWidth])
            .range([timestampRange.end, timestampRange.start])
        return scale(x)
    }

    cursorPoint = (point, event, brushSvg) => {
        point.x = event.clientX; point.y = event.clientY;
        return point.matrixTransform(brushSvg.getScreenCTM().inverse());
    }

    drag = (e) => {
        const brushSvg = document.querySelector('.brush-svg');
        const point = brushSvg.createSVGPoint();
        const rect = e.target.getBoundingClientRect()
        // console.log(rect)
        const xPoint = this.cursorPoint(point, e, brushSvg)
        const x = xPoint.x - (rect.width / 2)
        this.setState({
            x: x
        })
        this.props.updateBrushRange([this.xScaleTime(x + rect.width), this.xScaleTime(x)])
    }

    render() {

        const { chartWidth } = this.props;
        return (
            // <div style={dragStyle} className="drag" onMouseDown={() => this.toggleClick()} onMouseUp={() => this.toggleClick()} onMouseMove={this.state.clicked ? (e) => this.drag(e) : null} onDrag={(e) => this.drag(e)}></div >
            <svg
                className="brush-svg"
                width={chartWidth}
                height="100%"
                pointerEvents="none"
            >
                <rect
                    x={this.state.x ? this.state.x : 0}
                    // x={800}
                    width={200}
                    height="100%"
                    fill="rgba(0, 0, 0, .2)"
                    onMouseDown={() => this.toggleClicked()}
                    onMouseUp={() => this.toggleClicked()}
                    // onMouseMove={(e) => this.drag(e)}
                    onMouseMove={this.state.clicked ? (e) => this.drag(e) : null}
                    pointerEvents="all"
                ></rect>
            </svg>
            // <div style={dragStyle} className="drag" onClick={this.props.clicked ? (e) => this.drag(e) : null} ></div >
        );
    }
}

export default Drag;
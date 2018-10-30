import React, { Component } from 'react';
import { scaleLinear } from 'd3';

// import { Context } from './../../Provider.js'

class Drag extends Component {
    constructor(props) {
        super(props)
        this.position = 0;
    }

    state = {
        move: false,
        expand: false,
        timelineActive: true,
        width: null,
        x: null
    }

    componentDidMount() {
        // console.log(this.props.timestampRange.end-this.props.timestampRange.start)
        document.querySelector('.brush-svg').addEventListener("onKeyDown", (e) => this.toggleTimelineActive(e));
        let width = this.xScaleTimeInvert(685 - 675)
        this.setState({
            width: width
        })
    }

    toggleMove = () => {
        this.setState({
            move: !this.state.move
        })
    }

    toggleExpand = () => {
        this.setState({
            expand: !this.state.expand
        }, () => console.log(this.state.expand))
    }

    toggleTimelineActive = (e) => {
        if (e.shiftKey) {
            this.setState({
                timelineActive: !this.state.timelineActive
            }, () => console.log(this.state.timelineActive))
        }
    }

    xScaleTimeInvert = (x) => {
        const { timestampRange, chartWidth } = this.props;
        let scale = scaleLinear()
            .domain([0, timestampRange.end - timestampRange.start])
            .range([0, chartWidth])
        return scale(x)
    }

    xScaleTime = (x) => {
        const { timestampRange, chartWidth } = this.props;
        let scale = scaleLinear()
            .domain([0, chartWidth])
            .range([timestampRange.start, timestampRange.end])
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
        // debugger;
        this.setState({
            x: x
        })
        // console.log([this.xScaleTime(x + rect.width), this.xScaleTime(x)])
        // this.props.updateBrushRange([this.xScaleTime(x), this.xScaleTime(x + rect.width)])
    }

    expand = () => {
        this.setState(prevState => ({
            width: prevState.width + 1
        }))
        // console.log([this.xScaleTime(x + rect.width), this.xScaleTime(x)])
        // this.props.updateBrushRange([this.xScaleTime(x), this.xScaleTime(x + rect.width)])
    }

    render() {

        const { chartWidth } = this.props;

        return (
            // <div
            //     display="none"
            //     display="inline"
            //     className="brush-svg-div"
            //     onKeyDown={(e) => this.toggleTimelineActive(e)}
            //     onKeyUp={(e) => this.toggleTimelineActive(e)}
            //     // pointerEvents={this.state.timelineActive ? "none" : "all"}
            //     pointerEvents="none"
            //     onMouseMove={() => console.log('hello')}
            //     tabIndex="0"
            // >
            <svg
                className="brush-svg"
                width={chartWidth}
                height="100%"
                pointerEvents="none"
            >
                <rect
                    x={this.state.x ? this.state.x : 0}
                    className="brush"
                    stroke="black"
                    strokeWidth={1}
                    width={this.state.width}
                    height="100%"
                    fill="rgba(0, 0, 0, .2)"
                    onMouseDown={() => this.toggleMove()}
                    onMouseUp={() => this.toggleMove()}
                    onMouseOut={this.state.move ? () => this.toggleMove() : null}
                    // onMouseMove={(e) => this.drag(e)}
                    onMouseMove={this.state.move ? () => this.drag() : null}
                    // pointerEvents="all"
                    pointerEvents="all"
                ></rect>
                <rect
                    x={this.state.x ? this.state.x + this.state.width : this.state.width}
                    stroke="black"
                    strokeWidth={1}
                    width={20}
                    className="resize"
                    height="100%"
                    fill="rgba(0, 0, 0, .5)"
                    onMouseDown={() => this.toggleExpand()}
                    onMouseUp={() => this.toggleExpand()}
                    onMouseMove={this.state.expand ? (e) => this.expand(2) : null}
                    pointerEvents="all"
                > </rect>
            </svg>
            // </div >
        );
    }
}

export default Drag;
import React, { Component } from 'react';
import { scaleLinear } from 'd3';

import { Context } from '../../../../Provider'

class TimelineLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labelId: this.props.label.id,
            hover: false,
            active: false
        }
        this.renderTimelineLabels();
    }

    componentDidUpdate() {
        this.renderTimelineLabels();
    }

    toggleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    handleClick = (e) => {
        const { label, toggleContextMenu } = this.props;
        e.preventDefault();
        e.stopPropagation();
        const isAnotherLabelActive = this.checkActiveLabel()
        if (isAnotherLabelActive) {
            alert('Please deactivate current label before selecting another one.')
            return
        }

        if (e.ctrlKey) {
            toggleContextMenu(e)
        } else if (e.nativeEvent.which === 1) {
            this.setState({
                active: !this.state.active
            }, () => {
                if (this.state.active) {
                    this.props.changeLabel(label)
                } else {
                    this.props.changeLabel(null)
                }
            })
        } else if (e.nativeEvent.which === 3) {
            toggleContextMenu(e)
        }
    }

    checkActiveLabel = () => {
        const { activeLabel } = this.props.state;
        if ((activeLabel) && (activeLabel !== this.state.labelId)) {
            return true
        } else {
            return false
        }
    }

    renderTimelineLabels = () => {
        const { zoomTransform, chartWidth } = this.props;
        const { timestampRange } = this.props.state;

        this.xScaleTimeInvert = scaleLinear()
            .domain([0, timestampRange.end - timestampRange.start])
            .range([0, chartWidth])

        this.xScaleTime = scaleLinear()
            .domain([timestampRange.start, timestampRange.end])
            .range([0, chartWidth])

        if (zoomTransform) {
            this.xScaleTime.domain(zoomTransform.rescaleX(this.xScaleTime).domain());
        }
    }

    render() {
        const { label, zoomTransform } = this.props;

        let labelPosX = label.timestamp_range[0];
        let diff = (Math.round(label.timestamp_range[1]) - Math.round(label.timestamp_range[0]))

        let color;
        let opacity;
        color = this.state.active || this.state.hover ? 'green' : 'grey';
        opacity = this.state.hover ? '.6' : '.8'

        return (
            <g>
                <rect
                    title={label.title}
                    description={label.description}
                    author={label.author}
                    id={label.id}
                    width={zoomTransform ? this.xScaleTimeInvert(diff * zoomTransform.k) : this.xScaleTimeInvert(diff)}
                    height={30}
                    y={0}
                    x={this.xScaleTime(labelPosX)}
                    className="timeline-label"
                    fill={color}
                    pointerEvents='all'
                    onClick={(e) => this.handleClick(e)}
                    onContextMenu={(e) => this.handleClick(e)}
                    onMouseOver={() => this.toggleHover()}
                    onMouseOut={() => this.toggleHover()}
                    opacity={opacity}
                    stroke="black"
                    strokeWidth="1px"
                >
                </rect>
                <text
                    x={this.xScaleTime(labelPosX) + 10}
                    fontFamily="Verdana"
                    fontSize="12"
                    fill="white"
                    y="20"
                    pointerEvents="none"
                >
                    {label.title}
                </text>
            </g>
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <TimelineLabel {...context} {...props} />}
    </Context.Consumer>
);

import React, {Component} from 'react'

class AxisLines extends Component {
    render() {

        const {events, yScaleTime, width} = this.props;

        return (
        <g ref="axis-lines">
            {events.map((event) => {
                return <line x1="0" y1={yScaleTime(events.indexOf(event))} x2={width} y2={yScaleTime(events.indexOf(event))} stroke="grey" strokeDasharray={3} key={event}/>})
            }
        </g>
        ) 
    }
}

export default AxisLines;
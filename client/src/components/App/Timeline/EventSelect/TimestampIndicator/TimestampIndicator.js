import React from 'react';

const TimestampIndicator = (props) => {
    // Shows timestamps at top left of timeline
    return (
        <div className="timestamp-container" >
            <span className="timestamp-font">Brush Selection: </span>
            <span>{props.brushRange[0] ? Math.round(props.brushRange[0]).toString() : 0}, </span>
            <span>{props.brushRange[1] ? Math.round(props.brushRange[1]).toString() : 0}</span>
        </div>
    )
}

export default TimestampIndicator
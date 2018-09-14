import React, { Component } from 'react';

class TooltipElement extends Component {
    render() {
        const { elementKey, elementLabel, event } = this.props;

        return (
            <div className="tooltip-element-wrapper">
                <span className="tooltip-element-key">{elementLabel}: </span>
                <span className="tooltip-element-value">{event[elementKey]}</span>
            </div>
        );
    }
}

export default TooltipElement
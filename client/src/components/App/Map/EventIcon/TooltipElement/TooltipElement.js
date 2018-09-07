import React, { Component } from 'react';

class TooltipElement extends Component {
    render() {
        const { element, event } = this.props;
        return (
            <div className="tooltip-element-wrapper">
                <span className="tooltip-element-key">{element}: </span>
                {/* <span className="tooltip-element-value">{event.formatted_value ? element.formatted_value : element.value}</span> */}
                <span className="tooltip-element-value">{event[element]}</span>
            </div>
        );
    }
}

export default TooltipElement;
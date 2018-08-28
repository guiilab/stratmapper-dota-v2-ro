import React, { Component } from 'react';

class TooltipElement extends Component {
    render() {
        const { element } = this.props;
        return (
            <div className="tooltip-element-wrapper">
                <span className="tooltip-element-key">{element.formatted_key}: </span>
                <span className="tooltip-element-value">{element.formatted_value ? element.formatted_value : element.value}</span>
            </div>
        );
    }
}

export default TooltipElement;
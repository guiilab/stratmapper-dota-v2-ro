import React, { Component } from 'react';

import { Context } from '../../../../Provider.js';

class TooltipElement extends Component {
    render() {
        const { elementKey, elementLabel, event, formatFirstString } = this.props;

        return (
            <div className="tooltip-element-wrapper">
                <span className="tooltip-element-key">{elementLabel}: </span>
                <span className="tooltip-element-value">{typeof event[elementKey] === "string" ? formatFirstString(event[elementKey]) : event[elementKey]}</span>
            </div>
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <TooltipElement {...context} {...props} />}
    </Context.Consumer>
);
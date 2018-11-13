import React, { Component } from 'react';

import { Context } from '../Provider.js';

class Tooltip extends Component {
    render() {
        const { tooltipPosition } = this.context.state;

        let tooltipStyle;

        if (tooltipPosition) {
            tooltipStyle = {
                opacity: 1,
                left: tooltipPosition[0],
                top: tooltipPosition[1]
            }
        } else {
            tooltipStyle = {
                opacity: 0
            }
        }

        return (
            <div style={tooltipStyle} className="tooltip-container">
            </div>
        );
    }
}

Tooltip.contextType = Context;

export default Tooltip;
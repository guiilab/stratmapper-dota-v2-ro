import React, { Component } from 'react';

import { Context } from '../Provider.js';
import TooltipElement from './TooltipElement/TooltipElement.js';
import NodeContextElement from './NodeContextElement/NodeContextElement.js';

class Tooltip extends Component {
    render() {
        const { tooltipPosition, tooltips, activeNode } = this.context.state;

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

        if (!activeNode) {
            return null
        }

        return (
            <div style={tooltipStyle} className="tooltip-container">
                <div className="tooltipsidebar-inner-container">
                    {tooltips[activeNode.event_type].map((element) => (
                        <TooltipElement
                            event={activeNode}
                            elementKey={element.key}
                            elementLabel={element.label}
                            key={element.label} />)
                    )}
                    {activeNode.node_context ? `<div className="tooltip-divider"></div>` : null}
                    {activeNode.node_context ? Object.keys(activeNode.node_context).map((element) => (
                        <NodeContextElement
                            event={activeNode}
                            element={element}
                            key={element}
                        />
                    )) : null}
                </div>
            </div>
        );
    }
}

Tooltip.contextType = Context;

export default Tooltip;
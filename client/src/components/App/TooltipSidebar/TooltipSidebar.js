import React, { PureComponent } from 'react';

import { Context } from '../Provider.js';
import TooltipElement from './TooltipElement/TooltipElement.js';
import NodeContextElement from './NodeContextElement/NodeContextElement.js';

class TooltipSidebar extends PureComponent {

    render() {
        const { tooltips, activeNode } = this.context.state;

        if (!activeNode) {
            return (
                <div className="tooltipsidebar-container">
                    <div className="tooltipsidebar-inner-container">
                        <div>(Hover Over Node to View Tooltip)</div>
                    </div>
                </div>
            )
        }
        return (
            <div className="tooltipsidebar-container">
                <div className="tooltipsidebar-inner-container">
                    {tooltips[activeNode.event_type].map((element) => (
                        <TooltipElement
                            event={activeNode}
                            elementKey={element.key}
                            elementLabel={element.label}
                            key={element.label} />)
                    )}
                    {Object.keys(activeNode.node_context).map((element) => (
                        <NodeContextElement
                            event={activeNode}
                            element={element}
                            key={element}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

TooltipSidebar.contextType = Context;

export default TooltipSidebar;
import React, { PureComponent } from 'react';

import { Context } from '../Provider.js';
import TooltipElement from './TooltipElement/TooltipElement.js';

class TooltipSidebar extends PureComponent {

    static contextType = Context;

    // shouldComponentUpdate(nextProps) {
    //     if (this.context.state.activeNode) {
    //         if (this.context.state.activeNode !== this.props.state.activeNode) {
    //             return true

    //         } else if (nextProps.state.activeNode !== null) {
    //             return true
    //         }
    //     }
    //     return false
    // }
    render() {
        const { tooltips, activeNode } = this.context.state;

        return (
            <div className="tooltipsidebar-container">
                <div className="tooltipsidebar-inner-container">
                    {activeNode ? tooltips[activeNode.event_type].map((element) => <TooltipElement event={activeNode} elementKey={element.key} elementLabel={element.label} key={element.label} />) : <div>(Hover Over Node to View Tooltip)</div>}
                </div>
            </div>
        );
    }
}

export default TooltipSidebar;
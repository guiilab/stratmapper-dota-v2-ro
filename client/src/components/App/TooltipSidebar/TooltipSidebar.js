import React, { Component } from 'react';

import { Context } from '../../Provider.js';
import TooltipElement from './TooltipElement/TooltipElement.js';

class TooltipSidebar extends Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps.state.activeNode) {
            if (nextProps.state.activeNode !== this.props.state.activeNode) {
                return true

            } else if (nextProps.state.activeNode !== null) {
                return true
            }
        }
        return false
    }
    render() {
        const { tooltips, activeNode } = this.props.state;

        return (
            <div className="tooltipsidebar-container">
                <div className="tooltipsidebar-inner-container">
                    {activeNode ? tooltips[activeNode.event_type].map((element) => <TooltipElement event={activeNode} elementKey={element.key} elementLabel={element.label} key={Math.random()} />) : <div>(Hover Over Node to View Tooltip)</div>}
                </div>
            </div>
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <TooltipSidebar {...context} {...props} />}
    </Context.Consumer>
);
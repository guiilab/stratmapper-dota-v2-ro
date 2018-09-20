import React, { Component } from 'react';

import { Context } from '../../../Provider.js';
import TooltipElement from './TooltipElement/TooltipElement.js';

class TooltipSidebar extends Component {
    render() {
        const { tooltips, activeNode } = this.props.state;

        return (
            <div className="tooltipsidebar-container">
                <div className="title-container">
                    <h3>Tooltip</h3>
                </div>
                <div className="tooltipsidebar-inner-container">
                    {activeNode ? tooltips[activeNode.event_type].map((element) => <TooltipElement event={activeNode} elementKey={element.key} elementLabel={element.label} key={Math.random()} />) : null}
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
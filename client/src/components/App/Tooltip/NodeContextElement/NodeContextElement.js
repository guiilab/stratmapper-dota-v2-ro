import React, { Component } from 'react';

import { Context } from '../../Provider.js';

class NodeContextElement extends Component {
    render() {
        const { element, event, formatFirstString, formatItemList } = this.props;

        return (
            <div className="node-context-element-wrapper">
                <span className="node-context-element-key">{formatFirstString(element)}: </span>
                <span className="node-context-element-value">{typeof event.node_context[element] === "object" ? formatItemList(event.node_context[element]) : event.node_context[element]}</span>
            </div>
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <NodeContextElement {...context} {...props} />}
    </Context.Consumer>
);
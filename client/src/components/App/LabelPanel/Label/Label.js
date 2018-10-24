import React, { Component } from 'react';

import { Context } from '../../Provider.js';

class Label extends Component {
    render() {
        const { label } = this.props;

        let labelStyle = {
            opacity: this.props.opacity
        }

        return (
            <div style={labelStyle} className="label">
                <div className="label-title">{label.behavior}</div>
                <div className="label-description">{label.description}</div>
                <div className="label-delete" onClick={() => this.props.deleteLabel(label.id)}>Delete</div>
            </div>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <Label {...context} {...props} />}
    </Context.Consumer>
);
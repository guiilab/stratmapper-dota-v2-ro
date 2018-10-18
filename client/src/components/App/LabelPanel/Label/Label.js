import React, { Component } from 'react';

import { Context } from '../../../Provider.js';

class Label extends Component {
    render() {
        const { label } = this.props
        return (
            <div className="label">
                <div className="label-title">{label.behavior}</div>
                <div className="label-description">{label.description}</div>
                <div className="label-delete">Delete</div>
            </div>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <Label {...context} {...props} />}
    </Context.Consumer>
);
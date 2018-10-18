import React, { Component } from 'react';

import { Context } from '../../../Provider.js';

class Label extends Component {
    render() {
        const { label } = this.props
        return (
            <div className="label">
                <span>{label.behavior}</span>
            </div>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <Label {...context} {...props} />}
    </Context.Consumer>
);
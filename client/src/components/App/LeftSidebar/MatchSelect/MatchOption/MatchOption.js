import React, { Component } from 'react';

import { Context } from '../../../../Provider.js'

class MatchOption extends Component {

    render() {
        const { option } = this.props;

        return (
            <option value={option} >{option}</option>
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <MatchOption {...context} {...props} />}
    </Context.Consumer>
);
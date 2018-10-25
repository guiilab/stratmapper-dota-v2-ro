import React, { Component } from 'react';

import { Context } from '../../Provider.js'
class TimestampIndicator extends Component {

    render() {
        const { brushRange } = this.props.state;

        return (
            <div className="timestamp-container" >
                <span className="timestamp-font">Brush Selection: </span>
                <span>{brushRange[0] ? Math.round(brushRange[0]).toString() : 0}, </span>
                <span>{brushRange[1] ? Math.round(brushRange[1]).toString() : 0}</span>
            </div>
        )
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <TimestampIndicator {...context} />}
    </Context.Consumer>
);
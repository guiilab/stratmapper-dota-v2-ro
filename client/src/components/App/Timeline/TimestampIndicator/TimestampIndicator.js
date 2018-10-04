import React, { Component } from 'react';

import { Context } from '../../../Provider.js'
class TimestampIndicator extends Component {

    render() {
        const { brushRange } = this.props.state;

        if (brushRange[0] === isNaN) {
            return (
                <div className="timestamp-container">
                    <span>Timestamps: </span>
                </div>
            )
        }

        return (
            <div className="timestamp-container" >
                <span>Timestamps: </span>
                <span>{Math.round(brushRange[0]).toString()}, </span>
                <span>{Math.round(brushRange[1]).toString()}</span>
            </div>
        )
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <TimestampIndicator {...context} />}
    </Context.Consumer>
);
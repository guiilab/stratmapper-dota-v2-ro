import React, { Component } from 'react';
import { Context } from '../../../Provider.js';

import MatchOption from './MatchOption/MatchOption.js';

class MatchSelection extends Component {

    handleChange = (e) => {
        this.props.setCurrentMatch(e.target.value)
    }

    render() {
        const { matches } = this.props.state

        return (
            <div className="match-select-container">
                <span className="match-select-font">Match:</span>
                <select name="map-select" id="map-select" value={this.props.state.currentMatch} onChange={(e) => this.handleChange(e)}>
                    {matches.map((map) => <MatchOption option={map} key={map} />)}
                </select>
            </div>
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <MatchSelection {...context} {...props} />}
    </Context.Consumer>
);
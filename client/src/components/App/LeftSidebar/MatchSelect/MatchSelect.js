import React, { PureComponent } from 'react';
import { Context } from '../../../Provider.js';

import MatchOption from './MatchOption/MatchOption.js';

class MatchSelect extends PureComponent {
    
    static contextType = Context;

    handleChange = (e) => {
        this.context.setCurrentMatch(e.target.value)
    }

    render() {
        const { matches } = this.context.state

        return (
            <div className="match-select-container">
                <span className="match-select-font">Match:</span>
                <select name="map-select" id="map-select" value={this.context.state.currentMatch} onChange={(e) => this.handleChange(e)}>
                    {matches.map((map) => <MatchOption option={map} key={map} />)}
                </select>
            </div>
        );
    }
}

export default MatchSelect;
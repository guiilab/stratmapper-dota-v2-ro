import React, { Component } from 'react';

import { Context } from './Provider.js'
import UnitOption from './UnitOption.js';
import GroupOption from './UnitOption.js';

class HeroSelection extends Component {
    render() {
        const { units, groups } = this.props.state;

        return (
            <div className="selection-container">
                <h3>Unit Selection</h3>
                <div className="unit-selection">
                    {units.map(unit => <UnitOption unit={unit} key={unit} />)}
                </div>
                <div className="group-selection">
                    {groups.map(group => <GroupOption group={group} key={group} />)}
                </div>
            </div>
        );
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <HeroSelection {...context} />}
    </Context.Consumer>
);
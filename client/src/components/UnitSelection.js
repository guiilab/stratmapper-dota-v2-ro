import React, { Component } from 'react';

import { Context } from './Provider.js'
import UnitOption from './UnitOption.js';
import GroupOption from './UnitOption.js';

class UnitSelection extends Component {

    toggleSelectedUnitLocal = (unit) => {
        this.props.toggleSelectedUnit(unit)
    }

    toggleSelectedGroupLocal = (group) => {
        this.props.toggleSelectedGroup(group)
    }

    render() {
        const { units } = this.props.state;
        console.log(units.all)
        console.log(units.groups)

        return (
            <div className="selection-container">
                <h3>Unit Selection</h3>
                <div className="unit-selection">
                    {units.all.map(unit => <UnitOption unit={unit} key={unit} toggleSelectedUnitLocal={(e) => this.toggleSelectedUnitLocal(e)} />)}
                </div>
                <div className="group-selection">
                    {units.groups.map(group => <GroupOption group={group} key={group} toggleSelectedGroupLocal={(e) => this.toggleSelectedGroupLocal(e)} />)}
                </div>
            </div>
        );
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <UnitSelection {...context} />}
    </Context.Consumer>
);
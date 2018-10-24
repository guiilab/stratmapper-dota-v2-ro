import React, { PureComponent } from 'react';

import { Context } from '../../Provider.js'

import GroupOption from './GroupOption/GroupOption.js';

class UnitSelect extends PureComponent {

    static contextType = Context;
    render() {
        const { groups } = this.context.state;
        return (
            <div className="unit-select-container">
                {groups.map((group) => {
                    return <GroupOption group={group} key={group.name} selectedUnits={this.context.state.selectedUnits} groupUnits={[...this.context.state[group.name]]} />
                })}
            </div>
        );
    }
}

export default UnitSelect;
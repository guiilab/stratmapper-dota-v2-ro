import React, { Component } from 'react';

import { Context } from '../../Provider.js'

import GroupOption from './GroupOption/GroupOption.js';

class UnitSelect extends Component {

    render() {
        const { groups } = this.context.state;

        // Renders GroupOptions for each group in groups object
        return (
            <div className="unit-select-container">
                {groups.map((group) => {
                    return (
                        <GroupOption
                            group={group}
                            key={group.name}
                            selectedUnits={this.context.state.selectedUnits}
                            groupUnits={[...group.units]}
                        />)
                })}
            </div>
        );
    }
}

// Enables access to context in component
UnitSelect.contextType = Context;

export default UnitSelect;
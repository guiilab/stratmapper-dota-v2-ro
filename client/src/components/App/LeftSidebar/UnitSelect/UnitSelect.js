import React, { Component } from 'react';

import { Context } from '../../../Provider.js'

import GroupOption from './GroupOption/GroupOption.js';

class UnitSelect extends Component {
    render() {
        const { groups } = this.props.state;
        return (
            <div className="unit-select-container">
                {groups.map((group) => {
                    return <GroupOption group={group} key={group.name} groupUnits={[...this.props.state[group.name]]} />
                })}
            </div>
        );
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <UnitSelect {...context} />}
    </Context.Consumer>
);
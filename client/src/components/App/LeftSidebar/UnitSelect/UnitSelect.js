import React, { Component } from 'react';

import { Context } from '../../../Provider.js'

import GroupOption from './GroupOption/GroupOption.js';

class UnitSelect extends Component {
    render() {
        const { groups } = this.props.state;
        return (
            <div className="select-container">
                <div className="title-container">
                    <h3>Unit Selection</h3>
                </div>
                <div className="group-select">
                    {groups.map((group) => {
                        return <GroupOption group={group} key={group.name} groupUnits={[...this.props.state[group.name]]} />
                    })}
                </div>
            </div>
        );
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <UnitSelect {...context} />}
    </Context.Consumer>
);
import React, { Component } from 'react';

import { Context } from './Provider.js'

import GroupOption from './GroupOption.js';

class UnitSelection extends Component {
    render() {
        const { groups } = this.props.state;
        return (
            <div className="select-container">
                <div className="title-container">
                    <h3>Group Selection</h3>
                </div>
                <div className="group-select">
                    {groups.map(group => <GroupOption group={group} key={group} units={[...this.props.state[group]]} />)}
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
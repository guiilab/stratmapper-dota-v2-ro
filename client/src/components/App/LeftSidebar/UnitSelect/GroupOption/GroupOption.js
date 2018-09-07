import React, { Component } from 'react';

import { Context } from '../../../../Provider.js';

import UnitOption from './UnitOption/UnitOption.js';

class GroupOption extends Component {

    state = {
        active: false
    }

    toggleClass = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render() {
        const { groupUnits, group } = this.props;
        const {units} = this.props.state;

        let test = 'herolich';
        
        return (
            <React.Fragment>
                <div className={this.state.active ? 'group-option group-option-active' : 'group-option'} key={group} onClick={() => { this.toggleClass(); }} >{group}</div>
                {/* <div className={this.state.active ? 'group-option group-option-active' : 'group-option'} key={group} onClick={() => { this.toggleClass(); toggleSelectedGroup(units, this.state.active); }} >{group}</div> */}
                <div className="unit-selection">
                    {groupUnits.map(function (unit) {
                        return <UnitOption unit={unit} key={unit} />
                    })}
                </div>
            </React.Fragment>
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <GroupOption {...context} {...props} />}
    </Context.Consumer>
);
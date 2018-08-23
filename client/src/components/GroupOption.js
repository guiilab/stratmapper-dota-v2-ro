import React, { Component } from 'react';

import { Context } from './Provider.js';

import UnitOption from './UnitOption.js';

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
        const { units, group } = this.props;

        return (
            <Context.Consumer>
                {(context) => {
                    return (
                        <React.Fragment>
                            <div className={this.state.active ? 'group-option group-option-active' : 'group-option'} key={group} onClick={() => { this.toggleClass(); context.toggleSelectedGroup(units, this.state.active); }} >{group}</div>
                            <div className="unit-selection">
                                {units.map(function (unit) {
                                    return <UnitOption unit={unit} key={unit} />
                                })}
                            </div>
                        </React.Fragment>
                    )
                }
                }
            </Context.Consumer>
        );
    }
}

export default GroupOption;
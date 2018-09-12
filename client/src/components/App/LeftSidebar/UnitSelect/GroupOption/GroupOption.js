import React, { Component } from 'react';

import { Context } from '../../../../Provider.js';

import UnitOption from './UnitOption/UnitOption.js';

class GroupOption extends Component {

    state = {
        active: false,
        hover: false
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.hover !== nextState.hover) {
            return true;
        } else if (nextState.active !== this.state.active) {
            return true;
        } else {
            return false;
        }
    }

    toggleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    toggleActive = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render() {
        const { groupUnits, group, toggleGroup } = this.props;

        let buttonStyle;

        if (this.state.hover || this.state.active) {
            buttonStyle = { backgroundColor: group }
        }

        return (
            <React.Fragment>
                <div className='group-option' style={buttonStyle} key={group} onMouseOver={() => this.toggleHover()} onMouseLeave={() => this.toggleHover()} onClick={() => { this.toggleActive(); toggleGroup(groupUnits) }} >{group}</div>
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
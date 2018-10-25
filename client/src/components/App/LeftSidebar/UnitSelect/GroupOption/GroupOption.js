import React, { Component } from 'react';
import includes from 'lodash';

import { Context } from '../../../Provider.js';
import UnitOption from './UnitOption/UnitOption.js';

class GroupOption extends Component {

    static contextType = Context;

    state = {
        active: false,
        hover: false
    }

    static getDerivedStateFromProps(nextProps) {
        if (includes(nextProps.selectedUnits, ...nextProps.groupUnits)) {
            return {
                active: true
            };
        }
        return null;
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
        const { toggleGroup, formatFirstString } = this.context;
        const { groupUnits, group } = this.props;

        let buttonStyle;

        if (this.state.hover || this.state.active) {
            buttonStyle = {
                backgroundColor: group.color,
                fontWeight: 700,
            }
        } else {
            buttonStyle = { backgroundColor: "grey" }
        }

        return (
            <div className="unit-selection">
                <div className='group-option' style={buttonStyle} key={group.name} onMouseOver={() => this.toggleHover()} onMouseLeave={() => this.toggleHover()} onClick={() => { this.toggleActive(); toggleGroup(groupUnits) }} >{formatFirstString(group.name)}</div>
                <React.Fragment>
                    {groupUnits.map(function (unit) {
                        return <UnitOption unit={unit} key={unit} />
                    })}
                </React.Fragment>
            </div>
        );
    }
}

export default GroupOption;
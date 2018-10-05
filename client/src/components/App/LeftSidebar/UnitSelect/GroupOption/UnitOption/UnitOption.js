import React, { Component } from 'react';

import { Context } from '../../../../../Provider.js';

class UnitOption extends Component {
    state = {
        hover: false,
        active: false,
        color: null,
        units: null,
        unit: null
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.state.selectedUnits.includes(nextProps.unit)) {
            return {
                active: true
            };
        }
        if (!nextProps.state.selectedUnits.includes(nextProps.unit)) {
            return {
                active: false
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
        const { unit, toggleSelectedUnit, getUnit, formatFirstString } = this.props;

        let buttonStyle;
        let unitObject = getUnit(unit);

        if (this.state.hover || this.state.active) {
            buttonStyle = { backgroundColor: unitObject.color }
        }

        return (
            <div className='unit-option' style={buttonStyle} key={unit} onMouseEnter={() => this.toggleHover()} onMouseLeave={() => this.toggleHover()} onClick={() => { this.toggleActive(); toggleSelectedUnit(unit); }} >{formatFirstString(unit)}</div>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <UnitOption {...context} {...props} />}
    </Context.Consumer>
);
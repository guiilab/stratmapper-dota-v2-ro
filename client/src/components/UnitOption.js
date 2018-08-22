import React, { Component } from 'react';

class UnitOption extends Component {

    state = {
        active: false
    }

    toggleClass = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render() {

        const { unit, toggleSelectedUnitLocal } = this.props;

        return (
            <div className={this.state.active ? 'unit-option unit-option-active' : 'unit-option'} key={unit} onClick={() => { this.toggleClass(); toggleSelectedUnitLocal(unit); }} >{unit}</div>
        );
    }
}

export default UnitOption;
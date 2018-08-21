import React, { Component } from 'react';

class UnitOption extends Component {
    render() {

        const { unit } = this.props;
        console.log(unit)
        return (
            <div className="unit-option" key={unit}>{unit}</div>
        );
    }
}

export default UnitOption;
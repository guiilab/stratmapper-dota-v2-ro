import React, { Component } from 'react';

class UnitEvent extends Component {
    render() {
        const { x, y, d } = this.props;

        const translate = `translate(${x}, ${y}), scale(.05)`

        return (
            <path
                d={d}
                fill="red"
                transform={translate}
            />
        );
    }
}

export default UnitEvent;
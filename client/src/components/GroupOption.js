import React, { Component } from 'react';

class GroupOption extends Component {
    render() {

        const { group } = this.props;
        console.log(group)

        return (
            <div className="unit-option" key={group}>{group}</div>
            // <h1>Hello</h1>
        );
    }
}

export default GroupOption;
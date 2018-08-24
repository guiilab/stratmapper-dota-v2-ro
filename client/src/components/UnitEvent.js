import React, { Component } from 'react';

class UnitEvent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            translate: `translate(${this.props.x}, ${this.props.y}), scale(.05)`
        }
    }
    changeScale = (s) => {
        this.setState({
            translate: `translate(${this.props.x}, ${this.props.y}), scale(${s})`
        })
    }
    render() {
        const { d } = this.props;

        return (
            <path
                d={d}
                className="icon"
                fill="red"
                transform={this.state.translate}
                onMouseEnter={() => this.changeScale(.06)}
                onMouseLeave={() => this.changeScale(.05)}
            />
        );
    }
}

export default UnitEvent;
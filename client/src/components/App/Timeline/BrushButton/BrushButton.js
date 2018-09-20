import React, { Component } from 'react';

import { Context } from '../../../Provider.js'
class BrushButton extends Component {

    state = {
        active: false,
        hover: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.state.brushActive === true) {
            return {
                active: true
            };
        } else if (nextProps.state.brushActive === false) {
            return {
                active: false
            }
        }
        return null;
    }

    toggleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    render() {
        const { toggleBrushActive } = this.props;

        let buttonStyle;

        if (this.state.hover || this.state.active) {
            buttonStyle = { backgroundColor: 'lightgreen' }
        }
        return (
            <div className="brush-button-container">
                <div
                    className="brush-button"
                    style={buttonStyle}
                    onClick={() => toggleBrushActive('toggle')}
                    onMouseOver={() => this.toggleHover()}
                    onMouseOut={() => this.toggleHover()}
                >{this.state.active ? 'Disable Brush' : 'Activate Brush'}
                </div>
            </div>
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <BrushButton {...context} {...props} />}
    </Context.Consumer>
);
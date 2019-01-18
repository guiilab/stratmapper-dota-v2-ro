import React, { Component } from 'react';

import { Context } from '../../../../Provider.js'

class SoloButton extends Component {
    state = {
        active: false,
        hover: false
    }

    // If selected, state updates based on props
    static getDerivedStateFromProps(nextProps, prevState) {
        if ((nextProps.selectedEventTypes[0] === nextProps.event) && (nextProps.selectedEventTypes.length === 1)) {
            return {
                active: true
            };
        }
        else {
            return {
                active: false
            };
        }
    }

    toggleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    toggleActive = () => {
        this.setState(prevState => ({
            active: !prevState.active
        }))
    }

    render() {
        const { event, soloEvent } = this.props;

        // Conditional styling based on hover and active state
        let buttonStyle;
        if (this.state.hover) {
            buttonStyle = { backgroundColor: '#ffe973' }
        } else if (this.state.active) {
            buttonStyle = { backgroundColor: 'gold' }
        }

        return (
            <div
                style={buttonStyle}
                onMouseOver={() => this.toggleHover()}
                onMouseLeave={() => this.toggleHover()}
                onClick={this.state.active ? () => soloEvent('toggle') : () => soloEvent(event)}
                className="solo-button"
            >S</div>
        )
    }
}

// Passes context and props to the component, which renders itself
export default (props) => (
    <Context.Consumer>
        {(context) => <SoloButton event={props.event} soloEvent={context.soloEvent} selectedEventTypes={context.state.selectedEventTypes} />}
    </Context.Consumer>
);
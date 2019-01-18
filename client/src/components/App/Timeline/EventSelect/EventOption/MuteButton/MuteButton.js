import React, { Component } from 'react';

import { Context } from '../../../../Provider.js'

class MuteButton extends Component {

    state = {
        active: false,
        hover: false
    }
    // If selected, state updates based on props
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selectedEventTypes.includes(nextProps.event)) {
            return {
                active: false
            };
        }
        if (!nextProps.selectedEventTypes.includes(nextProps.event)) {
            return {
                active: true
            };
        }
        return null;
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
        const { event, toggleSelectedEvent } = this.props;

        // Conditional styling based on hover and active state
        let buttonStyle;
        if (this.state.hover) {
            buttonStyle = { backgroundColor: '#da8888' }
        } else if (this.state.active) {
            buttonStyle = { backgroundColor: 'indianred' }
        }
        return (
            <div
                style={buttonStyle}
                onMouseOver={() => this.toggleHover()}
                onMouseLeave={() => this.toggleHover()}
                onClick={() => toggleSelectedEvent(event)}
                className="mute-button"
            >M</div>
        )
    }
}

// Passes context and props to the component, which renders itself
export default (props) => (
    <Context.Consumer>
        {(context) => <MuteButton event={props.event} toggleSelectedEvent={context.toggleSelectedEvent} selectedEventTypes={context.state.selectedEventTypes} />}
    </Context.Consumer>
);
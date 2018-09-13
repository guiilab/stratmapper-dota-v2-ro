import React, { Component } from 'react';

import { Context } from '../../../Provider.js'

class EventOption extends Component {

    state = {
        active: false,
        hover: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.state.selectedEvents.includes(nextProps.event)) {
            return {
                active: true
            };
        }
        if (!nextProps.state.selectedEvents.includes(nextProps.event)) {
            return {
                active: false
            };
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.active !== this.state.active) {
            return true;
        } else if (nextState.hover !== this.state.hover) {
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
        this.setState(prevState => ({
            active: !prevState.active
        }))
    }

    render() {
        const { event, toggleSelectedEvent } = this.props;

        let buttonStyle;

        if (this.state.hover) {
            buttonStyle = { backgroundColor: 'white' }
        } else if (this.state.active) {
            buttonStyle = { backgroundColor: 'lightgrey' }
        }

        return (
            <div className="event-option-container">
                <div className='event-option' style={buttonStyle} value={event} key={event} onMouseOver={() => this.toggleHover()} onMouseLeave={() => this.toggleHover()} onClick={() => { this.toggleActive(); toggleSelectedEvent(event); }}>{event}</div>
            </div>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <EventOption {...context} {...props} />}
    </Context.Consumer>
);
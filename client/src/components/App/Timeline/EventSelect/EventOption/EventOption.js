import React, { Component } from 'react';

import { Context } from '../../../Provider.js'

class EventOption extends Component {

    state = {
        active: true,
        hover: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selectedEventTypes.includes(nextProps.event.event_type)) {
            return {
                active: true
            };
        }
        if (!nextProps.selectedEventTypes.includes(nextProps.event.event_type)) {
            return {
                active: false
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

        let buttonStyle;
        if (this.state.hover) {
            buttonStyle = { backgroundColor: 'white' }
        } else if (this.state.active) {
            buttonStyle = { backgroundColor: 'lightgrey' }
        }

        return (
            <div className="event-option-container">
                <div className='event-option' style={buttonStyle} value={event.event_type} key={event.event_type} onMouseOver={() => this.toggleHover()} onMouseLeave={() => this.toggleHover()} onClick={() => { this.toggleActive(); toggleSelectedEvent(event.event_type); }}>{event.formatted_name}</div>
            </div>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <EventOption event={props.event} toggleSelectedEvent={context.toggleSelectedEvent} selectedEventTypes={context.state.selectedEventTypes} />}
    </Context.Consumer>
);
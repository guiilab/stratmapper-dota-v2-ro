import React, { Component } from 'react';

import { Context } from '../../../Provider.js'
import MuteButton from './MuteButton/MuteButton.js'
import SoloButton from './SoloButton/SoloButton.js'

class EventOption extends Component {
    // Each event option represens a different event type, as set in match file 
    state = {
        active: false,
        hover: false
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
        const { event } = this.props;

        return (
            <div className="event-option-container">
                <div
                    className='event-option'
                    value={event.event_type}
                    key={event.event_type}
                >{event.formatted_name}
                </div>
                <div className="event-controls">
                    <MuteButton event={event.event_type} />
                    <SoloButton event={event.event_type} />
                </div>
            </div>
        )
    }
}

// Passes context and props to the component, which renders itself
export default (props) => (
    <Context.Consumer>
        {(context) => <EventOption event={props.event} selectedEventTypes={context.state.selectedEventTypes} />}
    </Context.Consumer>
);
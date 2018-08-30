import React, { Component } from 'react';

class Event extends Component {

    render() {

        const { event } = this.props;
        return (
            <div className="event-option-container">
                <div className="event-component mute-button">Mute</div>
                <div className="event-component solo-button">Solo</div>
                <div className="event-component event-label">{event}</div>
            </div>
        )
    }
}

export default Event;
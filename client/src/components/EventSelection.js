import React, { Component } from 'react';

import EventOption from './EventOption.js'
import { Context } from './Provider';

class EventSelection extends Component {

    toggleSelectedEventLocal = (event) => {
        this.props.toggleSelectedEvent(event)
    }

    render() {
        const { events } = this.props.state;
        return (
            <div className="event-selection-container">
                <h3>Event Selection</h3>
                <div className="event-selection">
                    {events.categories.map(event => <EventOption event={event} key={event} toggleSelectedEventLocal={(e) => this.toggleSelectedEventLocal(e)} />)}
                </div>
            </div>
        );
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <EventSelection {...context} />}
    </Context.Consumer>
);
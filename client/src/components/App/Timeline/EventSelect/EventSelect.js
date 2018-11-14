import React, { PureComponent } from 'react';

import { Context } from '../../Provider.js'

import EventOption from './EventOption/EventOption.js';

class EventSelect extends PureComponent {
    render() {
        const { events, timelineSettings } = this.context.state;

        const heightStyle = {
            height: timelineSettings.height
        }

        return (
            <div className="event-select-container" style={heightStyle}>
                {events.timelineObj.map((event) => <EventOption event={event} key={event.event_type} />)}
            </div>
        );
    }
}

EventSelect.contextType = Context;

export default EventSelect;

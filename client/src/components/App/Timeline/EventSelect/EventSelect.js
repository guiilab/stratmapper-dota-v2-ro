import React, { PureComponent } from 'react';

import { Context } from '../../Provider.js'

import EventOption from './EventOption/EventOption.js';
import TimestampIndicator from './TimestampIndicator/TimestampIndicator.js'


class EventSelect extends PureComponent {
    render() {
        const { events, timelineSettings, brushRange } = this.context.state;

        const heightStyle = {
            height: timelineSettings.height
        }

        return (
            <div className="event-select-container" style={heightStyle}>
                <TimestampIndicator brushRange={brushRange} />
                {events.timelineObj.map((event) => <EventOption event={event} key={event.event_type} />)}
            </div>
        );
    }
}

EventSelect.contextType = Context;

export default EventSelect;

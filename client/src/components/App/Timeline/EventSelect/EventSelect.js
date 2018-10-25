import React, { PureComponent } from 'react';

import { Context } from '../../Provider.js'

import BrushButton from './../BrushButton/BrushButton.js';
import EventOption from './../EventOption/EventOption.js';

class EventSelect extends PureComponent {
    render() {
        const { events, timelineSettings } = this.props.state;

        const heightStyle = {
            height: timelineSettings.height
        }

        return (
            <div className="event-select-container" style={heightStyle}>
                <BrushButton />
                {events.timelineObj.map((event) => <EventOption event={event} key={event.event_type} />)}
            </div>
        );
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <EventSelect {...context} />}
    </Context.Consumer>
);

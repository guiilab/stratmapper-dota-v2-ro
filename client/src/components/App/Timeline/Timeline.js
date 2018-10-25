import React, { PureComponent } from 'react';

import { Context } from '../Provider.js'

import BrushButton from './BrushButton/BrushButton.js';
import EventOption from './EventOption/EventOption.js';
import TimelineChart from './TimelineChart/TimelineChart.js';

class Timeline extends PureComponent {


    render() {
        const { width } = this.props.state;
        const { events, timelineSettings } = this.props.state;

        const heightStyle = {
            height: timelineSettings.height
        }

        if (!width) {
            return (
                <div className="timeline-container" ref="timelineContainer">
                    <div className="timeline-chart" ref={this.chart}>
                    </div>
                </div>
            )
        }

        return (
            <div className="timeline-container" ref="timelineContainer">
                <div className="event-select-container" style={heightStyle}>
                    <BrushButton />
                    {events.timelineObj.map((event) => <EventOption event={event} key={event.event_type} />)}
                </div>
                <TimelineChart />
            </div>
        );
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <Timeline {...context} />}
    </Context.Consumer>
);

import React, { PureComponent } from 'react';

import { Context } from '../Provider.js';
import EventSelect from './EventSelect/EventSelect.js';
import TimelineChart from './TimelineChart/TimelineChart.js';

class Timeline extends PureComponent {

    // Timelinec component, simple container
    render() {

        const { timelineSettings } = this.context.state;

        const timelineStyle = {
            height: timelineSettings.height
        }

        return (
            <div className="timeline-container" style={timelineStyle}>
                <EventSelect />
                <TimelineChart />
            </div>
        );
    }
}

// Enables access to context in component
Timeline.contextType = Context

export default Timeline;

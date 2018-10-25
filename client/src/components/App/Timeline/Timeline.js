import React, { PureComponent } from 'react';

import EventSelect from './EventSelect/EventSelect.js'
import TimelineChart from './TimelineChart/TimelineChart.js';

class Timeline extends PureComponent {

    render() {

        return (
            <div className="timeline-container">
                <EventSelect />
                <TimelineChart />
            </div>
        );
    }
}

export default Timeline;

import React, { PureComponent } from 'react';

import { Context } from '../../../Provider.js'
import TimelineLabel from './TimelineLabel/TimelineLabel.js'

class GlobalTimeline extends PureComponent {


    render() {
        const { chartWidth, zoomTransform } = this.props;
        const { labels } = this.context.state;

        const globalTimelineStyle = {
            width: chartWidth
        }

        return (
            <div style={globalTimelineStyle} className="global-timeline-container">
                <svg width="100%" height="100%">
                    {labels ? labels.map((label) => {
                        return <TimelineLabel label={label} zoomTransform={zoomTransform} chartWidth={chartWidth} key={label.description} />
                    }) : null}
                </svg>
            </div>
        );
    }
}

GlobalTimeline.contextType = Context;

export default GlobalTimeline;

import React, { PureComponent } from 'react';

import { Context } from '../../../Provider.js'
import TimelineLabel from './TimelineLabel/TimelineLabel.js'

class GlobalTimeline extends PureComponent {

    static contextType = Context;

    render() {
        const { width, zoomTransform } = this.props;
        const { labels } = this.context.state;

        const globalTimelineStyle = {
            width: width
        }

        return (
            <div style={globalTimelineStyle} className="global-timeline-container">
                <svg width="100%" height="100%">
                    {labels ? labels.map((label) => {
                        return <TimelineLabel label={label} zoomTransform={zoomTransform} width={width} key={label.description} />
                    }) : null}
                </svg>
            </div>
        );
    }
}

export default GlobalTimeline;

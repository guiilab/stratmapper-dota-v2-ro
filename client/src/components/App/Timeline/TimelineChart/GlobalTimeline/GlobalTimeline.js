import React, { PureComponent } from 'react';

class GlobalTimeline extends PureComponent {

    render() {
        const { width } = this.props;

        const globalTimelineStyle = {
            width: width
        }

        return (
            <div style={globalTimelineStyle} className="global-timeline-container">
            </div>
        );
    }
}

export default GlobalTimeline;

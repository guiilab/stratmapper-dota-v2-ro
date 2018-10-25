import React, { PureComponent } from 'react';

class GlobalTimeline extends PureComponent {

    render() {
        const { width } = this.props;

        const globalTimelineStyle = {
            width: width
        }

        return (
            <div style={globalTimelineStyle} className="global-timeline-container">
                <svg width="100%" height="100%"></svg>
            </div>
        );
    }
}

export default GlobalTimeline;

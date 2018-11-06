import React, { PureComponent } from 'react';

import { Context } from '../../../Provider.js'
import TimelineLabel from './TimelineLabel/TimelineLabel.js';
import ContextMenu from './ContextMenu/ContextMenu.js';

class GlobalTimeline extends PureComponent {

    state = {
        contextMenuActive: false
    }

    toggleContextMenu = (e) => {
        this.setState({
            contextMenuActive: !this.state.contextMenuActive,
            contextPosX: e.target.getAttribute('x'),
            description: e.target.getAttribute('description'),
            id: e.target.getAttribute('id')
        })
    }

    render() {
        const { chartWidth, zoomTransform } = this.props;
        const { labels } = this.context.state;

        const globalTimelineStyle = {
            width: chartWidth
        }

        return (
            <div style={globalTimelineStyle} className="global-timeline-container">
                <ContextMenu
                    active={this.state.contextMenuActive}
                    posX={`${this.state.contextPosX}px`}
                    description={this.state.description}
                    id={this.state.id}
                />
                <svg width="100%" height="100%">
                    {labels ? labels.map((label) => {
                        return (
                            <TimelineLabel
                                label={label}
                                zoomTransform={zoomTransform}
                                chartWidth={chartWidth}
                                toggleContextMenu={this.toggleContextMenu}
                                key={label.description}
                            />
                        )
                    }) : null}
                </svg>
            </div>
        );
    }
}

GlobalTimeline.contextType = Context;

export default GlobalTimeline;

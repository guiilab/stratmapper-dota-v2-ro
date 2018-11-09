import React, { Component } from 'react';

import { Context } from '../../../Provider.js'
import TimelineLabel from './TimelineLabel/TimelineLabel.js';
import ContextMenu from './ContextMenu/ContextMenu.js';

class GlobalTimeline extends Component {

    state = {
        contextMenuActive: false
    }

    componentDidMount() {
        this.context.getLoadLabels()
    }

    toggleContextMenu = (e) => {
        if (!this.state.contextMenuActive) {
            this.setState({
                contextMenuActive: true,
                contextPosX: e.target.getAttribute('x'),
                description: e.target.getAttribute('description'),
                id: e.target.getAttribute('id'),
                author: e.target.getAttribute('author'),
                title: e.target.getAttribute('title')
            })
        } else {
            this.setState({
                contextMenuActive: false
            })
        }
    }

    render() {
        const { chartWidth, zoomTransform } = this.props;
        const { shuffleLabels } = this.context;
        const { labels } = this.context.state;

        const globalTimelineStyle = {
            width: chartWidth
        }

        return (
            // <div style={globalTimelineStyle} className="global-timeline-container" onKeyDown={(e) => shuffleLabels(e)} onKeyUp={(e) => shuffleLabels(e)}>
            <div style={globalTimelineStyle} className="global-timeline-container" onKeyDown={(e) => shuffleLabels(e)} tabIndex="0">
                <ContextMenu
                    title={this.state.title}
                    active={this.state.contextMenuActive}
                    posX={`${this.state.contextPosX}px`}
                    description={this.state.description}
                    author={this.state.author}
                    id={this.state.id}
                    toggleContextMenu={this.toggleContextMenu}
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
            </div >
        );
    }
}

GlobalTimeline.contextType = Context;

export default GlobalTimeline;

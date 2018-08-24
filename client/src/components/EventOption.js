import React, { Component } from 'react';

import { Context } from './Provider.js';

class EventOption extends Component {

    state = {
        active: false
    }

    toggleClass = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render() {

        let { event, toggleSelectedEventLocal } = this.props;
        return (
            <Context.Consumer>
                {(context) => {
                    // event = context.formatEventString(event);
                    return <div className={this.state.active ? 'event-option event-option-active' : 'event-option'} value={event} key={event} onClick={() => { this.toggleClass(); toggleSelectedEventLocal(event); }}>{event}</div>
                }
                }
            </Context.Consumer>
        );
    }
}

export default EventOption;
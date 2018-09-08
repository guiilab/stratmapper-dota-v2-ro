import React, { Component } from 'react';

import * as _ from 'lodash';

import {Context} from '../../../Provider.js'

class EventOption extends Component {

    state = {
        active: false
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.active !== this.state.active) {
            return true;
        } else {
            return false;
        }
    }


    toggleClass = () => {
        this.setState(prevState => ({
            active: !prevState.active
        }))
    }

    render() {
        const { event, toggleSelectedEvent } = this.props;
        
        return (
            <div className="event-option-container">
                <div className={this.state.active ? 'event-option event-option-active' : 'event-option'} value={event} key={event} onClick={() => { this.toggleClass(); toggleSelectedEvent(event); }}>{event}</div>
            </div>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <EventOption toggleSelectedEvent={context.toggleSelectedEvent} event={props.event} />}
    </Context.Consumer>
);
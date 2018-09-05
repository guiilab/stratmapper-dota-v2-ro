import React, { Component } from 'react';

import {Context} from './Provider.js'

class EventOption extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: null,
            event: null
        }
    }

    componentDidMount() {
        this.setState({
            active: false,
            event: this.props.event
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.active !== this.state.active) {
            return true
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
                <div className="solo-button">Solo</div>
                <div className={this.state.active ? 'event-option event-option-active' : 'event-option'} value={event} key={event} onClick={() => { this.toggleClass(); toggleSelectedEvent(event); }}>{event}</div>
            </div>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <EventOption {...context} event={props.event} />}
    </Context.Consumer>
);
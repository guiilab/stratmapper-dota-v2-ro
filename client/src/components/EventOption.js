import React, { Component } from 'react';

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

    // shouldComponentUpdate(nextProps) {
    //     console.log(nextProps)
    //     if (this.state.event === nextProps.event) {
    //         return false
    //     }
    //     return true
    // }

    toggleClass = () => {
        this.setState(prevState => ({
            active: !prevState.active
        }))
    }

    render() {
        let { event, toggleSelectedEventLocal } = this.props;
        return <div className={this.state.active ? 'event-option event-option-active' : 'event-option'} value={event} key={event} onClick={() => { this.toggleClass(); toggleSelectedEventLocal(event); }}>{event}</div>
    }
}

export default EventOption;
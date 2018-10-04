import React, { Component } from 'react';

import { Context } from '../Provider.js'

import LeftSidebar from './LeftSidebar/LeftSidebar.js'
import Map from './Map/Map.js';
import LoadingIcon from './LoadingIcon/LoadingIcon.js'
import RightSidebar from './RightSidebar/RightSidebar.js';
import Timeline from './Timeline/Timeline.js';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this
            .props.getMatchEntries().then(this.loadNewData())
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextProps.state.currentMatch !== this.props.state.currentMatch) {
            this.loadNewData()
        }

    }

    loadNewData() {
        this
            .props.getMatchData(this.props.state.currentMatch)
            .then(res => this.props.loadMatchData(res))
    }

    render() {
        const { mapLoading, timestampRange } = this.props.state;

        if (mapLoading || !timestampRange) {
            return <LoadingIcon />
        } else {
            return (
                <div className="app-container" >
                    <Map />
                    <LeftSidebar />
                    <RightSidebar />
                    <Timeline />
                </div>
            );
        }
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <App {...context} />}
    </Context.Consumer>
);
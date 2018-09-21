import React, { Component } from 'react';

import { Context } from '../Provider.js'

import LeftSidebar from './LeftSidebar/LeftSidebar.js'
import Map from './Map/Map.js';
import LoadingIcon from './LoadingIcon/LoadingIcon.js'
import RightSidebar from './RightSidebar/RightSidebar.js';
import Timeline from './Timeline/Timeline.js';

class App extends Component {

    componentDidMount() {
        this
            .props.getMatchEntries()
        this
            .props.getMatchData(this.props.state.currentMatch)
            .then(res => this.props.loadMatchData(res))
    }

    render() {

        const { mapLoading } = this.props.state;

        if (mapLoading) {
            return <LoadingIcon />
        } else {
            return (
                <div className="app-container">
                    <div className="center-container" >
                        <LeftSidebar />
                        <Map />
                        <RightSidebar />
                    </div>
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
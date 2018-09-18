import React, { Component } from 'react';

import { Context } from '../Provider.js'

import LeftSidebar from './LeftSidebar/LeftSidebar.js'
import Map from './Map/Map.js';
import LoadingIcon from './LoadingIcon/LoadingIcon.js'
// import RightSidebar from './RightSidebar/RightSidebar.js';
import Timeline from './Timeline/Timeline.js';

class App extends Component {
    componentDidMount() {
        this
            .props.getMatchData()
            .then(res => this.props.loadMatchData(res))
    }

    render() {

        const { mapSettings, mapLoading } = this.props.state;

        const centerContainerStyle = {
            width: mapSettings.width,
            height: mapSettings.height
        }

        if (mapLoading) {
            return <LoadingIcon />
        } else {
            return (
                <div className="app-container">
                    <div className="center-container" style={centerContainerStyle}>
                        <LeftSidebar />
                        <Map />
                        {/* <RightSidebar /> */}
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
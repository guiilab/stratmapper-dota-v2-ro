import React, { Component } from 'react';

import { Context } from './Provider.js'
import Map from './Map.js';
import Timeline from './Timeline.js';
import EventSelection from './EventSelection.js';
import MapSelection from './MapSelection.js';
import HeroSelection from './HeroSelection.js';
import EventData from './EventData.js';
import Heatmap from './Heatmap.js';
import Label from './Label.js';

class App extends Component {

    componentDidMount() {
        this
            .props.getMatchData()
            .then(res => this.props.loadMatchData(res))
        this
            .props.getEvents()
    }

    render() {

        const { mapLoading } = this.props;

        if (mapLoading) {
            return <div>Loading</div>
        } else {
            return (
                <div className="app-container">
                    <div className="center-container">
                        <div className="left-sidebar">
                            <MapSelection />
                            <HeroSelection />
                            <EventData />
                        </div>
                        <Map />
                        <div className="right-sidebar">
                            <Heatmap />
                            <Label />
                        </div>
                    </div>
                    <div className="time-selection-container">
                        <EventSelection />
                        <Timeline />
                    </div>
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
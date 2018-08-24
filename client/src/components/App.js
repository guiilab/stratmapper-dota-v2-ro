import React, { Component } from 'react';

import { Context } from './Provider.js'
import Map from './Map.js';
import Timeline from './Timeline.js';
import EventSelect from './EventSelect.js';
import GameSelect from './GameSelect.js';
import MapSelect from './MapSelect.js';
import UnitSelect from './UnitSelect.js';
import EventData from './EventData.js';
import Heatmap from './Heatmap.js';
import Label from './Label.js';

class App extends Component {
    componentDidMount() {
        this
            .props.getMatchData()
            .then(res => this.props.loadMatchData(res))
    }

    render() {

        const { dire } = this.props.state;

        if (!dire) {
            return <div>Loading</div>
        } else {
            return (
                <div className="app-container">
                    <div className="center-container">
                        <div className="left-sidebar">
                            <GameSelect />
                            <MapSelect />
                            <UnitSelect />
                            <EventData />
                        </div>
                        <Map />
                        <div className="right-sidebar">
                            <Heatmap />
                            <Label />
                        </div>
                    </div>
                    <div className="time-selection-container">
                        <EventSelect />
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
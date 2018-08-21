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
        // this.callApi()
        //     .then(res => this.setState({ response: res.express }))
        //     .catch(err => console.log(err));
        this
            .props.getEvents()
            .then(res => console.log(res))

    }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        return (
            <React.Fragment>
                <Map />
                <div className="app-container">
                    <div className="center-container">
                        <div className="left-sidebar">
                            <MapSelection />
                            <HeroSelection />
                            <EventData />
                        </div>
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
            </React.Fragment>
        );
    }
}


export default () => (
    <Context.Consumer>
        {(context) => <App {...context} />}
    </Context.Consumer>
);
import React, { Component } from 'react';

import { Context } from '../Provider.js'

import LeftSidebar from './LeftSidebar/LeftSidebar.js';
import Map from './Map/Map.js';
import LoadingIcon from './LoadingIcon/LoadingIcon.js';
import TooltipSidebar from './TooltipSidebar/TooltipSidebar.js';
import LabelPanel from './LabelPanel/LabelPanel.js';
import Timeline from './Timeline/Timeline.js';

class App extends Component {

    static contextType = Context;

    componentDidMount() {
        this.context.getMatchEntries().then(this.loadNewData())
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     console.log(nextContext)
    // }

    componentDidUpdate(nextProps, nextState) {
        // if (nextProps.state.currentMatch !== this.context.state.currentMatch) {
        //     this.loadNewData()
        // }
        // if ((nextProps.state.selectedUnits !== this.context.state.selectedUnits) || (nextProps.state.selectedEventTypes !== this.context.state.selectedEventTypes || ((nextProps.state.brushRange !== this.context.state.brushRange) && nextProps.state.brushRange.length !== 0))) {
        //     this.context.filterEvents()
        // }
        // if ((nextProps.state.brushRange !== this.context.state.brushRange) && nextProps.state.brushRange.length !== 0) {
        //     this.context.filterEvents()
        // }

    }

    loadNewData() {
        this
            .context.getMatchData(this.context.state.currentMatch)
            .then(res => this.context.loadMatchData(res))
    }

    render() {
        const { mapLoading, timestampRange, windowSettings } = this.context.state;

        const appContainerStyle = {
            width: windowSettings.width,
            height: windowSettings.height
        }

        if (mapLoading || !timestampRange) {
            return <LoadingIcon />
        } else {
            return (
                <div className="app-container" style={appContainerStyle}>
                    <Map />
                    <LeftSidebar />
                    <TooltipSidebar />
                    <LabelPanel />
                    <Timeline />
                </div>
            );
        }
    }
}

export default App;
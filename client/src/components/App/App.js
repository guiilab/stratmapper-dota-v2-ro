import React, { Component } from 'react';

import { Context } from '../Provider.js'

import LeftSidebar from './LeftSidebar/LeftSidebar.js';
import Map from './Map/Map.js';
import LoadingIcon from './LoadingIcon/LoadingIcon.js';
import TooltipSidebar from './TooltipSidebar/TooltipSidebar.js';
import LabelPanel from './LabelPanel/LabelPanel.js';
import Timeline from './Timeline/Timeline.js';

class App extends Component {

    componentDidMount() {
        this
            .props.getMatchEntries().then(this.loadNewData())
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextProps.state.currentMatch !== this.props.state.currentMatch) {
            this.loadNewData()
        }
        if ((nextProps.state.selectedUnits !== this.props.state.selectedUnits) || (nextProps.state.selectedEventTypes !== this.props.state.selectedEventTypes)) {
            this.props.filterEvents()
        }
        if ((nextProps.state.brushRange !== this.props.state.brushRange) && nextProps.state.brushRange.length !== 0) {
            this.props.filterEvents()
        }

    }

    loadNewData() {
        this
            .props.getMatchData(this.props.state.currentMatch)
            .then(res => this.props.loadMatchData(res))
    }

    render() {
        const { mapLoading, timestampRange, windowSettings } = this.props.state;

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

export default () => (
    <Context.Consumer>
        {(context) => <App {...context} />}
    </Context.Consumer>
);
import React, { Component } from 'react';

import Heatmap from './Heatmap/Heatmap.js';
import Label from './Label/Label.js';
import TooltipSidebar from './TooltipSidebar/TooltipSidebar.js'
import EventData from './EventData/EventData.js'

class RightSidebar extends Component {
    render() {
        return (
            <div className="right-sidebar">
                <TooltipSidebar />
                <EventData />
            </div>
        );
    }
}

export default RightSidebar;
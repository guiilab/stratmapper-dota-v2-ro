import React, { Component } from 'react';

import GameSelect from './GameSelect/GameSelect.js';
import MapSelect from './MapSelect/MapSelect.js';
import UnitSelect from './UnitSelect/UnitSelect.js';
import EventData from './EventData/EventData.js';

class LeftSidebar extends Component {
    render() {
        return (
            <div className="left-sidebar">
                <GameSelect />
                <MapSelect />
                <UnitSelect />
                <EventData />
            </div>
        );
    }
}

export default LeftSidebar;
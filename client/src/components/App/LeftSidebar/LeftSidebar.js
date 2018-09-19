import React from 'react';

import MatchSelect from './MatchSelect/MatchSelect.js';
import UnitSelect from './UnitSelect/UnitSelect.js';
import EventData from './EventData/EventData.js';

const LeftSidebar = () => {
    return (
        <div className="left-sidebar">
            <MatchSelect />
            <UnitSelect />
            <EventData />
        </div>
    );
}

export default LeftSidebar;
import React from 'react';

import MatchSelect from './MatchSelect/MatchSelect.js';
import UnitSelect from './UnitSelect/UnitSelect.js';

const LeftSidebar = () => {
    return (
        <div className="left-sidebar">
            <MatchSelect />
            <UnitSelect />
        </div>
    );
}

export default LeftSidebar;
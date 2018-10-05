import React from 'react';

import AppTitle from './AppTitle/AppTitle.js'
import MatchSelect from './MatchSelect/MatchSelect.js';
import UnitSelect from './UnitSelect/UnitSelect.js';

const LeftSidebar = () => {
    return (
        <div className="left-sidebar">
            <AppTitle />
            <MatchSelect />
            <UnitSelect />
        </div>
    );
}

export default LeftSidebar;
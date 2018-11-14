import React, { Component } from 'react';

import AppTitle from './AppTitle/AppTitle.js'
import MatchSelect from './MatchSelect/MatchSelect.js';
import UnitSelect from './UnitSelect/UnitSelect.js';

class LeftSidebar extends Component {

    render() {
        return (
            <div className="left-sidebar">
                <AppTitle />
                <MatchSelect />
                <UnitSelect />
            </div>
        );
    }
}

export default LeftSidebar;
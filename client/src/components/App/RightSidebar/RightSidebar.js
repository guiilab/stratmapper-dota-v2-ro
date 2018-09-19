import React, { Component } from 'react';

import MapControl from './MapControl/MapControl.js'

class RightSidebar extends Component {
    render() {
        return (
            <div className="right-sidebar">
                <MapControl />
            </div>
        );
    }
}

export default RightSidebar;
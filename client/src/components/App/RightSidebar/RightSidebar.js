import React, { Component } from 'react';

import Heatmap from './Heatmap/Heatmap.js';
import Label from './Label/Label.js'

class RightSidebar extends Component {
    render() {
        return (
            <div className="right-sidebar">
                <Heatmap />
                <Label />
            </div>
        );
    }
}

export default RightSidebar;
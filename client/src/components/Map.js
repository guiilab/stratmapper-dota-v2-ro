import React, { Component } from 'react';

import Background from '../img/dotaminimap_7.jpg';

var mapDivStyle = {
    backgroundImage: "url(" + Background + ")"
};

class Map extends Component {
    render() {
        return (
            <div className="map-container" style={mapDivStyle}>
                <svg className="map-svg" width="800" height="800">
                </svg>
            </div >
        );
    }
}

export default Map;
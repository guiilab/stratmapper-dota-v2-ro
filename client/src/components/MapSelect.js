import React, { Component } from 'react';

class MapSelection extends Component {
    render() {
        return (
            <div className="map-select-container">
                <div className="title-container">
                    <h3>Map Selection</h3>
                </div>
                <select name="map-select" id="map-select">
                    <option value="Map1">Map 1</option>
                    <option value="Map2">Map 2</option>
                </select>
            </div>
        );
    }
}

export default MapSelection;
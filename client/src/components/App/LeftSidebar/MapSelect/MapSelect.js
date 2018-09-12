import React, { Component } from 'react';

class MapSelection extends Component {
    render() {
        return (
            <div className="match-select-container">
                <div className="title-container">
                    <h3>Match Selection</h3>
                </div>
                <select name="map-select" id="map-select">
                    <option value="Map1">3_esp</option>
                    <option value="Map2">4_esp</option>
                    <option value="Map2">5_esp</option>
                    <option value="Map2">6_esp</option>
                    <option value="Map2">7_esp</option>
                </select>
            </div>
        );
    }
}

export default MapSelection;
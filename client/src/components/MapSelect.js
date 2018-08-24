import React, { Component } from 'react';

class MapSelection extends Component {
    render() {
        return (
            <div className="map-select-container">
                <div className="title-container">
                    <h3>Map Selection</h3>
                </div>
                <select name="map-select" id="map-select">
                    <option value="Map1">2500623971</option>
                    <option value="Map2">2500632973</option>
                </select>
            </div>
        );
    }
}

export default MapSelection;
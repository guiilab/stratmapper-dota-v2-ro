import React, { Component } from 'react';

class GameSelect extends Component {
    render() {
        return (
            <div className="game-select-container">
                <div className="title-container">
                    <h3>Game Select</h3>
                </div>
                <select name="game-select" id="game-select">
                    <option value="DOTA">DOTA</option>
                    <option value="BoomTown">BoomTown</option>
                </select>
            </div>
        );
    }
}

export default GameSelect;
import React, { PureComponent } from 'react';

import { Context } from '../../../Provider.js'

class Playback extends PureComponent {

    state = {
        playing: false
    }

    togglePlay = () => {
        this.setState({
            playing: !this.state.playing
        })
    }

    render() {
        return (
            <div className="playback-container">
                <div className="play-pause" onClick={() => { this.togglePlay(); this.context.playback() }}>
                    <div className="play-pause-container">
                        {this.state.playing ?
                            <div className="pause-button">||</div>
                            : <div className="play-button"></div>}
                    </div>
                </div>
            </div>
        );
    }
}

Playback.contextType = Context;

export default Playback;

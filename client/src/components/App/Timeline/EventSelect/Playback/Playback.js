import React, { PureComponent } from 'react';

import { Context } from '../../../Provider.js'

class Playback extends PureComponent {

    render() {
        return (
            <div className="playback-container">
                <div className="play-pause" onClick={() => this.context.playback()}>
                    <div className="play-pause-container">
                        {this.context.state.playing ?
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

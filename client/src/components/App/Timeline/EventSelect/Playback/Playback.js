import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { Context } from '../../../Provider.js';

class Playback extends PureComponent {

    render() {
        return (
            <div className="playback-container">
                <div className="play-pause" onClick={() => this.context.playback()}>
                    {this.context.state.playing ?
                        <FontAwesomeIcon icon={faPause} />
                        : <FontAwesomeIcon icon={faPlay} />}
                </div>
                <div className="speed">
                    <FontAwesomeIcon icon={faMinus} className="minus" onClick={() => this.context.playbackSpeed('minus')} />
                    <FontAwesomeIcon icon={faPlus} className="plus" onClick={() => this.context.playbackSpeed('plus')} />
                </div>
            </div>
        );
    }
}

Playback.contextType = Context;

export default Playback;

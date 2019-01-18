import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faPlus, faMinus, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';

import { Context } from '../../../Provider.js';

class Playback extends PureComponent {
    // Playback controls at top left of timeline

    render() {
        const { playback, playbackSpeed } = this.context;
        const { playing } = this.context.state;

        // Conditional styling based on whether playback is enabled
        let pointerEvents;
        let color;
        let cursor;
        playing ? pointerEvents = 'none' : pointerEvents = 'all'
        playing ? color = 'white' : color = 'black'
        playing ? cursor = 'none' : cursor = 'pointer'
        const playingStyle = {
            pointerEvents: pointerEvents,
            color: color,
            cursor: cursor
        }

        return (
            <div className="playback-container">
                <div className="play-pause-container">
                    <FontAwesomeIcon icon={faStepBackward} style={playingStyle} className="step-backward" onClick={playing ? null : () => playback('stepbackward')} />
                    <div className="play-pause" onClick={() => this.context.playback()}>
                        {this.context.state.playing ?
                            <FontAwesomeIcon icon={faPause} className='fa-lg' />
                            : <FontAwesomeIcon icon={faPlay} className='fa-lg' />}
                    </div>
                    <FontAwesomeIcon icon={faStepForward} style={playingStyle} className="step-forward" onClick={playing ? null : () => playback('stepforward')} />
                </div>
                <div className="speed">
                    <span className="speed-label">Speed:</span>
                    <FontAwesomeIcon icon={faMinus} className="minus" onClick={() => playbackSpeed('minus')} />
                    <FontAwesomeIcon icon={faPlus} className="plus" onClick={() => playbackSpeed('plus')} />
                </div>
            </div>
        );
    }
}

// Enables access to context in component
Playback.contextType = Context;

export default Playback;

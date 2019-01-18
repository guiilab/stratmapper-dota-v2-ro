import React, { Component } from 'react';

class LoadingIcon extends Component {
    render() {

        // Loading icon for loading screen on application load
        return (
            <div className="loading-icon-container">
                <div className='loading-icon'></div>
            </div>
        );
    }
}

export default LoadingIcon;
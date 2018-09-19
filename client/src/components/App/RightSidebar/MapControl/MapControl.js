import React, { Component } from 'react';

import { Context } from '../../../Provider.js';

class MapControl extends Component {

    state = {
        hover: false,
        active: true
    }

    toggleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    toggleActive = () => {
        this.setState(prevState => ({
            active: !prevState.active
        }))
    }

    // centerMap = () => {
    //     this.props.updateMapZoomTransform()
    // }

    render() {

        let buttonStyle;
        if (this.state.hover) {
            buttonStyle = { backgroundColor: 'white' }
        } else if (this.state.active) {
            buttonStyle = { backgroundColor: 'lightgrey' }
        }

        return (
            <div className="map-control-container">
                <div className="title-container">
                    <h3>Map Control</h3>
                </div>
                <div className="map-control-options">
                    <div className="center-map-button" style={buttonStyle} onMouseOver={() => this.toggleHover()} onMouseOut={() => this.toggleHover()}>Center Map</div>
                </div>
            </div>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <MapControl {...context} {...props} />}
    </Context.Consumer>
);
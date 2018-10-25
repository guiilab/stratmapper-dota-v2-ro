import React, { Component } from 'react';

class Drag extends Component {

    state = {
        clicked: false,
        left: 0
    }

    drag = (e) => {
        this.setState({
            left: e.clientX
        })
    }

    render() {

        let offsetX;
        if (!this.props.offsetX) {
            offsetX = 0
        } else {
            offsetX = this.props.offsetX - 265
        }

        const dragStyle = {
            left: offsetX
        }

        return (
            // <div style={dragStyle} className="drag" onMouseDown={() => this.toggleClick()} onMouseUp={() => this.toggleClick()} onMouseMove={this.state.clicked ? (e) => this.drag(e) : null} onDrag={(e) => this.drag(e)}></div >
            <div style={dragStyle} className="drag" onClick={this.props.clicked ? (e) => this.drag(e) : null} ></div >
        );
    }
}

export default Drag;
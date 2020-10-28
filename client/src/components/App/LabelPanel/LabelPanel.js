import React, { Component } from 'react';

import { Context } from '../Provider.js';
import AddLabel from './AddLabel/AddLabel.js';

class LabelPanel extends Component {

  state = {
    isOpen: false
  }

  // Sets open state for the panel
  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    let width;
    let height;
    let opacity;
    let angle;
    let color;

    // Conditional style properties, based on open state
    this.state.isOpen ? width = '400px' : width = '30px';
    this.state.isOpen ? height = '170px' : height = '100px';
    this.state.isOpen ? opacity = 100 : opacity = 0;
    this.state.isOpen ? angle = '0deg' : angle = '270deg';
    this.state.isOpen ? color = 'coral' : color = 'green'

    let labelPanelStyle = {
      height: height,
      width: width
    }
    let labelHeaderStyle = {
      transform: `rotate(${angle})`
    }
    let closeButtonStyle = {
      backgroundColor: color
    }
    // Conditional rendering, based on existence of label data
    if (!this.props.state.labels) {
      return <div>loading</div>
    }
    return (
      // <div style={labelPanelStyle} className="label-panel" onClick={this.state.isOpen ? null : () => this.toggleOpen()}>
      <div style={labelPanelStyle} className="label-panel">
        {this.state.isOpen ? null : <div style={labelHeaderStyle} className="label-header">Labels</div>}
        <AddLabel isOpen={this.state.isOpen} opacity={opacity} />
        <div style={closeButtonStyle} className="close-button" onClick={() => this.toggleOpen()}>{this.state.isOpen ? 'x' : '+'}</div>
        {/* <div style={closeButtonStyle} className="close-button" onClick={() => alert('Labeling is disabled in this version of Stratmapper.')}>X</div> */}
      </div >
    )
  }
}

// Passes context to the component, which renders itself
export default () => (
  <Context.Consumer>
    {(context) => <LabelPanel {...context} />}
  </Context.Consumer>
);
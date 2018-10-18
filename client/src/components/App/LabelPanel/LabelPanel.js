import React, { Component } from 'react';

import { Context } from '../../Provider.js';
import AddLabel from './AddLabel/AddLabel.js';
import Label from './Label/Label.js';

class LabelPanel extends Component {

    state = {
        isOpen: true
    }

    componentDidMount() {
        this.props.getLoadLabels()
    }

    toggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {

        let width;
        // this.state.isOpen ? width = '400px' : width = '100px';
        let labelPanelStyle = {
            width: '400px'
        }
        if (!this.props.state.labels) {
            return <div>loading</div>
        }
        return (
            // <div style={labelPanelStyle} className="label-panel" onClick={() => this.toggleOpen()}>
            <div style={labelPanelStyle} className="label-panel">
                <AddLabel isOpen={this.state.isOpen} />
                {this.props.state.labels.map((label) => <Label label={label} key={label.id} />)}
            </div>
        )
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <LabelPanel {...context} />}
    </Context.Consumer>
);
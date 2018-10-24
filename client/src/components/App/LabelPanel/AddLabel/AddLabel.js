import React, { Component } from 'react';

import { Context } from '../../Provider.js';

class AddLabel extends Component {

    state = {
        behavior: '',
        author: '',
        description: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.getAttribute('data-label')]: e.target.value });
    }

    clearData = () => {
        this.setState({
            behavior: '',
            author: '',
            description: ''
        })
    }

    render() {
        let addLabelStyle = {
            opacity: this.props.opacity
        }

        return (
            <div style={addLabelStyle} className="add-label">
                <input className="label-input" data-label="behavior" placeholder="Behavior Type" type="text" value={this.state.behavior} onChange={(e) => this.handleChange(e)} />
                <input className="label-input" data-label="author" placeholder="Author Name" type="text" value={this.state.author} onChange={(e) => this.handleChange(e)} />
                <textarea className="label-input textarea" data-label="description" placeholder="Description" value={this.state.description} onChange={(e) => this.handleChange(e)} />
                <div className="add-label-button" onClick={() => {
                    this.props.addLabel(this.state)
                    this.clearData()
                }
                }>Add Label</div>
            </div>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <AddLabel {...context} {...props} />}
    </Context.Consumer>
);
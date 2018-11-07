import React, { PureComponent } from 'react';

import { Context } from '../../../../Provider.js'

class ContextMenu extends PureComponent {

    handleClick = (e) => {
        const response = window.confirm('Are you sure you want to delete this label?')
        if (response === true) {
            this.deleteLabel(this.props.id)
        }
    }

    deleteLabel = (id) => {
        console.log('delete label')
        return fetch('/api/delete-label', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        }).then((res) => {
            console.log(res)
            this.context.getLoadLabels()
        })
    }

    render() {
        const { toggleContextMenu } = this.props;

        let visibility = this.props.active ? 'visible' : 'hidden';
        let opacity = this.props.active ? '1' : '0';
        let posX = this.props.posX ? this.props.posX : '0px';

        let contextMenuStyle = {
            visibility: visibility,
            opacity: opacity,
            left: posX
        }
        return (
            <div style={contextMenuStyle} className="context-menu-container">
                <div onClick={toggleContextMenu} className="label-close-button">Close</div>
                <div onClick={this.handleClick} className="label-delete">Delete</div>
                <div className="label-title-container">
                    <div className="label-title">{this.props.title}</div>
                    <div className="label-author">{this.props.author}</div>
                </div>
                <div className="label-description">{this.props.description}</div>

            </div>
        );
    }
}

ContextMenu.contextType = Context;

export default ContextMenu;
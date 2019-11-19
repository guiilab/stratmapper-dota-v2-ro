import React, { PureComponent } from 'react';
import { Context } from '../../Provider.js';

import LabelOption from './LabelOption/LabelOption.js';

class LabelSelect extends PureComponent {

    // Enables access to context in component
    static contextType = Context;

    handleChange = (e) => {
        this.context.setCurrentAuthor(e.target.value)
    }

    // componentDidMount() {
    //     this.context.setCurrentAuthor('ericak')
    // }

    render() {
        const { authors } = this.context.state

        return (
            <div className="label-select-container">
                <span className="match-select-font">Label Author:</span>
                <select name="label-select" id="label-select" value={this.context.state.currentAuthor} onChange={(e) => this.handleChange(e)}>
                    {authors.map((author) => <LabelOption option={author} key={author} />)}
                </select>
            </div>
        );
    }
}

export default LabelSelect;
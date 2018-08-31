import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import TooltipElement from './TooltipElement.js';

class EventIcon extends Component {
    constructor(props) {
        super(props)

        this.state = {
            translate: `translate(${this.props.x}, ${this.props.y}), scale(.05)`
        }
    }

    componentDidMount() {
        ReactTooltip.rebuild()
    }

    changeScale = (s) => {
        this.setState({
            translate: `translate(${this.props.x}, ${this.props.y}), scale(${s})`
        })
    }

    render() {
        const { d } = this.props;

        return (
            <React.Fragment>
                {/* <foreignObject x="-375" y="-20">
                    <ReactTooltip id="tooltip" place="bottom">
                        {this.props.event.tooltip_context.map((element)=> <TooltipElement element={element} key={Math.random()}/>)}
                    </ReactTooltip>
                </foreignObject> */}
                <path
                    data-tip
                    data-for="tooltip"
                    className="icon"
                    d={d}
                    transform={this.state.translate}
                    fill="red"
                    stroke="black"
                    strokeWidth="1px"
                    onMouseEnter={() => this.changeScale(.06)}
                    onMouseLeave={() => this.changeScale(.05)}
                />
            </React.Fragment>
        );
    }
}

export default EventIcon;
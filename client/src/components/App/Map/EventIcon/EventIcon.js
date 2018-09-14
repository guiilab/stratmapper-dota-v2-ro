import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import { Context } from '../../../Provider.js';
import TooltipElement from './TooltipElement/TooltipElement.js';

class EventIcon extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hover: null,
            translate: `translate(${this.props.x}, ${this.props.y}), scale(.05)`
        }
    }

    componentDidMount() {
        ReactTooltip.rebuild()
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.hover !== nextState.hover) {
            return true;
        } else {
            return false;
        }
    }

    toggleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    changeScale = (scale) => {
        this.setState({
            translate: `translate(${this.props.x}, ${this.props.y}), scale(${scale})`
        })
    }

    render() {
        const { d, event, unit } = this.props;
        const { units, tooltips } = this.props.state;

        return (
            <React.Fragment>
                <foreignObject x="-375" y="-20">
                    <ReactTooltip id="tooltip" place="bottom">
                        {tooltips[event.event_type].map((element) => <TooltipElement event={event} elementKey={element.key} elementLabel={element.label} key={Math.random()} />)}
                    </ReactTooltip>
                </foreignObject>
                <path
                    data-tip
                    data-for="tooltip"
                    className="icon"
                    d={d}
                    transform={this.state.translate}
                    fill={units[unit].color}
                    stroke="black"
                    strokeWidth={10}
                    onMouseEnter={() => this.changeScale(.06)}
                    onMouseLeave={() => this.changeScale(.05)}
                />
            </React.Fragment>
        );
    }
}
export default (props) => (
    <Context.Consumer>
        {(context) => <EventIcon {...context} {...props} />}
    </Context.Consumer>
);
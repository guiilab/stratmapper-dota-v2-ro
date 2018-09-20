import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import { Context } from '../../../Provider.js';
import TooltipElement from './TooltipElement/TooltipElement.js';

class EventIcon extends Component {
    constructor(props) {
        super(props)

        this.state = {
            translate: null,
            zIndex: null,
            active: false
        }
    }

    componentDidMount() {
        ReactTooltip.rebuild()
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        if (nextProps.state.activeNode === nextProps.event.node_id) {
            return {
                translate: `translate(${nextProps.x}, ${nextProps.y}), scale(.06)`,
                active: true,
                zIndex: 100
            }
        }
        if (nextProps.state.activeNode !== nextProps.event.node_id) {
            return {
                translate: `translate(${nextProps.x}, ${nextProps.y}), scale(.05)`,
                zIndex: 1,
                active: false
            }
        }
        return null
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.active !== nextState.active) {
            return true;
        } else {
            return false;
        }
    }

    changeScale = (scale) => {
        this.setState({
            translate: `translate(${this.props.x}, ${this.props.y}), scale(${scale})`
        })
    }

    render() {
        const { d, event, unit, toggleActiveNode } = this.props;
        const { units, tooltips, selectedUnits } = this.props.state;


        return (
            <React.Fragment>
                {/* <foreignObject x="-375" y="-20">
                    <ReactTooltip id="tooltip" place="bottom">
                        {tooltips[event.event_type].map((element) => <TooltipElement event={event} elementKey={element.key} elementLabel={element.label} key={Math.random()} />)}
                    </ReactTooltip>
                </foreignObject> */}
                <path
                    style={{ zIndex: this.state.zIndex }}
                    data-tip
                    data-for="tooltip"
                    className="icon"
                    d={d}
                    display={this.props.state.selectedUnits.includes(unit) ? 'inherit' : 'none'}
                    transform={this.state.translate}
                    fill={units[unit].color}
                    stroke="black"
                    strokeWidth={10}
                    onMouseEnter={() => toggleActiveNode(event.node_id)}
                    onMouseLeave={() => toggleActiveNode(null)}
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
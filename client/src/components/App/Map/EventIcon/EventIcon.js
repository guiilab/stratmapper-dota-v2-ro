import React, { PureComponent } from 'react';
// import ReactTooltip from 'react-tooltip';

import { Context } from '../../Provider.js';
// import TooltipElement from './TooltipElement/TooltipElement.js';

class EventIcon extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            active: false,
            color: undefined
        }
    }

    // componentDidMount() {
    //     ReactTooltip.rebuild()
    // }

    static getDerivedStateFromProps(nextProps, nextState) {
        if (nextProps.state.activeNode) {
            if (nextProps.state.activeNode.node_id === nextProps.event.node_id) {
                return {
                    color: 'white',
                    active: true
                }
            }
            if (nextProps.state.activeNode.node_id !== nextProps.event.node_id) {
                return {
                    color: undefined,
                    active: false
                }
            }
        }
        return null
    }

    render() {
        const { d, event, unit, toggleActiveNode, zoomTransform, x, y, getUnit, setTooltipPosition } = this.props;
        const { selectedUnits } = this.props.state;

        let unitObject = getUnit(unit)

        return (
            <React.Fragment>
                <path
                    style={{ zIndex: this.state.zIndex }}
                    data-tip
                    data-for="tooltip"
                    className="icon"
                    d={d}
                    display={selectedUnits.includes(unit) ? 'inherit' : 'none'}
                    transform={zoomTransform ? `translate(${x}, ${y}) scale(${zoomTransform}) translate(-160, -160)` : `translate(${x}, ${y}) scale(.06) translate(-160, -160)`}
                    fill={this.state.color ? this.state.color : unitObject.color}
                    stroke="black"
                    strokeWidth={10}
                    onMouseOver={(e) => { toggleActiveNode(event); setTooltipPosition(e) }}
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
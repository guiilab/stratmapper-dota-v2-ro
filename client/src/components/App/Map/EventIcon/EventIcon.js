import React, { PureComponent } from 'react';

import { Context } from '../../Provider.js';

class EventIcon extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            active: false,
            color: undefined
        }
    }

    // If unit is corresponding selected, highlight icon in map
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

    // Get icon color from unit object retrieved from context
    getIconColor = () => {
        const { fill, getUnit, unit } = this.props
        let unitObject = getUnit(unit)
        if (fill) {
            return fill
        } else if (this.state.color) {
            return this.state.color
        } else if (unitObject) {
            return unitObject.color
        } else {
            return 'grey'
        }
    }

    render() {
        const { d, event, unit, toggleActiveNode, zoomTransform, x, y, setTooltipPosition } = this.props;
        const { selectedUnits } = this.props.state;

        return (
            <path
                className="icon"
                d={d}
                display={selectedUnits.includes(unit) ? 'inherit' : 'none'}
                transform={zoomTransform ? `translate(${x}, ${y}) scale(${zoomTransform}) translate(-160, -160)` : `translate(${x}, ${y}) scale(.06) translate(-160, -160)`}
                fill={this.getIconColor()}
                stroke="black"
                strokeWidth={10}
                onMouseOver={(e) => { toggleActiveNode(event); setTooltipPosition(e, event) }}
                onMouseLeave={() => toggleActiveNode(null)}
            />
        );
    }
}

// Passes context and props to the component, which renders itself
export default (props) => (
    <Context.Consumer>
        {(context) => <EventIcon {...context} {...props} />}
    </Context.Consumer>
);
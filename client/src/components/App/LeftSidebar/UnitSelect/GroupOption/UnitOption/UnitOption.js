import React, { PureComponent } from 'react';

import { Context } from '../../../../Provider.js';

class UnitOption extends PureComponent {
    state = {
        hover: false,
        active: false,
        color: null,
        units: null,
        unit: null
    }

    // If unit is selected in context, unit is activated here
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.state.selectedUnits.includes(nextProps.unit)) {
            return {
                active: true
            };
        }
        if (!nextProps.state.selectedUnits.includes(nextProps.unit)) {

            return {
                active: false
            };
        }
        return null;
    }

    toggleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    toggleActive = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render() {
        const { unit, toggleSelectedUnit, getUnit, formatFirstString } = this.props;

        // Conditional button style, based on hover and active state
        let buttonStyle;

        // Get unitobject data from context
        let unitObject = getUnit(unit);

        if (this.state.hover) {
            buttonStyle = {
                boxShadow: "0px 0px 1px black",
                backgroundColor: unitObject.color,
            }
        } else if (this.state.active) {
            buttonStyle = {
                backgroundColor: unitObject.color,
            }
        }
        else {
            buttonStyle = {
                backgroundColor: "grey"
            }
        }

        return (
            <div
                className='unit-option'
                style={buttonStyle}
                key={unit}
                onMouseEnter={() => this.toggleHover()}
                onMouseLeave={() => this.toggleHover()}
                onClick={() => { this.toggleActive(); toggleSelectedUnit(unit); }} >{formatFirstString(unit)}
            </div>
        )
    }
}

// Passes context and props to the component, which renders itself
export default (props) => (
    <Context.Consumer>
        {(context) => <UnitOption {...context} {...props} />}
    </Context.Consumer>
);
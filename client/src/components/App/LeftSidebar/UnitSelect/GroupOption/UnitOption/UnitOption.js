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

        let buttonStyle;
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

export default (props) => (
    <Context.Consumer>
        {(context) => <UnitOption {...context} {...props} />}
    </Context.Consumer>
);
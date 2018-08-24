import React, { Component } from 'react';

import { Context } from './Provider.js'
import UnitEvent from './UnitEvent.js';
import Background from '../img/dotaminimap_7.jpg';

var mapDivStyle = {
    backgroundImage: "url(" + Background + ")"
};

class Map extends Component {


    testFunction = () => {
        alert('yes')
    }

    render() {

        const { xScale, yScale } = this.props;
        const { unitEventsAll } = this.props.state;

        const d = "M299.09,41.2C299,39.74,298.38,30.75,297,29c-4.08-5-29.63,1.08-34.87,1.61-9.42,1-16.38,1.49-45.32-3.83A171.05,171.05,0,0,1,175,13.36C165.3,8.7,156.55,3.74,150.54.65H150c-6,3.09-14.76,8-24.5,12.71A171.19,171.19,0,0,1,83.81,26.79c-28.94,5.32-35.9,4.79-45.33,3.83C33.25,30.09,7.7,24,3.61,29c-1.41,1.74-2,10.73-2.12,12.19-1,10.95-1.55,31-1.16,40.08,1.23,29-.5,14.59,1.9,41.65C4,142.3,8.77,163.33,20.34,189c14.1,31.31,33.21,50.13,44.08,60.63A213.88,213.88,0,0,0,149.53,300H151a213.9,213.9,0,0,0,85.12-50.34c10.87-10.5,30-29.32,44.08-60.63,11.57-25.7,16.39-46.73,18.11-66.1,2.4-27.06.67-12.69,1.9-41.65C300.64,72.19,300.06,52.15,299.09,41.2ZM186.63,170.4l20.91,30.67-29.86-8.82,4.62,43.4L149.63,191.4l-51.92,40L119,185l-32,3.42,22.09-21.23L62.19,152.93,109.49,142,78.55,105.74,129,122.83l2.37-60.09,24.74,54.1L217.82,80l-36.72,45.7,34.39-8.31L191.7,145.84l46.69,26.72Z"

        return (
            <div className="map-container" style={mapDivStyle}>
                <svg className="map-svg" width="800" height="800">
                    <g className="unit-events-group">
                        {unitEventsAll.map(event => {
                            return (
                                <UnitEvent x={xScale(event.x)} y={yScale(event.y)} d={d} key={Math.random()} />
                            )
                        })}
                    </g>
                </svg>
            </div >
        );
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <Map {...context} />}
    </Context.Consumer>
);
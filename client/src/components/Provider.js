import React, { Component, createContext } from 'react';
import * as d3 from 'd3';
// import _ from 'lodash';

export const Context = createContext();

class Provider extends Component {
    state = {
        matchId: 4321,
        apiMatchId: 2500623971,
        mapSettings: {
            width: null,
            height: null,
            padding: null
        },
        coordinates: {
            x: {
                min: null,
                max: null
            },
            y: {
                min: null,
                max: null
            }
        },
        timeMax: null,
        play: {
            playhead: 0,
            playButtonActive: false,
            playSpeed: 100
        },
        mapLoading: false,
        events: {
            all: [],
            categories: []
        },
        units: [],
        groups: [],
        selectedUnits: [],
        selectedEvents: [],
        brushRange: []
    };

    orderData = (a, b) => {
        if (a.timestamp < b.timestamp)
            return -1;
        if (a.timestamp > b.timestamp)
            return 1;
        return 0;
    }

    xScale = (x) => {
        const scale = d3.scaleLinear()
            .domain([this.state.x.min, this.state.x.max])
            .range([this.state.mapSettings.padding, (this.state.mapSettings.width - this.state.mapSettings.padding * 2)])
        return scale(x);
    }

    yScale = (y) => {
        const scale = d3.scaleLinear()
            .domain([this.state.y.min, this.state.y.max])
            .range([this.state.mapSettings.height - this.state.mapSettings.padding, this.state.mapSettings.padding])
        return scale(y)
    }

    setGroupState = (d, u) => {
        this.setState({
            [d]: u
        })
    }

    render() {
        return (
            <Context.Provider value={{
                state: this.state,

                getMatchData: async () => {
                    this.setState({
                        mapLoading: true
                    })
                    const response = await fetch('/api/matches', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            matchId: this.state.matchId
                        })
                    });
                    const body = await response.json();

                    if (response.status !== 200) {
                        throw Error(body.message)
                    }
                    return body;
                },

                getEvents: async () => {
                    this.setState({
                        mapLoading: true
                    })
                    const response = await fetch('/api/events', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            unit: this.state.unitsAll
                        })
                    });
                    const body = await response.json();

                    if (response.status !== 200) {
                        throw Error(body.message)
                    }
                    return body;
                },

                loadMatchData: (data) => {
                    this.setState({
                        coordinates: {
                            x: {
                                min: data[0].coordinates.x.min,
                                max: data[0].coordinates.x.max
                            },
                            y: {
                                min: data[0].coordinates.y.min,
                                max: data[0].coordinates.y.max
                            }
                        },
                        groups: [...Object.keys(data[0].units.groups)],
                        events: {
                            all: [...data[0].events.all],
                            categories: [...Object.keys(data[0].events.categories)]
                        },
                        mapLoading: false
                    }, () => {
                        this.state.groups.forEach((d, i) => this.setGroupState(d, data[0].units.groups[d]))
                        // data[0].units.all.forEach((d, i) => this.setUnitState(d))
                    })
                },

                toggleSelectedEvent: (event) => {
                    if (this.state.selectedEvents.includes(event)) {
                        const array = [...this.state.selectedEvents];
                        const index = array.indexOf(event);
                        array.splice(index, 1);
                        this.setState({
                            selectedEvents: array
                        })
                    } else {
                        this.setState(prevState => ({
                            selectedEvents: [...prevState.selectedEvents, event]
                        }))
                    }
                },

                toggleSelectedUnit: (unit) => {
                    if (this.state.selectedUnits.includes(unit)) {
                        const array = [...this.state.selectedUnits];
                        const index = array.indexOf(unit);
                        array.splice(index, 1);
                        this.setState({
                            selectedUnits: array
                        })
                    } else {
                        this.setState(prevState => ({
                            selectedUnits: [...prevState.selectedUnits, unit]
                        }))
                    }
                },

                toggleSelectedGroup: (units, boolean) => {
                    // if (boolean === true) {

                    // }
                    // units.forEach((unit) => this.toggleSelectedUnitFunction(unit))
                    // const duplicates = units.filter(unit => !this.state.selectedUnits.includes(unit));
                    // const unique = units.filter(unit => !this.state.selectedUnits.includes(unit))
                    // console.log(duplicates)
                    // // if (duplicates) {

                    // // }
                    // this.setState(prevState => ({
                    //     selectedUnits: [...prevState.selectedUnits, ...unique]
                    // }), () => console.log(`selected units statge: ${this.state.selectedUnits}`))
                }
            }
            }>
                {this.props.children}
            </Context.Provider >
        )
    }
}

export default Provider;
import React, { Component, createContext } from 'react';
import * as d3 from 'd3';

export const Context = createContext();

class Provider extends Component {
    state = {
        matchId: 4321,
        apiMatchId: 2500623971,
        mapSettings: {
            width: 800,
            height: 800,
            padding: 500
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
        unitEventsAll: [],
        unitEventsFiltered: [],
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

    componentDidUpdate(nextProps, prevState) {
        if (
            (this.state.selectedUnits !== prevState.selectedUnits) ||
            (this.state.selectedEvents !== prevState.selectedEvents)
        ) {
            this
                .getEvents()
                .then(res => this.loadEvents(res))
        }
    }

    getEvents = async () => {
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
                unit: this.state.selectedUnits,
                event_type: this.state.selectedEvents
            })
        });
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    }

    loadEvents = (data) => {
        this.setState({
            unitEventsAll: [...data]
        }, () => console.log(this.state.unitEventsAll))
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

                loadMatchData: (data) => {
                    // console.log(data[0])
                    this.setState({
                        // matchId: data[0].match_id,
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
                },

                getXScale: () => {
                    return d3.scaleLinear()
                        .domain([this.state.coordinates.x.min, this.state.coordinates.x.max])
                        .range([0, this.state.mapSettings.width])
                },

                getYScale: () => {
                    return d3.scaleLinear()
                        .domain([this.state.coordinates.y.min, this.state.coordinates.y.max])
                        .range([this.state.mapSettings.height, 0])
                },

                xScale: (x) => {
                    const scale = d3.scaleLinear()
                        .domain([this.state.coordinates.x.min, this.state.coordinates.x.max])
                        .range([0, this.state.mapSettings.width])
                    return scale(x)
                },

                yScale: (y) => {
                    const scale = d3.scaleLinear()
                        .domain([this.state.coordinates.y.min, this.state.coordinates.y.max])
                        .range([this.state.mapSettings.height, 0])
                    return scale(y)
                },

                formatHeroString(string) {
                    string = string.replace(/hero/g, "")
                    string = string.charAt(0).toUpperCase() + string.slice(1);
                    return string;
                },

                formatEventString(string) {
                    string = string.replace(/_/g, " ");
                    return string
                        .toLowerCase()
                        .split(' ')
                        .map(function (word) {
                            return word[0].toUpperCase() + word.substr(1);
                        })
                        .join(' ');
                }
            }
            }>
                {this.props.children}
            </Context.Provider >
        )
    }
}

export default Provider;
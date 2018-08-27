import React, { Component, createContext } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

export const Context = createContext();

class Provider extends Component {
    state = {
        matchId: 4321,
        apiMatchId: 2500623971,
        mapSettings: {
            width: 800,
            height: 800,
            padding: 50
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
        brushRange: [],
        icons: {
            damage_delivered: "M299.09,41.2C299,39.74,298.38,30.75,297,29c-4.08-5-29.63,1.08-34.87,1.61-9.42,1-16.38,1.49-45.32-3.83A171.05,171.05,0,0,1,175,13.36C165.3,8.7,156.55,3.74,150.54.65H150c-6,3.09-14.76,8-24.5,12.71A171.19,171.19,0,0,1,83.81,26.79c-28.94,5.32-35.9,4.79-45.33,3.83C33.25,30.09,7.7,24,3.61,29c-1.41,1.74-2,10.73-2.12,12.19-1,10.95-1.55,31-1.16,40.08,1.23,29-.5,14.59,1.9,41.65C4,142.3,8.77,163.33,20.34,189c14.1,31.31,33.21,50.13,44.08,60.63A213.88,213.88,0,0,0,149.53,300H151a213.9,213.9,0,0,0,85.12-50.34c10.87-10.5,30-29.32,44.08-60.63,11.57-25.7,16.39-46.73,18.11-66.1,2.4-27.06.67-12.69,1.9-41.65C300.64,72.19,300.06,52.15,299.09,41.2ZM186.63,170.4l20.91,30.67-29.86-8.82,4.62,43.4L149.63,191.4l-51.92,40L119,185l-32,3.42,22.09-21.23L62.19,152.93,109.49,142,78.55,105.74,129,122.83l2.37-60.09,24.74,54.1L217.82,80l-36.72,45.7,34.39-8.31L191.7,145.84l46.69,26.72Z"
        }
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


    setGroupState = (d, unit) => {
        this.setState({
            [d]: unit
        })
    }

    setIconState = (event, icon) => {
        this.setState(_.set(this.state.icons, event, icon))
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
                        this.setIconState('damage_delivered', 12345)
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
import React, { Component, createContext } from 'react';
import * as d3 from 'd3';

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
        units: {
            all: [],
            groups: []
        },
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
                            unit: this.state.units.all
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
                        // },
                        units: {
                            all: [...data[0].units.all],
                            groups: [...Object.keys(data[0].units.groups)]
                        },
                        events: {
                            all: [...data[0].events.all],
                            categories: [...Object.keys(data[0].events.categories)]
                        },
                        mapLoading: false
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

                getXScale: () => {
                    return d3.scaleLinear()
                        .domain([this.state.xMin, this.state.xMax])
                        .range([this.state.settings.padding, (this.state.settings.width - this.state.settings.padding * 2)])
                },

                getYScale: () => {
                    return d3.scaleLinear()
                        .domain([this.state.yMin, this.state.yMax])
                        .range([this.state.settings.padding, (this.state.settings.width - this.state.settings.padding * 2)])
                },

                xScale: (x) => {
                    const scale = d3.scaleLinear()
                        .domain([this.state.xMin, this.state.xMax])
                        .range([this.state.settings.padding, (this.state.settings.width - this.state.settings.padding * 2)])
                    return scale(x);
                },

                yScale: (y) => {
                    const scale = d3.scaleLinear()
                        .domain([this.state.yMin, this.state.yMax])
                        .range([(this.state.settings.height - this.state.settings.padding), this.state.settings.padding])
                    return scale(y)
                },

                updatePlayhead: (e) => {
                    const redPosX = this.xScale(this.state.redData[e].posX);
                    const redPosY = this.yScale(this.state.redData[e].posY);
                    const bluePosX = this.xScale(this.state.blueData[e].posX);
                    const bluePosY = this.yScale(this.state.blueData[e].posY);
                    this.setState({
                        playhead: e,
                        playerCoordinates: {
                            red: [redPosX, redPosY],
                            blue: [bluePosX, bluePosY]
                        }
                    })
                },

                updateRange: (e) => {
                    this.setState({
                        range: e
                    })
                },

                togglePlay: () => {
                    this.setState(prevState => ({
                        playButtonActive: !prevState.playButtonActive
                    }), () => {
                        if (this.state.playButtonActive) {
                            this.playButton(this.state.timeMaxHalf - this.state.playhead)
                        }
                    })
                },

                updateSpeed: (e) => {
                    this.setState({
                        playSpeed: e
                    })
                },

                scaleSpeed: (x) => {
                    const scale = d3.scaleLinear()
                        .domain([0, 500])
                        .range([500, 0])
                    return scale(x)
                },
                test: function () {
                    alert('working')
                }
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default Provider;
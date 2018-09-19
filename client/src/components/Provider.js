import React, { Component, createContext } from 'react';
import * as d3 from 'd3';

export const Context = createContext();

class Provider extends Component {
    state = {
        apiMatchId: 2500623971,
        brushRange: [],
        windowSettings: {
            width: null,
            height: null
        },
        mapSettings: {
            width: 1000,
            height: 1000,
            padding: 50
        },
        coordinateRange: {
            x: {
                min: null,
                max: null
            },
            y: {
                min: null,
                max: null
            }
        },
        matchId: 43210,
        timeMax: null,
        play: {
            playhead: 0,
            playButtonActive: false,
            playSpeed: 100
        },
        mapLoading: false,
        unitEventsAll: [],
        unitEventsStatus: [],
        events: {
            all: [],
            categories: []
        },
        units: null,
        unitsAll: null,
        groups: [],
        selectedUnits: [],
        selectedEvents: [],
        icons: {},
        tooltips: {},
        activeNode: null,
        statusEventsFilteredByUnit: {}
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    compare = (a, b) => {
        if (a.timestamp < b.timestamp)
            return -1;
        if (a.timestamp > b.timestamp)
            return 1;
        return 0;
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
                unit: this.state.unitsAll,
                event_type: this.state.events.all
            })
        });
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body.sort(this.compare)
    }

    loadEvents = (data) => {
        let unitEventsTimeline = [];
        let unitEventsStatus = []
        data.forEach((d) => {
            if (d.event_type === "status_update") {
                unitEventsStatus.push(d)
            } else {
                unitEventsTimeline.push(d)
            }
        })
        this.setState({
            // unitEventsAll: [...data],
            unitEventsTimeline: [...unitEventsTimeline],
            unitEventsStatus: [...unitEventsStatus],
            selectedUnits: [...this.state.unitsAll],
            selectedEvents: [...this.state.events.all]
        }, () => {
            this.state.selectedUnits.forEach((unit) => this.setFilteredEventsByUnit(unit, this.state.unitEventsStatus))
            this.setState({
                mapLoading: false
            })
        }
        )
    }

    setGroupState = (d, unit) => {
        this.setState({
            [d]: unit
        })
    }

    setIconState = (event, icon) => {
        this.setState(prevState => ({
            icons: { ...prevState.icons, [event]: icon },
        }))
    }

    setUnitState = (event, icon) => {
        this.setState(prevState => ({
            units: { ...prevState.units, [event]: icon },
        }))
    }

    setFilteredEventsByUnit = (unit, events) => {
        let filteredEvents = events.filter((event) => event.unit === unit)
        this.setState(prevState => ({
            statusEventsFilteredByUnit: { ...prevState.statusEventsFilteredByUnit, [unit]: [...filteredEvents] },
        }))
    }

    setTooltipsState = (event, array) => {
        this.setState(prevState => ({
            tooltips: { ...prevState.tooltips, [event]: array },
        }))
    }

    updateWindowDimensions = () => {
        this.setState({
            windowSettings: {
                height: window.innerHeight,
                width: window.innerWidth
            }
        })
    }

    removeSelectedUnits = (original, remove) => {
        return original.filter(value => !remove.includes(value));
    };

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
                    this.setState({
                        coordinateRange: {
                            x: {
                                min: data[0].coordinate_range.x.min,
                                max: data[0].coordinate_range.x.max
                            },
                            y: {
                                min: data[0].coordinate_range.y.min,
                                max: data[0].coordinate_range.y.max
                            }
                        },
                        groups: [...Object.keys(data[0].groups)],
                        red: [...data[0].groups.red],
                        blue: [...data[0].groups.blue],
                        events: {
                            all: [...data[0].events.all],
                            timeline: [...data[0].events.timeline],
                            details: [...Object.keys(data[0].events.details)]
                        },
                        units: { ...data[0].units },
                        unitsAll: [...Object.keys(data[0].units)],
                        timestampRange: {
                            start: data[0].timestamp_range.start,
                            end: data[0].timestamp_range.end
                        },
                        mapLoading: false
                    }, () => {
                        // this.state.groups.forEach((d, i) => this.setGroupState(d, data[0].groups[d]))
                        this.state.events.details.forEach((event) => this.setIconState(event, data[0].events.details[event].icon))
                        this.state.events.details.forEach((event) => this.setTooltipsState(event, data[0].events.details[event].tooltip_context))
                        this.getEvents().then(res => this.loadEvents(res))
                    })
                },

                toggleUnitActive: (event) => {
                    alert(event)
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

                toggleGroup: (groupUnits) => {
                    let newUnits = groupUnits.filter(unit => !this.state.selectedUnits.includes(unit))
                    if (newUnits.length === 0) {
                        let array = this.removeSelectedUnits(this.state.selectedUnits, groupUnits)
                        this.setState({
                            selectedUnits: array
                        })
                    } else {
                        this.setState(prevState => ({
                            selectedUnits: [...prevState.selectedUnits, ...newUnits]
                        }))
                    }
                },

                getXScale: () => {
                    return d3.scaleLinear()
                        .domain([this.state.coordinateRange.x.min, this.state.coordinateRange.x.max])
                        .range([0, this.state.mapSettings.width])
                },

                getYScale: () => {
                    return d3.scaleLinear()
                        .domain([this.state.coordinateRange.y.min, this.state.coordinateRange.y.max])
                        .range([this.state.mapSettings.height, 0])
                },

                xScale: (x) => {
                    const scale = d3.scaleLinear()
                        .domain([this.state.coordinateRange.x.min, this.state.coordinateRange.x.max])
                        .range([0, this.state.mapSettings.width])
                    return scale(x)
                },

                yScale: (y) => {
                    const scale = d3.scaleLinear()
                        .domain([this.state.coordinateRange.y.min, this.state.coordinateRange.y.max])
                        .range([this.state.mapSettings.height, 0])
                    return scale(y)
                },

                getXScaleTime: () => {
                    return d3.scaleLinear()
                        .domain([this.state.timestampRange.start, this.state.timestampRange.end])
                        .range([this.state.mapSettings.height, 0])
                },

                yScaleTime: (y) => {
                    const scale = d3.scaleLinear()
                        .domain([0, this.state.events.timeline.length - 1])
                        .range([20, 380])
                    return scale(y)
                },

                updateBrushRange: (e) => {
                    this.setState({
                        brushRange: e
                    })
                },

                toggleActiveNode: (id) => {
                    this.setState({
                        activeNode: id
                    })
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
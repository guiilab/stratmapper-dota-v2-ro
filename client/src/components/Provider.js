import React, { Component, createContext } from 'react';
import * as d3 from 'd3';

export const Context = createContext();

class Provider extends Component {
    state = {
        matches: [],
        currentMatch: '3_ESP',
        apiMatchId: 2500623971,
        brushRange: [],
        windowSettings: {
            width: null,
            height: null
        },
        mapSettings: {
            width: null,
            height: null
        },
        timelineSettings: {
            height: 250
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
        matchId: null,
        timeMax: null,
        play: {
            playhead: 0,
            playButtonActive: false,
            playSpeed: 100
        },
        mapLoading: false,
        unitEventsStatus: [],
        events: {
            allTypes: [],
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
        statusEventsFilteredByUnit: {},
        brushActive: false
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
                matchId: this.state.currentMatch,
                unit: this.state.unitsAll,
                event_type: this.state.events.allTypes
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
        let unitEventsStatus = [];
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
            selectedEvents: [...this.state.events.allTypes]
        }, () => {
            this.state.selectedUnits.forEach((unit) => this.setFilteredEventsByUnit(unit, this.state.unitEventsStatus))
            this.setState({
                mapLoading: false
            })
        }
        )
    }

    setGroupState = (d, unit) => {
        this.setState(prevState => ({
            [d]: [...prevState[d], unit]
        }))
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

                getMatchEntries: async () => {
                    const response = await fetch('/api/matchentries', {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    });
                    const body = await response.json();

                    if (response.status !== 200) {
                        throw Error(body.message)
                    }
                    let matches = [];
                    body.forEach((match) => matches.push(match.file_name))
                    this.setState({
                        matches: [...matches]
                    }, () => this.setState({
                        //change this when amount of matches changes, andy
                        currentMatch: this.state.matches[11]
                    }))
                },

                getMatchData: async (match) => {
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
                            matchId: match
                        })
                    });
                    const body = await response.json();

                    if (response.status !== 200) {
                        throw Error(body.message)
                    }
                    return body;
                },

                loadMatchData: (data) => {
                    let unitsAll = [];
                    let groups = [];
                    data[0].units.forEach((d) => {
                        unitsAll.push(d.name)
                        if (!groups.includes(d.group)) {
                            groups.push(d.group)
                        }
                    })
                    let eventsAllTypes = [];
                    let eventsTimeline = [];
                    let eventsStatus = [];
                    let eventsMap = [];
                    data[0].events.forEach((d) => {
                        if (!eventsAllTypes.includes(d.event_type)) {
                            eventsAllTypes.push(d.event_type)
                        }
                        if (d.timeline === true) {
                            eventsTimeline.push(d.event_type)
                        }
                        if (d.status === true) {
                            eventsStatus.push(d.event_type)
                        }
                    })
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
                        groups: [...groups],
                        // red: [...data[0].groups.red],
                        // blue: [...data[0].groups.blue],
                        red: [],
                        blue: [],
                        events: {
                            all: [...data[0].events],
                            allTypes: [...eventsAllTypes],
                            timeline: [...eventsTimeline],
                            status: [...eventsStatus]
                        },
                        units: [...data[0].units],
                        unitsAll: [...unitsAll],
                        timestampRange: {
                            start: data[0].timestamp_range.start,
                            end: data[0].timestamp_range.end
                        },
                        matchId: data[0].match_id,
                        mapSettings: {
                            width: data[0].map.map_width,
                            height: data[0].map.map_height
                        },
                        mapLoading: false
                    }, () => {
                        this.state.groups.forEach((d, i) => {
                            data[0].units.forEach((e) => {
                                if (e.group === d) {
                                    this.setGroupState(d, e.name)
                                }
                            })
                        })
                        this.state.events.all.forEach((event) => {
                            this.setIconState(event.event_type, event.icon)
                        })
                        this.state.events.all.forEach((event) => this.setTooltipsState(event.event_type, event.tooltip_context))
                        this.getEvents().then(res => this.loadEvents(res))
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
                        .range([14, this.state.timelineSettings.height - 12])
                    return scale(y)
                },

                updateBrushRange: (e) => {
                    this.setState({
                        brushRange: e
                    })
                },

                toggleActiveNode: (node) => {
                    this.setState({
                        activeNode: node
                    })
                },

                toggleBrushActive: (e) => {
                    if (e.shiftKey) {
                        this.setState({
                            brushActive: !this.state.brushActive
                        })
                    }
                    if (e === 'toggle') {
                        this.setState({
                            brushActive: !this.state.brushActive
                        })
                    }
                },

                //disable brush before match changes to destroy map data
                setCurrentMatch: (e) => {
                    this.setState({
                        brushActive: false,
                        currentMatch: e
                    })
                },

                getUnit: (unit) => {
                    let unitObject;
                    this.state.units.forEach((d) => {
                        if (d.name === unit) {
                            unitObject = d
                        }
                    })
                    return unitObject
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
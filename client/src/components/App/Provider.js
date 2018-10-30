import React, { Component, createContext } from 'react';
import * as d3 from 'd3';

export const Context = createContext();

class Provider extends Component {
    state = {
        matches: [],
        currentMatch: 'early-game',
        apiMatchId: 2500623971,
        brushRange: [676, 690],
        brushActive: false,
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
        play: {
            playhead: 0,
            playButtonActive: false,
            playSpeed: 100
        },
        events: {
            allTypes: [],
            categories: []
        },
        units: null,
        unitsAll: null,
        groups: [],
        selectedUnits: [],
        selectedEventTypes: [],
        icons: {},
        tooltips: {},
        activeNode: null,
        statusEventsFilteredByUnit: {},
        minFactor: .93,
        maxFactor: 1.04,
        mapPaddingY: 120,
        mapPaddingX: 80,
        labels: null
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);

        this.getMatchEntries().then(this.loadNewData())
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextState.currentMatch !== this.state.currentMatch) {
            this.loadNewData()
        }
        // if ((nextState.selectedUnits !== this.state.selectedUnits) || (nextState.selectedEventTypes !== this.state.selectedEventTypes || ((nextState.brushRange !== this.state.brushRange) && nextState.brushRange.length !== 0))) {
        //     let unitEventsFiltered = this.filterEvents()
        //     this.setState({
        //         unitEventsFiltered: unitEventsFiltered
        //     })
        // }
        // if ((nextState.brushRange !== this.state.brushRange) && nextState.brushRange.length !== 0) {
        //     this.filterEvents()
        // }

    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    loadNewData = () => {
        this.getMatchData(this.state.currentMatch)
            .then(res => this.loadMatchData(res))
    }

    getMatchEntries = async () => {
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
        matches.sort(function (a, b) {
            return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
        });
        this.setState({
            matches: [...matches],
            currentMatch: matches[0]
        })
    }

    getMatchData = async (match) => {
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
    }

    loadMatchData = (data) => {
        let unitsAll = [];
        let groups = [];
        data[0].units.forEach((d) => {
            unitsAll.push(d.name)
        })
        data[0].groups.forEach((d) => {
            groups.push(d.name)
        })
        let eventsAllTypes = [];
        let eventsTimeline = [];
        let eventsTimelineObj = [];
        let eventsStatus = [];
        data[0].events.forEach((d) => {
            if (!eventsAllTypes.includes(d.event_type)) {
                eventsAllTypes.push(d.event_type)
            }
            if (d.timeline === true) {
                eventsTimeline.push(d.event_type)
                eventsTimelineObj.push(d)
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
            groups: [...data[0].groups],
            red: [],
            blue: [],
            dire: [],
            radiant: [],
            loadSettings: data[0].load_settings,
            events: {
                all: [...data[0].events],
                allTypes: [...eventsAllTypes],
                timeline: [...eventsTimeline],
                timelineObj: [...eventsTimelineObj],
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
            }
        }, () => {
            this.state.groups.forEach((d, i) => {
                data[0].units.forEach((e) => {
                    if (e.group === d.name) {
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
    }

    getEvents = async () => {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                matchId: this.state.currentMatch,
                unit: this.state.unitsAll,
                event_type: this.state.events.allTypes,
                timestampRange: this.state.timestampRange
            })
        });
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body.sort(this.compareTime)
    }

    loadEvents = (data) => {
        let unitEventsTimeline = [];
        data.forEach((d) => {
            if (this.state.events.timeline.includes(d.event_type)) {
                unitEventsTimeline.push(d)
            }
        })
        this.setState({
            unitEventsAll: [...data],
            unitEventsTimeline: [...unitEventsTimeline],
            selectedUnits: [...this.state.loadSettings.selected_units],
            selectedEventTypes: [...this.state.loadSettings.selected_events]
        }, () => {
            this.state.selectedUnits.forEach((unit) => this.setFilteredEventsByUnit(unit, this.state.unitEventsAll))
            let unitEventsFiltered = this.filterEvents()
            this.setState({
                unitEventsFiltered: unitEventsFiltered,
            }, () => {
                this.props.toggleMapLoading()
            })
        }
        )
    }

    filterEvents = () => {
        if (this.state.brushRange.length === 0) {
            console.log(this.state)
            let unitEvents = this.state.unitEventsTimeline.filter(event => this.state.selectedUnits.includes(event.unit))
            return unitEvents.filter(event => (this.state.selectedEventTypes.includes(event.event_type)))
        }
        else if (this.state.brushRange.length !== 0) {
            let unitEventsBrushed = this.state.unitEventsTimeline.filter(event => (event.timestamp > this.state.brushRange[0]) && (event.timestamp < this.state.brushRange[1]))
            let unitEventsFiltered = unitEventsBrushed.filter(event => (this.state.selectedUnits.includes(event.unit)))
            return unitEventsFiltered.filter(event => (this.state.selectedEventTypes.includes(event.event_type)))
        }
    }

    getLabels = async () => {
        const response = await fetch('/api/labels', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: 'andy'
            })
        });
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body
    }

    loadLabels = (data) => {
        this.setState({
            labels: [...data]
        })
    }

    setGroupState = (d, unit) => {
        this.setState(prevState => ({
            [d.name]: [...prevState[d.name], unit]
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
    }

    compareTime = (a, b) => {
        if (a.timestamp < b.timestamp)
            return -1;
        if (a.timestamp > b.timestamp)
            return 1;
        return 0;
    }

    render() {
        return (
            <Context.Provider value={{
                state: this.state,

                // filterEvents: () => {
                //     let unitEventsFiltered = this.filterEvents()
                //     this.setState({
                //         unitEventsFiltered: unitEventsFiltered
                //     })
                // },

                toggleSelectedEvent: (event) => {
                    if (this.state.selectedEventTypes.includes(event)) {
                        const array = [...this.state.selectedEventTypes];
                        const index = array.indexOf(event);
                        array.splice(index, 1);
                        this.setState({
                            selectedEventTypes: array
                        })
                    } else {
                        this.setState(prevState => ({
                            selectedEventTypes: [...prevState.selectedEventTypes, event]
                        }))
                    }
                },

                getLoadLabels: () => {
                    this.getLabels().then(res => this.loadLabels(res))
                },

                addLabel: (label) => {
                    return fetch('api/add-label', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: Math.floor(Math.random() * 1000000000),
                            behavior: label.behavior,
                            author: 'andy',
                            description: label.description,
                            events: this.state.selectedEventTypes,
                            units: this.state.selectedUnits,
                            event_ids: [1, 2, 3, 4, 5, 6]
                        })
                    }).then(this.getLabels().then(res => this.loadLabels(res)))
                },

                deleteLabel: (id) => {
                    return fetch('api/delete-label', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: id
                        })
                    }).then(this.getLabels().then(res => this.loadLabels(res)))
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

                xScale: (x) => {
                    const scale = d3.scaleLinear()
                        .domain([this.state.coordinateRange.x.min, this.state.coordinateRange.x.max])
                        .range([this.state.mapPaddingX, this.state.windowSettings.width - this.state.mapPaddingX])
                    return scale(x)
                },

                yScale: (y) => {
                    const scale = d3.scaleLinear()
                        .domain([this.state.coordinateRange.y.min, this.state.coordinateRange.y.max])
                        .range([this.state.windowSettings.width - this.state.mapPaddingY, this.state.mapPaddingY])
                    return scale(y)
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
                            // brushRange: [],
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
                    }, () => this.props.toggleMapLoading())
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

                formatFirstString(string) {
                    string = string.replace(/_/g, " ")
                    string = string.replace(/npcdota/g, "")
                    string = string.replace(/hero/g, "")
                    string = string.charAt(0).toUpperCase() + string.slice(1);
                    return string;
                },
            }
            } >
                {this.props.children}
            </ Context.Provider >
        )
    }
}

export default Provider;
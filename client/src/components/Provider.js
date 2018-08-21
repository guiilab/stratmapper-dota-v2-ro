import React, { Component, createContext } from 'react';
import * as d3 from 'd3';

export const Context = createContext();

class Provider extends Component {
    state = {
        data: [],
        mapSettings: {
            width: null,
            height: null,
            padding: null
        },
        x: {
            min: null,
            max: null
        },
        y: {
            min: null,
            max: null
        },
        timeMax: null,
        play: {
            playhead: 0,
            playButtonActive: false,
            playSpeed: 100
        },
        mapLoading: false,
        range: [],
        units: ["herokunka", "heroluna"]
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
                            unit: this.state.units
                        })
                    });
                    const body = await response.json();

                    if (response.status !== 200) {
                        throw Error(body.message)
                    }
                    return body;
                },

                loadData: (data) => {
                    let orderedData = data.sort(this.orderData)
                    let redData = orderedData.filter(d => d.playerID === 'Red');
                    let blueData = orderedData.filter(d => d.playerID === 'Blue')

                    //getMinMax
                    let xMin = d3.min(orderedData, (d) => d.posX);
                    let xMax = d3.max(orderedData, (d) => d.posX);
                    let yMin = d3.min(orderedData, (d) => d.posY);
                    let yMax = d3.max(orderedData, (d) => d.posY);
                    let timeMax = orderedData.length;

                    let timeMaxHalf = Math.floor(orderedData.length / 2 - 1.5);

                    this.setState({
                        data: orderedData,
                        redData: redData,
                        blueData: blueData,
                        xMin: xMin,
                        xMax: xMax,
                        yMin: yMin,
                        yMax: yMax,
                        timeMax: timeMax,
                        timeMaxHalf: timeMaxHalf,
                        range: [0, timeMax],
                        mapLoading: false
                    }, () => this.updatePlayhead(this.state.playhead))
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
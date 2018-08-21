import React, { Component } from 'react';

import Provider from './Provider.js'
import App from './App.js'

class AppWrapper extends Component {
    render() {
        return (
            <Provider>
                <App />
            </Provider>
        )
    }
}

export default AppWrapper;
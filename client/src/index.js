import React from 'react';
import ReactDOM from 'react-dom';

import Provider from './components/Provider.js'
import App from './components/App/App.js'
import './css/index.css';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider>
        <App />
    </Provider>, 
    document.getElementById('root'));
// registerServiceWorker();

import React, { PureComponent } from 'react';

import Provider from './Provider.js';
import LoadingIcon from './LoadingIcon/LoadingIcon.js';
import Map from './Map/Map.js';
import LeftSidebar from './LeftSidebar/LeftSidebar.js';
import LabelPanel from './LabelPanel/LabelPanel.js';
import Timeline from './Timeline/Timeline.js';
import Tooltip from './Tooltip/Tooltip.js';

class App extends PureComponent {

    state = {
        mapLoading: true
    }

    toggleMapLoading = () => {
        this.setState({
            mapLoading: !this.state.mapLoading
        })
    }

    render() {
        return (
            <div className="app-container">
                <Provider toggleMapLoading={this.toggleMapLoading}>
                    {this.state.mapLoading ? <LoadingIcon /> :
                        <React.Fragment>
                            <Map />
                            <LeftSidebar />
                            <LabelPanel />
                            <Timeline />
                            <Tooltip />
                        </React.Fragment>
                    }
                </Provider>
            </div>
        );
    }
}

export default App;
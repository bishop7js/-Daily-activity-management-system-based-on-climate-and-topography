import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

    state = {lat:null, errMessage: ''};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ lat: position.coords.latitude }),
            (err) => this.setState({ errMessage: err.message })
        );
    }

    renderContent() {
        if (!this.state.errMessage && this.state.lat) {
            return(
                <div>
                    <SeasonDisplay lat = {this.state.lat} />
                </div>
            );
        }
        
        if (!this.state.lat && this.state.errMessage) {
            return(
            <div>Error: {this.state.errMessage}</div>
            );
        }

        return(
            <Spinner message = "Please accept the location" />
        );
    }


    // React says we have to define render!!
    render() {
        return(
            <div className = "border-red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);


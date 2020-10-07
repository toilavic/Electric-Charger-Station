import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Login from './components/Login';
import Map from './components/Map';
import Register from './components/Register';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowButton: false,
            activeMarker : null,
            selectedPlace: null,
            showingInfoWindow: false,
        };
        this.handleShow = this.handleShow.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    handleShow() {
        this.setState({
            isShowButton: !this.state.isShowButton
        });
    }

    async onMarkerClick(point) {
        await this.setState({
        selectedPlace: point,
        activeMarker: point,
        showingInfoWindow: true
        });
    }
    
    render() {
        let {isShowButton} = this.state;
        let elmForm = null;
        if(isShowButton === false) {
                elmForm =   <div>
                                <button onClick={this.handleShow} type="button" className="btn btn-medium btn-success"><Link to="/login">Login</Link></button>
                                <button onClick={this.handleShow} type="button" className="btn btn-medium btn-success"><Link to="/register">Register</Link></button>
                                <button onClick={this.handleShow} type="button" className="btn btn-medium btn-success"><Link to="/Map">Using Withou Account</Link></button>
                            </div>
        }

        return (
          
          <Router>
            {elmForm}
                <div>
                        <Route path="/login" exact render={ routeProps => <Login {...routeProps}/>}  />
                        <Route path="/register" exact render={ routeProps => <Register {...routeProps}/>}  />
                        <Route path="/Map" exact render={ routeProps => <Map onMarkerClick={this.onMarkerClick}
                                                                             onSelectedPoint={this.state.selectedPlace}
                        {...routeProps}/>}  />                        
                </div>  
          </Router>    
        );
    }
}

export default App;
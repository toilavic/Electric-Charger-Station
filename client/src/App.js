import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Guest from './components/Guest';
import Register from './components/Register';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowButton: false
        };
        this.handleShow = this.handleShow.bind(this);
    }

    handleShow() {
        this.setState({
            isShowButton: !this.state.isShowButton
        });
    }
    
    render() {
        let {isShowButton} = this.state;
        let elmForm = null;
        if(isShowButton === false) {
                elmForm =   <div>
                                <button onClick={this.handleShow} type="button" className="btn btn-medium btn-success"><Link to="/login">Login</Link></button>
                                <button onClick={this.handleShow} type="button" className="btn btn-medium btn-success"><Link to="/register">Register</Link></button>
                                <button onClick={this.handleShow} type="button" className="btn btn-medium btn-success"><Link to="/guest">Using Withou Account</Link></button>
                            </div>
        }

        return (
            <div>
                <div className="page-header">
                    <h1>Electric Charger Station</h1>
                </div>
                    {elmForm}
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/guest" component={Guest}/>
                    </Switch>
            </div>

        );
    }
}

export default App;
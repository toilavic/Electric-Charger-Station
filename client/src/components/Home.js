import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")
        let loggedIn = true
        if(token == null) {
            loggedIn = false
        }

        this.state = {
            loggedIn,
            isShowOutline: true
        }
    }

    
    
    render() {
        if(this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        return (
            <div className="panel panel-default">
                <div className="page-header">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">Electric Charger Station</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="card mb-3">
                        <img className="card-img-top" src="https://www.zap-map.com/engine/wp-content/uploads/2018/10/EV-Connectors-2f8e22d5.jpg" alt="Card image cap" />
                    </div>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <img src="https://electriccarhome.co.uk/wp-content/uploads/2020/01/type-2-plug-ccs-socket.jpg" width="100%"/>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <h3>CCS</h3>
                            <p>When you want a rapid charge at a motorway service station,
                            you pick up the tethered Combo 2 plug from the charging machine and insert it into your car’s charging socket.
                            The bottom DC connector will permit the rapid charge, whereas the top Type 2 section isn’t involved in charging on this occasion.
                            Most rapid CCS chargepoints in the UK and Europe are rated at 50 kW DC, though recent CCS installations are normally 150 kW.</p>
                            <button type="button" class="btn btn-small btn-success">Free</button>
                            <button type="button" class="btn btn-small btn-success">Slow</button>
                            <button type="button" class="btn btn-small btn-success">Fast charge</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <img src="https://electriccarhome.co.uk/wp-content/uploads/2020/01/tethered-type-2-charger.jpg" width="100%"/>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <h3>Type 2</h3>
                            <p>a Type 2 charging point on a single-phase electricity supply at home allows you to charge your car at a maximum of 7.36 kW.
                            The formula is: 230 volts x 32 amps = 7,360 Watts, or 7.36 kW.</p>
                            <button type="button" class="btn btn-small btn-success">Free</button>
                            <button type="button" class="btn btn-small btn-success">Slow</button>
                            <button type="button" class="btn btn-small btn-success">Fast charge</button>
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    copyright@ 26/09/2020
                </div>
            </div>
        );
    }
}

export default Home;
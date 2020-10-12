import React, { Component } from 'react';
import './App.css';
import data from './data/test.json';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Login from './components/Login';
import Map from './components/Map';
import Register from './components/Register';
import Verify from './components/Verify';
import Clock from './components/Clock';
import Index from './components/Index'
import Navbar from './components/Navbar'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowButton: false,
            activeMarker : null,
            selectedPlace: null,
            showingInfoWindow: false,
            verify: null,
            data: data,
            money: 0,
            second:0,minutes:0,hour:0,
            timerStarted: false,
            timerStop: true,
            history: []
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
      
    choosePlugger = (event) => {
        event.preventDefault();
        let final = this.state.data.data.filter(e => e.id == event.target["digit"].value)
        if(final){
            this.setState({verify: final})
        }
    }
    // start charge
    start = (e) =>{
        e.preventDefault();
        var _this=this;
        if(this.state.timerStop){
          this.incrementer = setInterval(function(){
            _this.setState({timerStarted: true, timerStop: false});
            _this.setState({second:(_this.state.second + 1)});
          },1000);
        }
    }
    
    stop = (e) =>{
      e.preventDefault();
      let money;
      let digit = this.state.verify[0];

      if(digit.Type == "Free")
      {
          money = 0;
          console.log("free")
      }
      else if(digit.Type == "22W")
      {
        money =  0.2 * this.state.second/60 ;
      }
   
      else if(digit.Type === '150W')
      {
        money= 0.18 * this.state.second/3600;
      }

    this.setState({money:money});
    this.setState({timerStarted: false, timerStop: true});
    clearInterval(this.incrementer);

    }

    
    history = (e) => {
        e.preventDefault();
        console.log('dc roi')
        // var date = date.Now();
        // const history = {
        //   ...this.state.history, date: date, money: this.state.money, location: this.state.verify['location'], engery: this.state.verify['Type'], time: this.state.second}
        // this.setState({history})
        console.log(this.state.history)
    }

    render() {
        return ( 
          <Router>
            <Navbar/>
                <div>
                        <Route path="/" exact render={ routeProps => <Index {...routeProps}/>}  />
                        <Route path="/login" render={ routeProps => <Login {...routeProps}/>}  />
                        <Route path="/register" render={ routeProps => <Register {...routeProps}/>}  />
                        <Route path="/Clock" render={ routeProps => <Clock  start={this.start} 
                        second={this.state.second} 
                        stop={this.stop} 
                        money={this.state.money} 
                        plugVerify={this.state.plugVerify}
                        History={this.history}
                        {...routeProps}
                        />}  />
                        <Route path="/verify" render={ routeProps => <Verify choosePlugger={this.choosePlugger} {...routeProps}/>}  />
                        <Route path="/Map" render={ routeProps => <Map onMarkerClick={this.onMarkerClick}
                                                                             onSelectedPoint={this.state.selectedPlace}
                        {...routeProps}/>}  />                        
                </div>  
          </Router>    
        );
    }
}

export default App;
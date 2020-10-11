import React, { Component } from 'react';
import './App.css';
import data from './data/test.json';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Login from './components/Login';
import Map from './components/Map';
import Register from './components/Register';
import Verify from './components/Verify';
import Clock from './components/Clock';

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
        console.log(event.target["digit"].value)
        console.log(this.state.data.data)
        let final = this.state.data.data.filter(e => e.id == event.target["digit"].value)
        console.log(final)
        if(final){
            this.setState({verify: final})
        }
    }

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
   let d = this.state.verify[0];
   if(d.Type == "Free")
   {
       money = 0;
       console.log("free")
   }
   else if(d.Type == "22W")
     {
       money =  0.2 * this.state.second/60 ;
     }
   
   else if(d.Type === '150W')
   {
     money= 0.18 * this.state.second/3600;
   }
   this.setState({money:money});
   this.setState({timerStarted: false, timerStop: true});
   clearInterval(this.incrementer);
 
   console.log(this.state.timerStarted, this.state.timerStop)


    }


    History = (e) => {
        e.preventDefault();
        console.log('dc roi')
        // var date = date.Now();
        // const history = {
        //   ...this.state.history, date: date, money: this.state.money, location: this.state.verify['location'], engery: this.state.verify['Type'], time: this.state.second}
        // this.setState({history})
        console.log(this.state.history)
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
                        <Route path="/Clock" exact render={ routeProps => <Clock  start={this.start} 
                        second={this.state.second} 
                        stop={this.stop} 
                        money={this.state.money} 
                        plugVerify={this.state.plugVerify}
                        History={this.History}
                        {...routeProps}
                        />}  />
                        <Route path="/verify" exact render={ routeProps => <Verify choosePlugger={this.choosePlugger} {...routeProps}/>}  />
                        <Route path="/Map" exact render={ routeProps => <Map onMarkerClick={this.onMarkerClick}
                                                                             onSelectedPoint={this.state.selectedPlace}
                        {...routeProps}/>}  />                        
                </div>  
          </Router>    
        );
    }
}

export default App;
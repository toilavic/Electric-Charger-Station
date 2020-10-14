import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import constants from './constants.json';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Auth from './components/Auth';
import Map from './components/Map';
import Instruction from './components/Instruction';
import Register from './components/Register';
import Verify from './components/Verify';
import Clock from './components/Clock';
import Index from './components/Index'
import Navbar from './components/Navbar'
import Login from './components/Login';
import History from './components/History'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowButton: false,
            activeMarker : null,
            selectedPlace: null,
            showingInfoWindow: false,
            verify: null,
            data: [],
            money: 0,
            energy: 0,
            second:0,minutes:0,hour:0,
            timerStarted: false,
            timerStop: true,
            history: [],
            isAuthenticated: false,
            someData: null,
            userInfo: null,
            historyData: [],
            valid: false,
        };
        this.handleShow = this.handleShow.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }
    
    componentDidMount () {
      axios.get(constants.baseAddress + '/pluggers').then(result => {
        this.setState({data:result.data.pluggers})
        console.log(result.data.pluggers)
      })
    }

    onLogin = (result) => {
      this.setState({ isAuthenticated: true })
      this.setState({userInfo: result})
      this.checkData();
    }
  
    onLoginFail = () => {
      this.setState({ isAuthenticated: false });
      console.log("Login failed");
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
    // findDigit is the same from the input
    findCode = (code) => {
      var data = this.state.data;
      var result = false;
      data.forEach((e) => {
        if (e.Code == code) {
          result = true;
        }
      });
      return result;
    }
    
    // this function will validate the digit, which is going to be caculate after process to charge
    choosePlugger = (event) => {
        event.preventDefault();
        var code = event.target["digit"].value
        var result = this.findCode(code);
        
        if (result) {
          let final = this.state.data.filter(e => e.Code == event.target["digit"].value)
          var codeValidate = final[0].Status
          console.log(final)
        
          if(codeValidate == "Taken"){
            alert("The code is taken by other user");
            this.setState({ valid: false})
          }
          else {
            this.setState({verify: final, valid: true})
          }
        }
        else {
          alert("Wrong code, please check again from the map ^_^")
          this.setState({ valid: false})
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

    // stop charge
    // Money rate calculated
    // Normal charge, 0.003 euro = 0.185W per sec
    // Fast charge, 0.005 euro = 0.28W per sec
    stop = (e) =>{
      e.preventDefault();
      let money, energy;
      let digit = this.state.verify[0];
      console.log(digit)
      if(digit.Type == "Free")
      {
          money = 0;
          energy = 0
      }
      else if(digit.Type == "Normal")
      {
        money =  0.2 * this.state.second/60 ;
        energy = 0.185 * this.state.second ;
      }
      else if(digit.Type == "Fast")
      {
        money= 18 * this.state.second/3600;
        energy = 0.28 * this.state.second ;
      }
      this.setState({money:money, energy: energy});
      this.setState({timerStarted: false, timerStop: true});
      clearInterval(this.incrementer);
    }

    // register function
    register = (event) => {
      event.preventDefault();
      axios.post(constants.baseAddress +'/users', {
        username: event.target['username'].value,
        password: event.target['password'].value,
      })
      .then(function (response) {
        console.log(response);
        alert('created success');
        window.location = '/login';
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    // this function check if user have been logged in, so immedietly fetch data from DB to front-end request( HISTORY )
    checkData = () => {
      if(this.state.isAuthenticated){
        axios.get(constants.baseAddress + '/history/' + this.state.userInfo.data[0].id).then(result => {
          this.setState({historyData : result.data})
        })
      }
    }
    // get history whenever clicked
    historyAccount = (e) => {
       axios.get(constants.baseAddress + '/history/' + this.state.userInfo.data[0].id).then(result => {
       this.setState({historyData: result.data})
       })
       console.log(this.state.history)
   }

    onClearClock = () => {
      console.log('clear')
      console.log(this.state.verify)
      this.setState({second: 0, money: 0, energy: 0, verify: null, valid: false})
    }

    // get history
    history = () => {
        var date = new Date();
        axios.post(constants.baseAddress + '/users/' + this.state.userInfo.data[0].id, {
              username : this.state.userInfo.data[0].username,
              time: date,
              location: this.state.verify[0].AddressLine1,
              energy: this.state.energy,
              money: this.state.money 
        })
        .then(e => {
          axios.get(constants.baseAddress + '/history/' + this.state.userInfo.data[0].id)
            .then(result => {
                    this.setState({historyData : result.data})
                    toast.configure();
                    toast.success('Success notification')
                  })
          })
    }

    render() {
        return ( 
          
          <Router>
            <Navbar isAuthenticated={this.state.isAuthenticated} onClearClock = {this.onClearClock} historyAccount = {this.historyAccount}/>
                <div>
                        <Route path="/" exact render={ routeProps => <Index {...routeProps}/>} isAuthenticated={this.state.isAuthenticated} />
                        <Route path="/instruction" exact render={ routeProps => <Instruction {...routeProps}/>} />
                        <Route path="/history" exact render={ routeProps => <History historyData={this.state.historyData} 
                                                                                    isAuthenticated={this.state.isAuthenticated} 
                                                                                    username={this.state.userInfo} 
                                                                                    {...routeProps} />}/>
                        <Route path="/register" isAuthenticated={this.state.isAuthenticated} exact render={ routeProps => <Register register={this.register} {...routeProps} />}/>
                        <Route path="/verify" render={ routeProps => <Verify valid={this.state.valid} 
                                                                              checkValid={this.checkValid} 
                                                                              verify={this.state.verify} 
                                                                              choosePlugger={this.choosePlugger} 
                                                                              isAuthenticated={this.state.isAuthenticated} 
                                                                              data={this.state.data} 
                                                                              {...routeProps}/>}  />
                        <Route path="/Map" render={ routeProps => <Map onMarkerClick={this.onMarkerClick}
                                                                      onSelectedPoint={this.state.selectedPlace}
                                                                  {...routeProps}/>}  />   

                        <Route path="/Clock" render={ routeProps => <Clock  start={this.start} 
                                                                            second={this.state.second} 
                                                                            stop={this.stop} 
                                                                            money={this.state.money} 
                                                                            plugVerify={this.state.plugVerify}
                                                                            History={this.history}
                                                                            onClearClock = {this.onClearClock}
                                                                            isAuthenticated={this.state.isAuthenticated}
                                                                            {...routeProps}
                                                                            />}  /> 

                        <Route path="/login" exact render={(routeProps) => <Login
                                                                            checkData = { this.checkData}
                                                                            isAuthenticated={this.state.isAuthenticated}
                                                                            loginSuccess = { this.onLogin }
                                                                            loginFail = { this.onLoginFail }
                                                                            userInfo={ this.state.userInfo }
                                                                            redirectPathOnSuccess="/verify"
                                                                            {...routeProps} />} />
         

                                          
                </div>  
          </Router>    
        );
    }
}

export default App;
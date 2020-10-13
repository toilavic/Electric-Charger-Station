import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import constants from './constants.json';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Auth from './components/Auth';
import Map from './components/Map';
import Register from './components/Register';
import Verify from './components/Verify';
import Clock from './components/Clock';
import Index from './components/Index'
import Navbar from './components/Navbar'
import LoginView from './components/LoginView';
import History from './components/History'
import { ThreeSixty } from '@material-ui/icons';

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
    // get history
    // componentDidMount() {
    //   axios.get(constants.baseAddress + '/history/:id').then(result => {
    //     this.setState({history: result.data})
    //     console.log(this.state.history)
    //   }).catch(error => {
    //     console.error(error)
    //   })
    // }
  
    
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

    /* This function illustrates how some protected API could be accessed */
    loadProtectedData = () => {
      axios.get(constants.baseAddress + '/hello-protected', Auth.getAxiosAuth()).then(results => {
        this.setState({ someData: results.data });
      })
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
    findCode = (code) => {
      var data = this.state.data;
      var result = false;
      data.forEach((e) => {
        if (e.id == code) {
          result = true;
        }
      });
      return result; 
    }

    

    choosePlugger = (event) => {
        event.preventDefault();
        var code = event.target["digit"].value
        var result = this.findCode(code);
        
        if (result) {
          let final = this.state.data.filter(e => e.id == event.target["digit"].value)
          var codeValidate = final[0].Status
        
          if(codeValidate == "Taken"){
            alert("Taken");
            this.setState({ valid: false})
          }
          else {
            this.setState({verify: final, valid: true})
            console.log('vao')
          }
        }
        else {
          alert("Wrong code")
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
    
    stop = (e) =>{
      e.preventDefault();
      let money;
      let digit = this.state.verify[0];
      console.log(digit)
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
        money= 999 * this.state.second/3600;
      }

    this.setState({money:money});
    this.setState({timerStarted: false, timerStop: true});
    clearInterval(this.incrementer);

    }

    register=(event)=>
  {
    event.preventDefault();
    console.log('post');
    axios.post(constants.baseAddress +'/users', {
    username: event.target['username'].value,
    password: event.target['password'].value,

  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  checkData = () => {
    if(this.state.isAuthenticated){
      axios.get(constants.baseAddress + '/history/' + this.state.userInfo.data[0].id).then(result => {
        this.setState({historyData : result.data})
      })
    }
  }
 

  historyAccount = (e) => {
     console.log("history account")
      axios.get(constants.baseAddress + '/history/' + this.state.userInfo.data[0].id).then(result => {
      this.setState({historyData: result.data})
      })
      console.log(this.state.history)
  }

    
    history = (e) => {
        console.log(this.state.verify[0].Comments)
        e.preventDefault();
        console.log(this.state.userInfo.data[0].id)
        console.log(this.state.money)
        var date = new Date();
        axios.post(constants.baseAddress + '/users/' + this.state.userInfo.data[0].id, {
              username : this.state.userInfo.data[0].username,
              time: date,
              location: this.state.verify[0].AddressLine1,
              energy: this.state.verify[0].Comments,
              money: this.state.money 
        }).then(e => {
          axios.get(constants.baseAddress + '/history/' + this.state.userInfo.data[0].id).then(result => {
            this.setState({historyData : result.data})
        })
        })
        // const history = {
        //   ...this.state.history, date: date, money: this.state.money, location: this.state.verify['location'], engery: this.state.verify['Type'], time: this.state.second}
        // this.setState({history})
        
    }

  
    render() {
        return ( 
          
          <Router>
            <Navbar  isAuthenticated={this.state.isAuthenticated} historyAccount = {this.historyAccount}/>
                <div>
                        <Route path="/" exact render={ routeProps => <Index {...routeProps}/>} isAuthenticated={this.state.isAuthenticated} />
                        <Route path="/history" exact render={ routeProps => <History historyData={this.state.historyData} isAuthenticated={this.state.isAuthenticated} username={this.state.userInfo} {...routeProps} />}/>
                        <Route path="/register" exact render={ routeProps => <Register register={this.register} {...routeProps} />}/>
    
                        <Route path="/verify" render={ routeProps => <Verify valid={this.state.valid} checkValid={this.checkValid} verify={this.state.verify} choosePlugger={this.choosePlugger} isAuthenticated={this.state.isAuthenticated} data={this.state.data} {...routeProps}/>}  />
                        <Route path="/Map" render={ routeProps => <Map onMarkerClick={this.onMarkerClick}
                                                                        
                                                                             onSelectedPoint={this.state.selectedPlace}
                        {...routeProps}/>}  />   

                         <Route path="/Clock" render={ routeProps => <Clock  start={this.start} 
                        second={this.state.second} 
                        stop={this.stop} 
                        money={this.state.money} 
                        plugVerify={this.state.plugVerify}
                        History={this.history}
                        isAuthenticated={this.state.isAuthenticated}
                        {...routeProps}
                        />}  /> 

                        <Route path="/login" exact render={
                        (routeProps) =>
                          <LoginView
                          checkData = { this.checkData}
                            loginSuccess = { this.onLogin }
                            loginFail = { this.onLoginFail }
                            userInfo={ this.state.userInfo }
                            redirectPathOnSuccess="/verify"
                            {...routeProps}
                        />
                       
        } />
         

                                          
                </div>  
          </Router>    
        );
    }
}

export default App;
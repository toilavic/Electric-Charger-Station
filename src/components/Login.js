import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameSet: '',
            passwordSet: '',
            loginStatus: '',
            loggedIn: false
        }
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e){
        e.preventDefault()
        const {usernameSet, passwordSet} = this.state
        if(usernameSet === "" && passwordSet === "") {
            alert("Please enter username & password");
        }
        else {
            Axios.post("http://localhost:3001/users/login", {
                    username: usernameSet,
                    password: passwordSet,
                })
                    .then((response) => {
                        if(response.data.message) {
                            this.setState({
                                loginStatus: response.data.message
                            })
                        }
                        else {
                            this.setState({
                                loginStatus: response.data.result[0].username,
                                loggedIn: true
                            })
                        }
                    })
        }
    }
    
    render() {
        const {loggedIn} = this.state;
        if(loggedIn === true) {
            return <Redirect to="/home" />
        }
        return (
            <form>
                <div>
                    <label className="col-sm-2">Username</label>
                    <input type="text" value= {this.state.usernameSet}
                    onChange={(e) => this.setState({usernameSet: e.target.value})}
                    name="username" id="text" className="input-sm" placeholder="Username" />
                </div>
                <div>
                    <label className="col-sm-2">Password</label>
                    <input type="password" value= {this.state.passwordSet}
                    onChange={(e) => this.setState({passwordSet: e.target.value})}
                    name="password" id="password" className="input-sm" placeholder="Password" />
                </div>
                <button onClick={this.submitForm} type="submit" className="btn btn-info">Login</button>
            </form>
        );
    }
}

export default Login;
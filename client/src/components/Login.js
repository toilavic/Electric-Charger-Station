import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            username: '',
            password: '',
            loginStatus: '',
            loggedIn: false
        }
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e){
        e.preventDefault()
        const {username, password} = this.state
        if(username === "" && password === "") {
            alert("Please enter username & password");
        }
        else {
            fetch(`http://localhost:3001/users/login?username=${username}&password=${password}`)
                .then(response => {
                    this.setState({ users: response.data})
                    console.log(response);
                })
                .catch(error => console.log(error))
        }
    }
    
    render() {
        // const {loggedIn} = this.state;
        // console.log(this.state.loginStatus);
        // if(loggedIn === true) {
        //     return <Redirect to="/home" />
        // }
        return (
            <form>
                <div>
                    <label className="col-sm-2">Username</label>
                    <input value= {this.state.username}
                    onChange={(e) => this.setState({username: e.target.value})}
                    name="username" id="text" className="input-sm" placeholder="Username" />
                </div>
                <div>
                    <label className="col-sm-2">Password</label>
                    <input value= {this.state.password}
                    onChange={(e) => this.setState({password: e.target.value})}
                    name="password" id="password" className="input-sm" placeholder="Password" />
                </div>
                <button onClick={this.submitForm} type="submit" className="btn btn-info">Login</button>
                <h1>{this.state.loginStatus}</h1>
            </form>
        );
    }
}

export default Login;
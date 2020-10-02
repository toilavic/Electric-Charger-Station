import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        }
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e){
        e.preventDefault()
        const {username, password} = this.state
        if(username === "vic" && password === "123") {
            localStorage.setItem("token", "testing");
            this.setState({
                loggedIn: true
            })
        }
    }
    
    render() {
        if(this.state.loggedIn) {
            return <Redirect to="/home" />
        }
        return (
            <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                <h1>Login</h1>
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                        value= {this.state.username}
                        onChange={(e) => this.setState({username: e.target.value})}
                        name="username"
                        type="text" className="form-control input-sm" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                        value= {this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}
                        name="password"
                        type="password" className="form-control input-sm" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-success">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
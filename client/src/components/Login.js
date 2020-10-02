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
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange(tam){
        this.setState({
            [tam.target.name]: tam.target.value
        })
    }

    submitForm(tam){
        tam.preventDefault()
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
                        onChange={this.onChange}
                        name="username"
                        type="text" className="form-control input-sm" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                        value= {this.state.password}
                        onChange={this.onChange}
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
import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameReg: '',
            passwordReg: '',
            repasswordReg: '',
            registeredIn: false
        }
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault()
        const {usernameReg, passwordReg, repasswordReg} = this.state;
        if( usernameReg === "" || passwordReg === "" || repasswordReg === "") {
            alert("Please fill the form");
        }
        else {
            if(repasswordReg===passwordReg) {
                Axios.post("http://localhost:3001/users/register", {
                    username: usernameReg,
                    password: passwordReg,
                })
                    .then((response) => {
                        console.log(response);
                    })
            }
            else {
                alert("Password is not the same");
            }
        }
    }
    
    render() {
        const {registeredIn} = this.state;
        if( registeredIn === true) {
            return <Redirect to="/login" />
        }
        return (
                <form>
                    <div>
                        <label className="col-sm-2">Username</label>
                        <input type="text" value= {this.state.usernameReg}
                        onChange={(e) => this.setState({usernameReg: e.target.value})}
                        name="username" id="username" className="input-sm" placeholder="Username" />
                    </div>
                    <div>
                        <label className="col-sm-2">Password</label>
                        <input type="password" value= {this.state.passwordReg}
                        onChange={(e) => this.setState({passwordReg: e.target.value})}
                        name="password" id="password" className="input-sm" placeholder="Password" />
                    </div>
                    <div>
                        <label className="col-sm-2">Password Confirm</label>
                        <input type="password" value= {this.state.repasswordReg}
                        onChange={(e) => this.setState({repasswordReg: e.target.value})}
                        name="repassword" id="repassword" className="input-sm" placeholder="Password" />
                    </div>
                    <button onClick={this.submitForm} type="submit" className="btn btn-info">Register</button>
                </form>
        );
    }
}

export default Register;
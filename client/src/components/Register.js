import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            username: '',
            password: '',
            repassword: '',
            registeredIn: false
        }
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault()
        const {username, password, repassword} = this.state;
        if( username === "" || password === "" || repassword === "") {
            alert("Please fill the form");
        }
        else {
            if(repassword===password) {
                fetch(`http://localhost:3001/users/register?username=${username}&password=${password}`)
                    .then(response => this.setState({users: response.data}))
                    .catch(error => console.log(error))
                this.setState({
                    registeredIn: true
                })
            }
            else {
                alert("Password is not the same");
            }
        }
    }
    
    render() {
        const {registeredIn} = this.state;
        console.log(registeredIn);
        if( registeredIn === true) {
            return <Redirect to="/login" />
        }
        return (
                <form>
                    <div>
                        <label className="col-sm-2">Username</label>
                        <input type="text" value= {this.state.username}
                        onChange={(e) => this.setState({username: e.target.value})}
                        name="username" id="username" className="input-sm" placeholder="Username" />
                    </div>
                    <div>
                        <label className="col-sm-2">Password</label>
                        <input type="password" value= {this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}
                        name="password" id="password" className="input-sm" placeholder="Password" />
                    </div>
                    <div>
                        <label className="col-sm-2">Password Confirm</label>
                        <input type="password" value= {this.state.repassword}
                        onChange={(e) => this.setState({repassword: e.target.value})}
                        name="repassword" id="repassword" className="input-sm" placeholder="Password" />
                    </div>
                    <button onClick={this.submitForm} type="submit" className="btn btn-info">Register</button>
                </form>
        );
    }
}

export default Register;
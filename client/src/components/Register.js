import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword: '',
            registered: false
        }
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.username]: e.target.value,
            [e.target.password]: e.target.value,
            [e.target.repassword]: e.target.value
        })
    }

    submitForm(e) {
        e.preventDefault();
        this.setState({
            registered: true
        });
    }
    
    render() {
        if(this.state.registered) {
            return <Redirect to='/home' />
        }
        return (
            <div className="row centered-form">
                <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Please sign up here <small>It's free!</small></h3>
                        </div>
                        <div className="panel-body">
                            <form role="form">
                                    <div className="form-group">
                                        <input type="text" 
                                        value= {this.state.username}
                                        onChange= {this.onChange}
                                        name="username" id="username" className="form-control input-sm" placeholder="Username" />
                                    </div>
                                <div className="row">
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        <div className="form-group">
                                            <input type="password" 
                                            value= {this.state.password}
                                            onChange= {this.onChange}
                                            name="password" id="password" className="form-control input-sm" placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        <div className="form-group">
                                        <input type="password" 
                                        value= {this.state.repassword}
                                        onChange= {this.onChange}
                                        name="password_confirmation" id="password_confirmation" className="form-control input-sm" placeholder="Confirm Password" />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" defaultValue="Register" className="btn btn-info btn-block">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
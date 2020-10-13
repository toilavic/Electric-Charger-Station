import React from 'react';
import Auth from './Auth';
import './Login.css';

import { Button , Form , FormGroup , Label , Input} from 'reactstrap';
export default function LoginView(props) {

  function login(event)
  {
    event.preventDefault();
    Auth.authenticate(event.target['username'].value, event.target['password'].value)
      .then(result =>
        {
          props.loginSuccess(result);
          props.history.push(props.redirectPathOnSuccess);
        })
      .catch(() => {
        props.loginFail();
      })

  }

  return (
    <Form className="Login" onSubmit={login}>
      <h1>
        <span className="font-weight-bold">Login</span>
      </h1>
      <h2 className="text-center">Welcome</h2>
      <FormGroup>
        <Label>Username</Label>
        <Input type="text" placeholder="Username" name="username"/>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input type="password" name="password" placeholder="Password"/>
      </FormGroup>
      <Button className="btn-lg btn-dark btn-block">Sign in</Button>
      <Button onClick={() => props.history.goBack()}>Back</Button>
    </Form>
    /*<div>
      <h1>Login</h1>
      <div>
       Please give your username and password to login
      </div>

      <form onSubmit={ login }>
        <div>
          Username <input type="text" name="username" />
        </div>
        <div>
          Password <input type="text" name="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>*/



    /*</div>*/
  )
}

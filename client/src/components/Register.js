import React from 'react';
export default function Register(props)
{
    return(

    <div>
    <h1>Register</h1>

    <form onSubmit={ props.register }>
      <div style={{marginTop:'100px'}}>
        Username <input type="text" name="username" />
      </div>
      <div>
        Password <input type="password" name="password" />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
    <button onClick={() => props.history.goBack()}>Back</button>
    </div>
  )
}

import React from 'react';
import {Link, Redirect } from "react-router-dom";
export default function Clock(props) {

    if (props.plugVerify === null)
    {
      alert('We cant find your code');
    } else
    {
      const getSecond = () =>
    {
      return('0' + props.second %60).slice(-2);
    }

    const getMinute = () =>
    {
      return ('0' + Math.floor(props.second / 60) %60).slice(-2);
    }
    const getHour = ()=>
    {
      return ('0' + Math.floor(props.second / 3600)).slice(-2);
    }
    const money = Number(Math.round(props.money +'e2')+'e-2');


  if(props.isAuthenticated) {
    return(
    
      <div style={{marginTop: '100px', marginLeft: '100px'}}>
          <button onClick={() => props.history.goBack()}>Back</button>
          <div>
              <div >{getHour()}:{getMinute()}:{getSecond()}</div>
              <button  onClick={props.start}>Start</button>
              <button  onClick={props.stop}>Stop</button>
              <div>Your payment is: {money} e</div>
          </div>
          <button type="submit" className="btn btn-default"
                                onClick = {props.History}
          >Submit</button>
      </div>
    )
  } else {
      alert('You need to login ');
        return(
          <React.Fragment><Redirect to='/login' /></React.Fragment>
      )    
  }
 
} 
}

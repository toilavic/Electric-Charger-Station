import React from 'react';
import {Redirect } from "react-router-dom";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Clock(props) {
  toast.configure();
  function notify() {
    toast.success('Billing success, please check the payment from history')
  }

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
    <>
      <header className="mastheadClock">
          <div className="container d-flex h-100 align-items-center">
            <div className="mx-auto text-center">
            <h1 className="mx-auto my-0 text-uppercase">{getHour()}:{getMinute()}:{getSecond()}</h1>
              <button className="btn btn-primary mx-auto" onClick={props.start}>Start</button>&nbsp;
              <button className="btn btn-primary mx-auto" onClick={props.stop}>Stop</button>
              <h2 className="text-black mb-4">Your payment is: {money} e</h2>
              <button type="submit" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off" onClick={() => {
          props.History();
          props.onClearClock();
          notify();
        }}   >
              Billing
              </button>
            </div>
          </div>
      </header>
    </>
    )
  } else {
      alert('You need to login ');
        return(
          <React.Fragment><Redirect to='/login' /></React.Fragment>
      )    
  }
} 
}
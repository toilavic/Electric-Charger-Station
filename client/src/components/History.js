import React from 'react';
import { Redirect } from "react-router-dom";
export default function History(props)
{
    console.log(props.historyData)
    if(props.isAuthenticated){
      var elmHistory = props.historyData.map((e,index) => {
      return <tr>
      <th scope="row" key={index}>{index}</th>
      <td>{e.time}</td>
      <td>{e.location}</td>
      <td>{e.energy == 0 ? 'Free energy' : e.energy} </td>
      <td>{e.money} €</td>
  </tr>
      });
      return(
        <div style={{marginTop:'80px', marginLeft: '100px', width: '80%'}}>
        <h1>Hi, {props.username.data[0].username}</h1>
          <div style={{marginTop:'2%'}}>
              <table className="table table-striped">
              <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Time</th>
                    <th scope="col">Address</th>
                    <th scope="col">eneygy</th>
                    <th scope="col">Money</th>
                  </tr>
              </thead>
              <tbody>
                  {elmHistory}
              </tbody>
              </table>
              
              </div>

        </div>
      )
    } else 
    {
            alert('You need to login ');
        return(
          <React.Fragment><Redirect to='/login' /></React.Fragment>
      )    
    }
}

import React from 'react';
import { Redirect } from "react-router-dom";
export default function History(props)
{
    console.log(props.historyData)
    if(props.isAuthenticated){
      return(

        <div>
        <h1 style={{marginTop:'100px'}}>{props.username.data[0].username}</h1>
          {props.historyData.map((e,index) => {
            return (<div key={index}>
              <table className="table table-striped table-dark" key={index}>
              <thead>
                <tr>
                  <th scope="col">{e.time}</th>
                  <th scope="col">{e.location}</th>
                  <th scope="col">{e.energy}</th>
          <th scope="col">{e.money}</th>
                </tr>
              </thead>
              </table>
              </div>
          )})
          }
       
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

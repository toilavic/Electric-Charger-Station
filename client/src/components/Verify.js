import React  from 'react';
import { Redirect, Link } from "react-router-dom";
export default function Verify(props) {  
   if (props.isAuthenticated ) {
      if(props.valid === true){
        return (
          <>
            <header className="mastheadVerify">
                <div className="container d-flex h-100 align-items-center">
                  <div className="mx-auto text-center">
                    <h2 className="text-white mb-4">Enter the code you get from the map</h2>
                    <form onSubmit={ props.choosePlugger }>
                    <input type="text" disabled={props.valid} name="digit" maxLength="4" className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"/>&nbsp;
                    </form>
                    &nbsp;<Link to='/clock'><button className="btn btn-primary mx-auto">Start charging</button></Link>
                  </div>
                </div>
              </header>
          </>
        );
      }
      else
      {
        return (
          <>
            <header className="mastheadVerify">
                <div className="container d-flex h-100 align-items-center">
                  <div className="mx-auto text-center">
                    <h2 className="text-white mb-4">Enter the code you get from the map</h2>
                    <form onSubmit={ props.choosePlugger }>
                    <input type="text" name="digit" maxLength="4" className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"/>
                    <br/>
                    <button type="submit" className="btn btn-primary mx-auto">Enter</button>
                    </form>
                  </div>
                </div>
              </header>
          </>
        );
      }
   }
    else {
      alert('You need to login ');
      return(<React.Fragment><Redirect to='/login' /></React.Fragment>)    
    }
}

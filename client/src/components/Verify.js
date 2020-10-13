import React  from 'react';
import { Redirect, Link } from "react-router-dom";
export default function Verify(props) {  
   if (props.isAuthenticated ) {
     console.log(typeof(props.verify))
     if(props.valid === true){
      return (
        <div>
          {/* <button onClick={() => props.history.goBack()}>Back</button> */}
          <div style={{marginTop: '100px', marginLeft: '100px'}}>
            <form onSubmit={ props.choosePlugger }>
            <div>Enter your code</div>
            <input type="text" name="digit" maxLength="4"/>
            <button type="submit">Enter</button>
            </form>
            
            <Link to='/clock'><button>Start charging</button></Link>
          </div>
        </div>
      );
     }else{
      return (
        <div>
          {/* <button onClick={() => props.history.goBack()}>Back</button> */}
          <div style={{marginTop: '100px', marginLeft: '100px'}}>
            <form onSubmit={ props.choosePlugger }>
            <div>Enter your code</div>
            <input type="text" name="digit" maxLength="4"/>
            <button type="submit">Enter</button>
            </form>
          </div>
        </div>
      );
     }
    
    
   }
    else {
 alert('You need to login ');
  return(
    <React.Fragment><Redirect to='/login' /></React.Fragment>
)    }
  
}

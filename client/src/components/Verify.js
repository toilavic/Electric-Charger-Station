import React  from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
export default function Verify(props) {  


  return (
    
    <div>
      {/* <button onClick={() => props.history.goBack()}>Back</button> */}
      <div>
        <form onSubmit={ props.choosePlugger }>
        <div>Enter your code</div>
        <input type="text" name="digit" maxLength="4"/>
        <button type="submit">Enter</button>
        </form>
        <Link to='/clock'><button>Start charging</button></Link>
      </div>
    </div>
  );
}

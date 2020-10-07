import React from 'react';
import Map from './components/Map';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <Router>
        <div>
        <Route path="/" exact render={ routeProps => <Map {...routeProps}/>}  />
        </div>
    </Router>
    
    );
  }
    
}

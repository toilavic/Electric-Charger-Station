import React  from 'react';
import {Link} from "react-router-dom";

export default class Navbar extends React.Component {  
  
    render() {
      console.log(this.props.isAuthenticated)
        return (
            <div>
              {/* Navigation*/}
              <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                  <Link to="/" className="navbar-brand js-scroll-trigger">Electric Charger</Link>
                  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars" />
                  </button>
                  <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item"><Link to="/map" className="nav-link js-scroll-trigger"><b>Open Map</b></Link></li>
                      <li className="nav-item" onClick={this.props.onClearClock}><Link to="/verify" className={this.props.isAuthenticated ? 'nav-link js-scroll-trigger' : 'hidden'}><b>Start to charge</b></Link></li>
                      <li className="nav-item"><Link to="/login" className={this.props.isAuthenticated ? 'hidden' : 'nav-link js-scroll-trigger'}><b>Login</b></Link></li>
                      <li className="nav-item"><a className={this.props.isAuthenticated ? 'nav-link js-scroll-trigger' : 'hidden'} href='/'><b>Log-out</b></a></li>
                      <li className="nav-item" onClick={this.props.historyAccount}><Link to="/history" className={this.props.isAuthenticated ? 'nav-link js-scroll-trigger' : 'hidden'}><b>History</b></Link></li>
                      <li className="nav-item"><a className="nav-link js-scroll-trigger" ><b>How it works ?</b></a></li>
                    </ul>
                  </div>
                </div>
              </nav>
              
             </div>
          );
    }
}

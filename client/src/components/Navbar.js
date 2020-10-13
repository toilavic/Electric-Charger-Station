import React  from 'react';

export default class Navbar extends React.Component {  
  constructor(props) {
    super(props);
    }
    render() {
        return (
            <div>
              {/* Navigation*/}
              <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                  <a className="navbar-brand js-scroll-trigger" href="/">Electric Charger</a>
                  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars" />
                  </button>
                  <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item"><a className="nav-link js-scroll-trigger" href="Map"><b>Open Map</b></a></li>
                      <li className="nav-item"><a className="nav-link js-scroll-trigger" href="Login"><b>Login</b></a></li>
                      <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#signup"><b>How it works ?</b></a></li>
                      <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#signup"><b>Contact</b></a></li>
                    </ul>
                  </div>
                </div>
              </nav>
             </div>
          );
}}

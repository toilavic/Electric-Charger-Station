import React  from 'react';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../navbar.css';
import { IconContext } from 'react-icons';

export default class Map extends React.Component {  

  // close & open sidebar
  showSidebar = () => {
      this.props.onCloseSide();
  }
    
  render() {
      var selectedPlace = this.props.onReceivePoint;
  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        
        <nav className={this.props.onshowingInfoWindow ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars' onClick={this.showSidebar}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {selectedPlace ? (
            // details info box
                <div style={{borderRadius: '20%'}}>
                        <h2 className="pointDetails" style={{marginTop:'50px'}}>{selectedPlace.chargerName}</h2>
                          <p  className="pointDetails">Address: {selectedPlace.AddressLine1}</p>
                          <p className="pointDetails"> Connector type: {selectedPlace.Type}</p>,
                                    <p className="pointDetails"> Type: {selectedPlace.Title}</p>
                                    <p className="pointDetails"> Code: {selectedPlace.Code}</p>
                </div>
                
        ) : null}
        <footer className="footer small text-center text-white-50">
          <div className="container">Please <b>remember the code</b> and then &nbsp;
            <Link to="/verify"><b>Click here</b></Link> to go to select and proceed with the charger
          </div>
        </footer>
        </ul> 
        </nav>
      </IconContext.Provider>
      
    </div>
  );
}}

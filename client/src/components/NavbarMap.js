import React  from 'react';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../navbar.css';
import { IconContext } from 'react-icons';

export default class Map extends React.Component {  

  
  constructor(props) {
    super(props);
    }

  // close & open sidebar
  showSidebar = () => {
      this.props.onCloseSide();
  }
    
  render() {
      var selectedPlace = this.props.onReceivePoint;
      // console.log(point)
      console.log(selectedPlace)
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
                        <h2>{selectedPlace.chargerName}</h2>
                          <p>Address: {selectedPlace.AddressLine1}, {selectedPlace.AddressLine2}</p>
                          <p>Connection: {selectedPlace.Connections.length}</p>
                          
                          {/* {selectedPlace.Connections.map((e, index) => <p key = {index}> Connector type: {e.Level.Comments}</p>)}
                          {selectedPlace.Connections.map((e, index) => <p key = {index}> Type: {e.ConnectionType.Title}</p>)} */}

                          {selectedPlace.Connections.map((e, index) => {
                            return (<div key = {index}>
                                    <p > Connector type: {e.Level.Comments}</p>,
                                    <p > Type: {e.ConnectionType.Title}</p>
                                    <p> Code: { e.ID}</p>
                                    </div>
                           ) })}
                </div>
        ) : null}
        </ul> 
        </nav>
      </IconContext.Provider>
      
    </div>
  );
}}

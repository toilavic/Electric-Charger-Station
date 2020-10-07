import React  from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData.js';
import '../navbar.css';
import { IconContext } from 'react-icons';

export default class Map extends React.Component {   
  // const [sidebar, setSidebar] = useState(false);

  
  constructor(props) {
    super(props);
    
    }

    showSidebar = () => {
      this.props.onCloseSide();
    }
    render() {
      var selectedPlace = this.props.onReceivePoint;
      // console.log(point)
      
  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={(this.showSidebar)} />
            <FaIcons.FaSearch onClick={this.showSidebar} />
          </Link>
          
        </div>
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
                          <p>Connector type: {selectedPlace.connector}</p>
                          <p>Price: {selectedPlace.price}</p>
                          <p>Power: {selectedPlace.power}</p>
                          
                </div>
                
          
        ) : null}
            {/* {point ? point.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}  */}
        </ul> 
        </nav>
      </IconContext.Provider>
      
    </div>
  );
}}

import React from 'react';
import ReactMapGL, {Marker, Popup, NavigationControl} from "react-map-gl";
import data from '../data/test.json';
import NavbarMap from './NavbarMap'
import Geocoder from 'react-map-gl-geocoder'
const MAPBOX_TOKEN =
  "pk.eyJ1IjoidG9pbGF2aWMiLCJhIjoiY2tmamN5aTNsMGNoMjMzbXB4cWM4MjdtcyJ9.OVmr_4vFr40bm1pVWqhpZQ";
export default class Map extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 65.009272,
        longitude : 25.519993,
        zoom: 11,
        width: '100vw',
        height: '100vh'
      },
      data,
      activeMarker : null,
      selectedPlace: null,
      showingInfoWindow: false,
    }
    }
    
    async onMarkerClick(point) {
        await this.setState({
        selectedPlace: point,
        activeMarker: point,
        showingInfoWindow: true
        });
        console.log(this.state.selectedPlace)

    }
  
    
    render() {

    var {selectedPlace} = this.state
        
    return (
      <div>
        {/* Render a map */}
        
        <ReactMapGL {...this.state.viewport} mapboxApiAccessToken={MAPBOX_TOKEN}
                                  onViewportChange={(viewport) => {this.setState({viewport: viewport})}}
                                  mapStyle="mapbox://styles/toilavic/ckfjda0ux0mct19nwm0cw9cqb"
        >
        <div><NavbarMap/></div>
        {/* render electric charger points */}
        { this.state.data.data.map(point => (

         <Marker
            key={point.id}
            latitude={point.Latitude}
            longitude = {point.Longitude}
            onClick={this.onMarkerClick}
         >
             {/* render button */}
           <button className="marker-btn" onClick={(e) => {
              e.preventDefault();
              this.onMarkerClick(point)
           }}>
             <img src="/icon.png"></img>
           </button>
        </Marker>
        )) }


        {/* check if there has been a selected Place */}
        {selectedPlace ? (
            
            // details info box
            <Popup
              latitude={selectedPlace.Latitude}
              longitude={selectedPlace.Longitude}
              onClose={() => this.setState({selectedPlace:null})}
            >
                <div style={{borderRadius: '20%'}}>
                        <h2>{selectedPlace.chargerName}</h2>
                          <p>Address: {selectedPlace.AddressLine1}, {selectedPlace.AddressLine2}</p>
                          <p>Connection: {selectedPlace.Connections.length}</p>
                          <p>Connector type: {selectedPlace.connector}</p>
                          <p>Price: {selectedPlace.price}</p>
                          <p>Power: {selectedPlace.power}</p>
                          
                </div>
                
            </Popup>
           ) : null}
        
        <div className="navControl">
            <NavigationControl />
        </div>
        </ReactMapGL>
      </div>
    );
  }
    
}

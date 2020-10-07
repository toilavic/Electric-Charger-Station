import React from 'react';
import ReactMapGL, {Marker, Popup, NavigationControl} from "react-map-gl";
import data from '../data/test.json';
import NavbarMap from './NavbarMap'
import { BsLightningFill } from "react-icons/bs";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

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
      onshowingInfoWindow : false,
      search: ""
    }
    }
    // get maker event from parent
    async onMarkerClick(point) {
        this.props.onMarkerClick(point);
        await this.setState({onshowingInfoWindow: true})
    }
     
    onCloseSide = () => {
      
        this.setState({onshowingInfoWindow: !this.state.onshowingInfoWindow})
      
    }

    updateSearch = (event) => {
      this.setState({search: event.target.value.substr(0,20)});
    }

    selectedValue = (e) => {
      const viewport = {
      ...this.state.viewport, latitude: e.Latitude, longitude: e.Longitude, zoom: 20}
      this.setState({viewport});
    }
    onViewportChange = viewport => {
      this.setState({viewport});
    };
    render() {
   

    let filteredContacts = this.state.data.data.filter(
      (location) => {
        return location.chargerName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    console.log(this.state.viewport)
    console.log(filteredContacts)
    var selectedPlace = this.props.onSelectedPoint
    return (
      <div>
        {/* Render a map */}
        <ReactMapGL {...this.state.viewport} mapboxApiAccessToken={MAPBOX_TOKEN}
                                  onViewportChange={this.onViewportChange}
                                  mapStyle="mapbox://styles/toilavic/ckfjda0ux0mct19nwm0cw9cqb"
        >

       {/* Navbar navigator */}
        <div><NavbarMap onshowingInfoWindow={this.state.onshowingInfoWindow}
                        onReceivePoint={selectedPlace}
                        onCloseSide = { 
                              this.onCloseSide.bind(this)
                        }
                         
        /></div>
        <div>
      <Combobox>
        <ComboboxInput aria-labelledby="demo" value={this.state.search} onChange={this.updateSearch.bind(this)} />
        <ComboboxPopover>
          <ComboboxList aria-labelledby="demo">
          {filteredContacts.map((e) => <ComboboxOption value={e.chargerName} onClick={() => this.selectedValue(e)} />)}   
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
        {/* render electric charger points */}
        { filteredContacts.map(point => (

         <Marker
            key={point.id}
            latitude={point.Latitude}
            longitude = {point.Longitude}

         >
             {/* render button */}
           <button className="marker-btn" onClick={(e) => {
              e.preventDefault();
              this.onMarkerClick(point)
           }}>
             <BsLightningFill/>
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
                        <h>Selected</h>      
                </div>
                
            </Popup>
        ) : null}

        {/* Navigator btn*/}
        <div className="navControl">
            <NavigationControl />
        </div>
        </ReactMapGL>
      </div>
    );
  }
    
}

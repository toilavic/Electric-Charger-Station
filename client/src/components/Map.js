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
  ComboboxOption
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
      search: "",
      selectedPoint: false
    }
    }

    // get maker event from parent
    async onMarkerClick(point) {
        this.props.onMarkerClick(point);
        await this.setState({onshowingInfoWindow: true})
    }
    
    // close & open sidebar (INFO BAR)
    async onCloseSide() {
        await this.setState({onshowingInfoWindow: !this.state.onshowingInfoWindow, selectedPoint: false})
        console.log(this.state.selectedPoint)
    }

    // search
    updateSearch = (event) => {
      this.setState({search: event.target.value.substr(0,20),
        selectedPoint: false
      });
    }

    // fly to selected point
    async selectedValue(e) {
      console.log(e)
      const viewport = {
      ...this.state.viewport, latitude: e.Latitude, longitude: e.Longitude, zoom: 16}
      await this.setState({viewport, selectedPoint: !this.state.selectedPoint}
        );
    }

    // change viewport of map func
    onViewportChange = viewport => {
      this.setState({viewport});
    };


    render() {
   
    let filteredContacts = this.state.data.data.filter(
      (location) => {
        return location.chargerName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );

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
                        onCloseSide = {this.onCloseSide.bind(this)}
                         
        /></div>
        {/* search box */}
        <div className="search">
          <Combobox>
              <ComboboxInput placeholder="Enter an address" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                <ComboboxPopover>
                  <ComboboxList className={this.state.selectedPoint ? 'dropList' : ''}>
                  {filteredContacts.map((item) => <ComboboxOption 
                                                key = {item.id}
                                                value={item.chargerName} 
                                                onClick={() => {
                                                  // change view
                                                  this.selectedValue(item)
                                                  //  send clicked point to parent state
                                                  this.onMarkerClick(item)
                                                  }
                                                }
                                                />)}   
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
              this.selectedValue(point)
           }}>
             <BsLightningFill/>
           </button>

          </Marker>
        ))}


        {/* check if there has been a selected Place */}
        {selectedPlace ? (
            // details info box
            <Popup
              latitude={selectedPlace.Latitude}
              longitude={selectedPlace.Longitude}
              onClose={() => this.setState({selectedPlace:null})}
              closeOnClick ={false}
              
            >
              
              <i className="glyphicon glyphicon-arrow-down"></i>
              
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

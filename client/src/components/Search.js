import React from 'react';
import data from '../data/test.json';

import { BsLightningFill } from "react-icons/bs";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";



export default class Map extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      search: ""
    }
    }

    // get maker event from parent
    async onMarkerClick(point) {
        this.props.onMarkerClick(point);
        await this.setState({onshowingInfoWindow: true})
    }
    
    // close & open sidebar (INFO BAR)
    onCloseSide = () => {
        this.setState({onshowingInfoWindow: !this.state.onshowingInfoWindow})
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
      </div>
    );
  }
    
}

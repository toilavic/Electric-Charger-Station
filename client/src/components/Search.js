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


export default class Map extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      search: "",
      data,
      selectedPoint: false
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


    render() {
   
    let filteredContacts = this.state.data.data.filter(
      (location) => {
        return location.chargerName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );

    var selectedPlace = this.props.onSelectedPoint


    return (
      <div>
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

      </div>
    );
  }
    
}

import React from 'react';
import axios from 'axios';
import ReactMapGL, {Marker} from "react-map-gl";
import data from './data/test.json';

export default class App extends React.Component {
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
      data: data
    }
  }
  
  // componentDidMount() {
  //   axios.get("https://api.openchargemap.io/v3/poi/?output=json&countrycode=FI&latitude=65.009272&longitude=25.519993&maxresults=30")
  //     .then((result)=> {
  //       this.setState({
  //         data: result.data
  //       })
  //     })
  // }
  
  render() {
    console.log(this.state.data.data)
    return (
      <div>
        <ReactMapGL {...this.state.viewport} mapboxApiAccessToken="pk.eyJ1IjoidG9pbGF2aWMiLCJhIjoiY2tmamN5aTNsMGNoMjMzbXB4cWM4MjdtcyJ9.OVmr_4vFr40bm1pVWqhpZQ"
                                  onViewportChange={(viewport) => {this.setState({viewport: viewport})}}
                                  mapStyle="mapbox://styles/toilavic/ckfjda0ux0mct19nwm0cw9cqb"
        >

        { this.state.data.data.map(e => (
         
         <Marker
            key={e.id}
            latitude={e.Latitude}
            longitude = {e.Longitude}
         >
           <div>
             {e.chargerName}
           </div>
        
        </Marker>
          
        )) }
        </ReactMapGL>
      </div>
    );
  }
    
}

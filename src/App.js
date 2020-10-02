import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMapGL, {Marker} from "react-map-gl";
import * as data from './data/chargers.json'

export default function App() {
  const [viewport,setViewport] = useState({
    latitude: 65.009272,
    longitude : 25.519993,
    zoom: 11,
    width: '100vw',
    height: '100vh'  
  });

  const [data,setData] = useState({hits: []});
  // fetch("https://api.openchargemap.io/v3/poi/?output=json&countrycode=FI&latitude=65.009272&longitude=25.519993&maxresults=30") 
  // .then(response => response.json()) 
  // .then(data =>  {
  //   console.log(data)
  //   // setData(data)
  // });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.openchargemap.io/v3/poi/?output=json&countrycode=FI&latitude=65.009272&longitude=25.519993&maxresults=30',
      );
      setData(result.data);
    };
 
    fetchData();
  }, []);
  console.log(data)

    return (
      <div>
        <ReactMapGL {...viewport} mapboxApiAccessToken="pk.eyJ1IjoidG9pbGF2aWMiLCJhIjoiY2tmamN5aTNsMGNoMjMzbXB4cWM4MjdtcyJ9.OVmr_4vFr40bm1pVWqhpZQ"
                                  onViewportChange={(viewport) => {setViewport(viewport)}}
                                  mapStyle="mapbox://styles/toilavic/ckfjda0ux0mct19nwm0cw9cqb"
        >Marker
        {5+5}
        {data.DataProvider}
        </ReactMapGL>
      </div>
    );
}
